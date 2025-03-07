CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION generate_cuid()
RETURNS text AS $$
DECLARE
  timestamp_part text;
  random_part text;
BEGIN
  -- Konversi epoch ke bigint sebelum to_hex
  timestamp_part := to_hex(
    CAST(EXTRACT(EPOCH FROM clock_timestamp()) AS BIGINT)
  );

  -- Generate random part
  random_part := encode(gen_random_bytes(12), 'hex');

  -- Format CUID
  RETURN 'c' || 
    substr(timestamp_part, 2) || 
    random_part;
END;
$$ LANGUAGE plpgsql;


-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "bio_links" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "bio_pages" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "clicks" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "daily_stats" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "geolocation_data" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "link_tags" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "links" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "social_links" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "visitor_data" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "visitor_sessions" ALTER COLUMN "id" SET DEFAULT generate_cuid();

-- AlterTable
ALTER TABLE "workspaces" ALTER COLUMN "id" SET DEFAULT generate_cuid();


-- Bypass RLS for Admins
CREATE POLICY admin_bypass_rls ON users
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON bio_pages
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON bio_links
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON workspaces
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON workspace_members
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON user_settings
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON links
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON clicks
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON daily_stats
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON link_metadata
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON visitor_sessions
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON visitor_data
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON geolocation_data
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON link_tags
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON social_links
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON accounts
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON profile
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY admin_bypass_rls ON sessions
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');



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
    generate_cuid(),
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
    generate_cuid(),
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
        VALUES (generate_cuid(), NEW.id, NULL, NULL, NULL, NULL, NULL, now(), now());
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