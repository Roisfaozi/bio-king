import { createBypassRLSClient, createRLSClient } from '@/lib/rls-extension';
import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { db: PrismaClient };

export const db = globalForPrisma.db || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db;

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
  const rlsClient = db.$extends(createRLSClient(userId));
  return operation();
}

/**
 * Creates a Prisma client with Row Level Security (RLS) applied.
 * @param userId The current user's ID (optional)
 * @returns Extended Prisma client with RLS
 */
export const withRLS = (userId?: string) => {
  return new PrismaClient().$extends(createRLSClient(userId));
};

/**
 * Utility function to execute operations with RLS bypassed
 * @param userId The current user's ID (optional)
 * @param operation Function containing database operations
 * @returns Result of the operation
 */
export async function withBypassRLS<T>(
  operation: () => Promise<T>,
): Promise<T> {
  const bypassRLSClient = new PrismaClient().$extends(createBypassRLSClient());
  return operation();
}

/**
 * Creates a Prisma client with RLS bypassed.
 * @param userId The current user's ID (optional)
 * @returns Extended Prisma client with RLS bypass
 */

export const bypassRLS = () => {
  return new PrismaClient().$extends(createBypassRLSClient());
};

export default db;
