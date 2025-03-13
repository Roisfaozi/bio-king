import { addUser } from '@/action/auth-action';
import { generateShortCode, getCurrentEpoch } from '@/lib/utils';
import { faker } from '@faker-js/faker';
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

  console.log('Seeding database...');

  // Seed users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const user: any = {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: 'password',
        passwordConfirm: 'password',
      };

      const result = await addUser(user);
      return result.data;
    }),
  );
  // Seed everything in one transaction
  await prisma.$transaction(async (tx) => {
    // Seed bio_pages
    const bioPages = await tx.bioPages.createMany({
      data: users.map((newUser) => ({
        title: faker.lorem.words(3),
        username: faker.internet.userName(),
        user_id: `${newUser.id}`,
        created_at: getCurrentEpoch(),
        updated_at: getCurrentEpoch(),
      })),
    });

    const allBioPages = await tx.bioPages.findMany();

    // Seed links
    const links = await tx.links.createMany({
      data: Array.from({ length: 50 }, () => ({
        short_code: generateShortCode(),
        original_url: faker.internet.url(),
        user_id: `${faker.helpers.arrayElement(users).id}`,
        created_at: getCurrentEpoch(),
        updated_at: getCurrentEpoch(),
      })),
    });

    const allLinks = await tx.links.findMany();

    // Seed clicks
    const clicks = await tx.clicks.createMany({
      data: Array.from({ length: 100 }, () => ({
        link_id: faker.helpers.arrayElement(allLinks).id,
        ip: faker.internet.ip(),
        browser: faker.internet.userAgent(),
        country: faker.location.country(),
        created_at: getCurrentEpoch(),
      })),
    });

    // Seed social_links
    const socialLinks = await tx.socialLinks.createMany({
      data: allBioPages.flatMap((page) =>
        ['twitter', 'instagram', 'linkedin']
          .map((platform) => ({
            bio_page_id: page.id,
            platform,
            url: faker.internet.url(),
          }))
          .filter(
            (link) =>
              !tx.socialLinks.findFirst({
                where: {
                  bio_page_id: link.bio_page_id,
                  platform: link.platform,
                },
              }),
          ),
      ),
    });

    // Seed bio_links and clicks for bio_pages
    const bioLinks = await tx.bioLinks.createMany({
      data: allBioPages.flatMap((page) =>
        Array.from({ length: 2 }, () => ({
          bio_page_id: page.id,
          title: faker.lorem.words(),
          url: faker.internet.url(),
          created_at: getCurrentEpoch(),
          updated_at: getCurrentEpoch(),
        })),
      ),
    });

    const bioPagesC = await tx.bioPages.findMany();
    const bioPageIds = bioPagesC.map((bioPage) => bioPage.id);

    const bioPageClicks = await tx.clicks.createMany({
      data: bioPageIds.reduce((acc, bioPageId) => {
        return acc.concat({
          bio_page_id: bioPageId,
          ip: faker.internet.ip(),
          browser: faker.internet.userAgent(),
          country: faker.location.country(),
          created_at: getCurrentEpoch(),
        });
      }, []),
    });
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
