import { Prisma, PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { db: PrismaClient };

export const db = globalForPrisma.db || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db;

/**
 * Creates a Prisma client extended with RLS and error handling
 * @param userId The current user's ID (optional)
 * @returns Extended Prisma client
 */
export const createRLSClient = (userId?: string) => {
  return db.$extends({
    name: 'rls-client',
    query: {
      async $allOperations({ operation, args, query }) {
        try {
          // If no userId, just execute the query directly
          if (!userId) {
            return await query(args);
          }

          // With userId, use transaction with proper PrismaPromise objects
          const result = await db.$transaction(async (tx) => {
            // Set RLS context first
            await tx.$executeRaw`SELECT set_config('app.current_user_id', ${userId}, true)`;

            // Then execute the original query
            return await query(args);
          });

          return result;
        } catch (error) {
          // Error handling
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
              throw new Error(
                'RESOURCE_NOT_FOUND: Record not found or access denied',
              );
            }

            if (
              error.code === 'P2010' &&
              error.message.includes('violates row-level security policy')
            ) {
              throw new Error(
                'ACCESS_DENIED: Operation violates security policy',
              );
            }
          }

          throw error;
        }
      },
    },
  });
};

/**
 * Utility function to execute operations with RLS applied
 * @param userId The current user's ID (optional)
 * @param operation Function containing database operations
 * @returns Result of the operation
 */
export async function withRLSContext<T>(
  userId: string | undefined,
  operation: () => Promise<T>,
): Promise<T> {
  const rlsClient = createRLSClient(userId);
  return operation();
}

/**
 * Legacy withRLS function (fixed version)
 */
export const withRLS = (userId?: string) => {
  return db.$extends({
    query: {
      async $allOperations({ operation, args, query }) {
        if (!userId) {
          return await query(args);
        }

        // Use transaction correctly
        return await db.$transaction(async (tx) => {
          await tx.$executeRaw`SELECT set_config('app.current_user_id', ${userId}, true)`;
          return await query(args);
        });
      },
    },
  });
};

export default db;
