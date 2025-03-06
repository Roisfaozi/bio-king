/*
  Warnings:

  - The `created_at` column on the `link_tag_relations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `link_tags` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `workspace_members` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `expires` on the `verification_tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "link_tag_relations" DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT;

-- AlterTable
ALTER TABLE "link_tags" DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT;

-- AlterTable
ALTER TABLE "verification_tokens" DROP COLUMN "expires",
ADD COLUMN     "expires" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "workspace_members" DROP COLUMN "created_at",
ADD COLUMN     "created_at" BIGINT;
