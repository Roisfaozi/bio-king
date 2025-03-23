-- AlterTable
ALTER TABLE "form_captures" ADD COLUMN     "shortcode" TEXT;

-- CreateIndex
CREATE INDEX "form_captures_shortcode_idx" ON "form_captures"("shortcode");
