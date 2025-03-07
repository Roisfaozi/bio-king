import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

// Create a unique schema name for parallel test runs
const getTestSchemaName = () => `test_${uuid().replace(/-/g, '_')}`;

export const createTestDatabase = async () => {
  const schemaName = getTestSchemaName();

  // Create a client to the default schema for setup
  const setupClient = new PrismaClient();

  // Create test schema
  await setupClient.$executeRawUnsafe(
    `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`,
  );

  // Create a client connected to the test schema
  const testClient = new PrismaClient({
    datasources: {
      db: {
        url: `${process.env.DATABASE_URL}?schema=${schemaName}`,
      },
    },
  });

  // Run migrations or setup the schema
  await testClient.$executeRawUnsafe(`
    SET search_path TO "${schemaName}";
    -- Run your schema setup SQL here
  `);

  // Return the client and a cleanup function
  return {
    db: testClient,
    cleanup: async () => {
      await testClient.$disconnect();
      await setupClient.$executeRawUnsafe(
        `DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`,
      );
      await setupClient.$disconnect();
    },
  };
};
