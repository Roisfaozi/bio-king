import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Menghapus trigger dan function jika ada
const deleteTriggerAndFunction = `
  DO $$
  BEGIN
    -- Hapus trigger jika ada
    IF EXISTS (
      SELECT 1 FROM pg_trigger WHERE tgname = 'after_user_insert'
    ) THEN
      DROP TRIGGER after_user_insert ON "users";
    END IF;

    -- Hapus function jika ada
    IF EXISTS (
      SELECT 1 FROM pg_proc WHERE proname = 'create_user_profile'
    ) THEN
      DROP FUNCTION create_user_profile();
    END IF;
  END;
  $$;
`;

// Membuat function dan trigger baru
const createFunctionAndTrigger = `
  DO $$
  BEGIN
    -- Buat function jika belum ada
    IF NOT EXISTS (
      SELECT 1 FROM pg_proc WHERE proname = 'create_user_profile'
    ) THEN
      CREATE OR REPLACE FUNCTION create_user_profile()
      RETURNS TRIGGER AS $func$
      BEGIN
        -- Insert ke tabel profile dengan kolom snake_case
        INSERT INTO "profile" (id, "userId", bio, location, date_of_birth, phone_number, website, created_at, updated_at)
        VALUES (gen_random_uuid(), NEW.id, NULL, NULL, NULL, NULL, NULL, now(), now());
        RETURN NEW;
      END;
      $func$ LANGUAGE plpgsql;
    END IF;

    -- Buat trigger jika belum ada
    IF NOT EXISTS (
      SELECT 1 FROM pg_trigger WHERE tgname = 'after_user_insert'
    ) THEN
      CREATE TRIGGER after_user_insert
      AFTER INSERT ON "users"
      FOR EACH ROW
      EXECUTE FUNCTION create_user_profile();
    END IF;
  END;
  $$;
`;

async function main() {
  // Hapus trigger dan function yang lama
  await prisma.$executeRawUnsafe(deleteTriggerAndFunction);

  // Buat function dan trigger yang baru
  await prisma.$executeRawUnsafe(createFunctionAndTrigger);

  console.log('Function and trigger recreated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
