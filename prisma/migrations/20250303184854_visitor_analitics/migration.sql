-- AlterTable
ALTER TABLE "clicks" ADD COLUMN     "fingerprint" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "screen_size" TEXT,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "visitor_id" TEXT,
ADD COLUMN     "visitor_session_id" TEXT;

-- CreateTable
CREATE TABLE "geolocation_data" (
    "id" TEXT NOT NULL,
    "session_id" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "accuracy" DOUBLE PRECISION,
    "city" TEXT,
    "region" TEXT,
    "country" TEXT,
    "postal_code" TEXT,
    "consent_given" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "geolocation_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitor_data" (
    "id" TEXT NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "consent_given" BOOLEAN DEFAULT false,
    "consent_timestamp" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitor_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitor_sessions" (
    "id" TEXT NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "fingerprint" TEXT,
    "started_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMPTZ(6),
    "duration" INTEGER,
    "is_returning" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitor_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "geolocation_data_session_id_idx" ON "geolocation_data"("session_id");

-- CreateIndex
CREATE INDEX "visitor_data_visitor_id_idx" ON "visitor_data"("visitor_id");

-- CreateIndex
CREATE INDEX "visitor_sessions_fingerprint_idx" ON "visitor_sessions"("fingerprint");

-- CreateIndex
CREATE INDEX "visitor_sessions_visitor_id_idx" ON "visitor_sessions"("visitor_id");

-- CreateIndex
CREATE INDEX "clicks_fingerprint_idx" ON "clicks"("fingerprint");

-- CreateIndex
CREATE INDEX "clicks_visitor_id_idx" ON "clicks"("visitor_id");

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_visitor_session_id_fkey" FOREIGN KEY ("visitor_session_id") REFERENCES "visitor_sessions"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "geolocation_data" ADD CONSTRAINT "geolocation_data_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "visitor_sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
