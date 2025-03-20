import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import { logError } from '@/lib/helper';

/**
 * Creates a Prisma client extension for bypassing RLS
 * @param userId The current user's ID (optional)
 * @returns Extended Prisma client
 */
export const createBypassRLSClient = () => {
  return Prisma.defineExtension((prisma) =>
    prisma.$extends({
      name: 'bypass-rls-client',
      query: {
        $allModels: {
          async $allOperations({ operation, args, query }) {
            try {
              // With userId, use transaction with proper PrismaPromise objects
              const result = await db.$transaction(async (tx) => {
                // Set RLS bypass context first
                await tx.$executeRaw`SELECT set_config('app.bypass_rls', 'on', true)`;

                // Then execute the original query
                return await query(args);
              });
              return result;

              // If no userId, just execute the query directly
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
              if (error instanceof Prisma.PrismaClientValidationError) {
                logError('Prisma Validation Error:', error.message);
                throw new Error('Invalid input. Please check your data.');
              }
              throw error;
            }
          },
        },
      },
    }),
  );
};

/**
 * Creates a Prisma client extended with RLS and error handling
 * @param userId The current user's ID (optional)
 * @returns Extended Prisma client
 */

export const createRLSClient = (userId?: string) => {
  return Prisma.defineExtension((prisma) =>
    prisma.$extends({
      name: 'rls-client',
      query: {
        $allModels: {
          async $allOperations({ operation, args, query }) {
            try {
              // Set RLS context with user ID
              const [, result] = await prisma.$transaction([
                prisma.$executeRaw`SELECT set_config('app.current_user_id', ${userId}, TRUE)`,
                query(args),
              ]);
              return result;
            } catch (error) {
              // Error handling
              console.log(error);
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
              if (error instanceof Prisma.PrismaClientValidationError) {
                logError('Prisma Validation Error:', error.message);

                throw new Error('Invalid input. Please check your data.');
              }
              throw error;
            }
          },
        },
      },
    }),
  );
};
