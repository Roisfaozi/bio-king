/*
  Warnings:

  - Added the required column `bio_page_id` to the `clicks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clicks" ADD COLUMN "bio_page_id" TEXT;

-- CreateIndex
CREATE INDEX "bio_pages_user_id_title_idx" ON "bio_pages"("user_id", "title", "id");

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_bio_page_id_fkey" FOREIGN KEY ("bio_page_id") REFERENCES "bio_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
