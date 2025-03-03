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

-- AlterTable
ALTER TABLE "visitor_sessions" DROP COLUMN "started_at",
ADD COLUMN     "started_at" BIGINT,
DROP COLUMN "ended_at",
ADD COLUMN     "ended_at" BIGINT,
DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT;

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
