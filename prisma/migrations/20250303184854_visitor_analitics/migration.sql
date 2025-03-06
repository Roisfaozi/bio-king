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


-- Enable Row Level Security
ALTER TABLE visitor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE geolocation_data ENABLE ROW LEVEL SECURITY;


-- Create RLS policies
CREATE POLICY "Users can read visitor sessions for their links" ON visitor_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clicks
      JOIN links ON clicks.link_id = links.id
      WHERE clicks.visitor_session_id = visitor_sessions.id
      AND links.user_id = current_setting('app.current_user_id')
    )
  );

CREATE POLICY "Users can read visitor data for their links" ON visitor_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clicks
      JOIN links ON clicks.link_id = links.id
      WHERE clicks.visitor_session_id = visitor_data.visitor_id
      AND links.user_id = current_setting('app.current_user_id')
    )
  );

CREATE POLICY "Users can read geolocation data for their links" ON geolocation_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM visitor_sessions
      JOIN clicks ON clicks.visitor_session_id = visitor_sessions.id
      JOIN links ON clicks.link_id = links.id
      WHERE geolocation_data.session_id = visitor_sessions.id
      AND links.user_id = current_setting('app.current_user_id')
    )
  );

CREATE POLICY "System can insert visitor sessions" ON visitor_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can insert visitor data" ON visitor_data
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can insert geolocation data" ON geolocation_data
  FOR INSERT WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_visitor_data_updated_at
  BEFORE UPDATE ON visitor_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create function to update session duration
CREATE OR REPLACE FUNCTION update_session_duration()
RETURNS TRIGGER AS $$
BEGIN
  NEW.duration = EXTRACT(EPOCH FROM (NEW.ended_at - NEW.started_at))::INTEGER;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for session duration
CREATE TRIGGER update_visitor_session_duration
  BEFORE UPDATE OF ended_at ON visitor_sessions
  FOR EACH ROW
  WHEN (OLD.ended_at IS NULL AND NEW.ended_at IS NOT NULL)
  EXECUTE FUNCTION update_session_duration();

