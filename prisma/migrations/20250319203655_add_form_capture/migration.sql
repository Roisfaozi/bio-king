-- CreateTable
CREATE TABLE "form_captures" (
    "id" TEXT NOT NULL DEFAULT generate_cuid(),
    "source" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "additional_data" JSONB,
    "ip" TEXT,
    "country" TEXT,
    "city" TEXT,
    "browser" TEXT,
    "device" TEXT,
    "os" TEXT,
    "user_agent" TEXT,
    "created_at" BIGINT,
    "visitor_id" TEXT,
    "session_id" TEXT,

    CONSTRAINT "form_captures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "form_captures_source_idx" ON "form_captures"("source");

-- CreateIndex
CREATE INDEX "form_captures_email_idx" ON "form_captures"("email");

-- CreateIndex
CREATE INDEX "form_captures_created_at_idx" ON "form_captures"("created_at");

-- CreateIndex
CREATE INDEX "form_captures_visitor_id_idx" ON "form_captures"("visitor_id");
