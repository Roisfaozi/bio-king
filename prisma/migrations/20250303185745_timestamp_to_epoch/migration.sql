/*
  Warnings:

  - The `created_at` column on the `bio_links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `bio_links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `bio_pages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `bio_pages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `archived_at` column on the `bio_pages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `clicks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `date` column on the `daily_stats` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `daily_stats` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `daily_stats` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `geolocation_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `last_checked_at` column on the `link_metadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `link_metadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `link_metadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `archived_at` on the `links` table. All the data in the column will be lost.
  - The `created_at` column on the `links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `expires_at` column on the `links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `social_links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `social_links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `user_settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `user_settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `consent_timestamp` column on the `visitor_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `visitor_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `visitor_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `started_at` column on the `visitor_sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ended_at` column on the `visitor_sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `visitor_sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `workspaces` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `workspaces` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "daily_stats_date_key";

CREATE OR REPLACE FUNCTION to_epoch_ms(ts TIMESTAMPTZ) 
RETURNS BIGINT AS $$
BEGIN
  RETURN (EXTRACT(EPOCH FROM ts) * 1000)::BIGINT;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION from_epoch_ms(epoch_ms BIGINT) 
RETURNS TIMESTAMPTZ AS $$
BEGIN
  RETURN to_timestamp(epoch_ms / 1000.0);
END;
$$ LANGUAGE plpgsql;


-- AlterTable
ALTER TABLE "bio_links" DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" BIGINT;

-- AlterTable
ALTER TABLE "bio_pages" DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" BIGINT,
DROP COLUMN "archived_at",
ADD COLUMN     "archived_at" BIGINT;

-- AlterTable
ALTER TABLE "clicks" DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT;

-- AlterTable
ALTER TABLE "daily_stats" DROP COLUMN "date",
ADD COLUMN     "date" BIGINT,
DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" BIGINT;

-- AlterTable
ALTER TABLE "geolocation_data" DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT;

-- AlterTable
ALTER TABLE "link_metadata" DROP COLUMN "last_checked_at",
ADD COLUMN     "last_checked_at" BIGINT,
DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" BIGINT;

-- AlterTable
ALTER TABLE "links" DROP COLUMN "archived_at",
DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" BIGINT,
DROP COLUMN "expires_at",
ADD COLUMN     "expires_at" BIGINT;

-- AlterTable
ALTER TABLE "social_links" DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" BIGINT;

-- AlterTable
ALTER TABLE "user_settings" DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" BIGINT;

-- AlterTable
ALTER TABLE "visitor_data" DROP COLUMN "consent_timestamp",
ADD COLUMN     "consent_timestamp" BIGINT,
DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" BIGINT;

DROP TRIGGER update_visitor_session_duration ON visitor_sessions;


-- AlterTable
ALTER TABLE "visitor_sessions" DROP COLUMN "started_at",
ADD COLUMN     "started_at" BIGINT,
DROP COLUMN "ended_at",
ADD COLUMN     "ended_at" BIGINT,
DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT;

CREATE TRIGGER update_visitor_session_duration
  BEFORE UPDATE OF ended_at ON visitor_sessions
  FOR EACH ROW
  WHEN (OLD.ended_at IS NULL AND NEW.ended_at IS NOT NULL)
  EXECUTE FUNCTION update_session_duration();
-- AlterTable
ALTER TABLE "workspaces" DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" BIGINT;

-- CreateIndex
CREATE INDEX "bio_pages_workspace_created_idx" ON "bio_pages"("workspace_id", "created_at");

-- CreateIndex
CREATE INDEX "clicks_browser_created_at_idx" ON "clicks"("browser", "created_at");

-- CreateIndex
CREATE INDEX "clicks_country_created_at_idx" ON "clicks"("country", "created_at");

-- CreateIndex
CREATE INDEX "clicks_device_created_at_idx" ON "clicks"("device", "created_at");

-- CreateIndex
CREATE INDEX "clicks_link_id_created_at_idx" ON "clicks"("link_id", "created_at");

-- CreateIndex
CREATE INDEX "clicks_os_created_at_idx" ON "clicks"("os", "created_at");

-- CreateIndex
CREATE INDEX "clicks_workspace_created_idx" ON "clicks"("workspace_id", "created_at");

-- CreateIndex
CREATE INDEX "daily_stats_date_idx" ON "daily_stats"("date");

-- CreateIndex
CREATE INDEX "links_workspace_created_idx" ON "links"("workspace_id", "created_at");


-- Update the update_updated_at function to use epoch timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = to_epoch_ms(NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update the update_session_duration function to use epoch timestamps
CREATE OR REPLACE FUNCTION update_session_duration()
RETURNS TRIGGER AS $$
BEGIN
  -- Convert epoch timestamps to seconds and calculate duration
  NEW.duration = (NEW.ended_at / 1000) - (NEW.started_at / 1000);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update the handle_new_user function to use epoch timestamps
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  default_workspace_id TEXT;
  current_epoch BIGINT;
BEGIN
  -- Get current epoch timestamp
  current_epoch := to_epoch_ms(NOW());

  -- Create default user settings
  INSERT INTO user_settings (
    user_id,
    theme,
    language,
    timezone,
    notification_preferences,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    'light',
    'en',  -- Set language to 'en'
    'UTC',  -- Set timezone to 'UTC'
    '{"email": true, "push": false}'::jsonb,
    current_epoch,
    current_epoch
  );

  -- Create default workspace
  INSERT INTO workspaces (
    id,
    name,
    slug,
    description,
    owner_id,
    created_at,
    updated_at
  )
  VALUES (
    gen_random_uuid(),
    'Personal Workspace',
    'personal-' || lower(regexp_replace(NEW.email, '[^a-zA-Z0-9]', '-', 'g')),
    'My personal workspace',
    NEW.id,
    current_epoch,
    current_epoch
  )
  RETURNING id INTO default_workspace_id;

  -- Add user to workspace members
  INSERT INTO workspace_members (
    workspace_id,
    user_id,
    role,
    created_at
  )
  VALUES (
    default_workspace_id,
    NEW.id,
    'owner',
    current_epoch
  );

  -- Create default bio page
  INSERT INTO bio_pages (
    id,
    username,
    title,
    description,
    theme,
    user_id,
    workspace_id,
    visibility,
    created_at,
    updated_at
  )
  VALUES (
    gen_random_uuid(),
    lower(regexp_replace(split_part(NEW.email, '@', 1), '[^a-zA-Z0-9]', '', 'g')),
    COALESCE(NEW.name, split_part(NEW.email, '@', 1)) || '''s Bio',
    'Welcome to my bio page!',
    'default',
    NEW.id,
    default_workspace_id,
    'public',
    current_epoch,
    current_epoch
  );

  RETURN NEW;
END;
$$;

-- Trigger untuk user baru
CREATE OR REPLACE TRIGGER on_user_created
  AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  
  -- Permission setup untuk NeonDB
GRANT EXECUTE ON FUNCTION public.handle_new_user TO PUBLIC;