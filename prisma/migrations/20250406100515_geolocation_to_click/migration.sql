-- AlterTable
ALTER TABLE "clicks" ADD COLUMN     "geolocation_id" TEXT;

-- AlterTable
ALTER TABLE "form_captures" ADD COLUMN     "geolocation_id" TEXT;

-- CreateIndex
CREATE INDEX "clicks_geolocation_id_idx" ON "clicks"("geolocation_id");

-- CreateIndex
CREATE INDEX "form_captures_geolocation_id_idx" ON "form_captures"("geolocation_id");

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_geolocation_id_fkey" FOREIGN KEY ("geolocation_id") REFERENCES "geolocation_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_captures" ADD CONSTRAINT "form_captures_geolocation_id_fkey" FOREIGN KEY ("geolocation_id") REFERENCES "geolocation_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
