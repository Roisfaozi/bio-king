-- CreateEnum
CREATE TYPE "link_status" AS ENUM ('active', 'disabled', 'expired', 'deleted');

-- CreateEnum
CREATE TYPE "link_type" AS ENUM ('shortlink', 'bio');

-- CreateEnum
CREATE TYPE "visibility_type" AS ENUM ('public', 'private', 'team');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "user_settings" (
    "user_id" TEXT NOT NULL,
    "theme" TEXT DEFAULT 'light',
    "language" TEXT DEFAULT 'en',
    "timezone" TEXT DEFAULT 'UTC',
    "notification_preferences" JSONB DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "bio_links" (
    "id" TEXT NOT NULL,
    "bio_page_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT,
    "sort_order" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bio_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bio_pages" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "theme" TEXT DEFAULT 'default',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "workspace_id" TEXT,
    "visibility" "visibility_type" DEFAULT 'public',
    "custom_domain" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "social_image_url" TEXT,
    "archived_at" TIMESTAMPTZ(6),
    "profile_image_url" TEXT,
    "theme_config" JSONB DEFAULT '{     "name": "default",     "label": "default",     "colors": {       "primary": "#4F46E5",       "text": "#111827",       "background": "#FFFFFF",       "darkPrimary": "#7A7CEB",       "darkText": "#FFFFFF",       "darkBackground": "#1A202C"     }   }',

    CONSTRAINT "bio_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clicks" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "link_id" TEXT NOT NULL,
    "ip" TEXT,
    "city" TEXT,
    "country" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "referer" TEXT,
    "user_agent" TEXT,
    "session_id" TEXT,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "device_type" TEXT,
    "screen_resolution" TEXT,
    "is_unique" BOOLEAN DEFAULT true,
    "visit_duration" INTEGER,
    "workspace_id" TEXT,

    CONSTRAINT "clicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_stats" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "total_clicks" INTEGER DEFAULT 0,
    "unique_clicks" INTEGER DEFAULT 0,
    "new_links" INTEGER DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_metadata" (
    "link_id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image_url" TEXT,
    "favicon_url" TEXT,
    "domain" TEXT,
    "last_checked_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "link_metadata_pkey" PRIMARY KEY ("link_id")
);

-- CreateTable
CREATE TABLE "link_tag_relations" (
    "link_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "link_tag_relations_pkey" PRIMARY KEY ("link_id","tag_id")
);

-- CreateTable
CREATE TABLE "link_tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT DEFAULT '#000000',
    "workspace_id" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "link_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "short_code" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "title" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "bio_page_id" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "expires_at" TIMESTAMPTZ(6),
    "workspace_id" TEXT,
    "type" "link_type" DEFAULT 'shortlink',
    "status" "link_status" DEFAULT 'active',
    "visibility" "visibility_type" DEFAULT 'public',
    "password_hash" TEXT,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "custom_domain" TEXT,
    "click_limit" INTEGER,
    "archived_at" TIMESTAMPTZ(6),

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" TEXT NOT NULL,
    "bio_page_id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace_members" (
    "workspace_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workspace_members_pkey" PRIMARY KEY ("workspace_id","user_id")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bio_links_bio_page_id_idx" ON "bio_links"("bio_page_id");

-- CreateIndex
CREATE INDEX "bio_links_sort_order_idx" ON "bio_links"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "bio_pages_username_key" ON "bio_pages"("username");

-- CreateIndex
CREATE INDEX "bio_pages_workspace_created_idx" ON "bio_pages"("workspace_id", "created_at");

-- CreateIndex
CREATE INDEX "clicks_browser_created_at_idx" ON "clicks"("browser", "created_at");

-- CreateIndex
CREATE INDEX "clicks_country_created_at_idx" ON "clicks"("country", "created_at");

-- CreateIndex
CREATE INDEX "clicks_device_created_at_idx" ON "clicks"("device", "created_at");

-- CreateIndex
CREATE INDEX "clicks_is_unique_idx" ON "clicks"("is_unique");

-- CreateIndex
CREATE INDEX "clicks_link_id_created_at_idx" ON "clicks"("link_id", "created_at");

-- CreateIndex
CREATE INDEX "clicks_os_created_at_idx" ON "clicks"("os", "created_at");

-- CreateIndex
CREATE INDEX "clicks_session_idx" ON "clicks"("session_id");

-- CreateIndex
CREATE INDEX "clicks_workspace_created_idx" ON "clicks"("workspace_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "daily_stats_date_key" ON "daily_stats"("date");

-- CreateIndex
CREATE INDEX "daily_stats_date_idx" ON "daily_stats"("date");

-- CreateIndex
CREATE UNIQUE INDEX "link_tags_name_workspace_id_key" ON "link_tags"("name", "workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "links_short_code_key" ON "links"("short_code");

-- CreateIndex
CREATE INDEX "links_status_idx" ON "links"("status");

-- CreateIndex
CREATE INDEX "links_type_idx" ON "links"("type");

-- CreateIndex
CREATE INDEX "links_workspace_created_idx" ON "links"("workspace_id", "created_at");

-- CreateIndex
CREATE INDEX "social_links_bio_page_id_idx" ON "social_links"("bio_page_id");

-- CreateIndex
CREATE UNIQUE INDEX "social_links_bio_page_id_platform_key" ON "social_links"("bio_page_id", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_slug_key" ON "workspaces"("slug");

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bio_links" ADD CONSTRAINT "bio_links_bio_page_id_fkey" FOREIGN KEY ("bio_page_id") REFERENCES "bio_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bio_pages" ADD CONSTRAINT "bio_pages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bio_pages" ADD CONSTRAINT "bio_pages_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "link_metadata" ADD CONSTRAINT "link_metadata_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "link_tag_relations" ADD CONSTRAINT "link_tag_relations_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "link_tag_relations" ADD CONSTRAINT "link_tag_relations_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "link_tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "link_tags" ADD CONSTRAINT "link_tags_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_bio_page_id_fkey" FOREIGN KEY ("bio_page_id") REFERENCES "bio_pages"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_bio_page_id_fkey" FOREIGN KEY ("bio_page_id") REFERENCES "bio_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;


-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bio_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (id = current_setting('app.current_user_id'));

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (id = current_setting('app.current_user_id'));

CREATE POLICY "Users can read own bio pages" ON bio_pages
  FOR SELECT USING (user_id = current_setting('app.current_user_id'));

CREATE POLICY "Users can insert own bio pages" ON bio_pages
  FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id'));

CREATE POLICY "Users can update own bio pages" ON bio_pages
  FOR UPDATE USING (user_id = current_setting('app.current_user_id'));

CREATE POLICY "Users can delete own bio pages" ON bio_pages
  FOR DELETE USING (user_id = current_setting('app.current_user_id'));

CREATE POLICY "Public can view public bio pages" ON "BioPage"
FOR SELECT USING (visibility = 'public');

-- Create RLS links

CREATE POLICY "Users can read own links" ON links
  FOR SELECT USING (user_id = current_setting('app.current_user_id'));

CREATE POLICY "Users can insert own links" ON links
  FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id'));

CREATE POLICY "Users can update own links" ON links
  FOR UPDATE USING (user_id = current_setting('app.current_user_id'));

CREATE POLICY "Users can delete own links" ON links
  FOR DELETE USING (user_id = current_setting('app.current_user_id'));

CREATE POLICY "Public can read active links" ON links
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can read own clicks" ON clicks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM links
      WHERE links.id = clicks.link_id
      AND links.user_id = current_setting('app.current_user_id')
    )
  );

CREATE POLICY "System can insert clicks" ON clicks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can read daily stats" ON daily_stats
  FOR SELECT USING (true);


-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bio_pages_updated_at
  BEFORE UPDATE ON bio_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_links_updated_at
  BEFORE UPDATE ON links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_daily_stats_updated_at
  BEFORE UPDATE ON daily_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

  -- Enable RLS on new tables
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_tag_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for workspaces
CREATE POLICY "Users can view workspaces they are members of" ON workspaces
  FOR SELECT USING (
    current_setting('app.current_user_id') = owner_id OR
    EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = workspaces.id
      AND workspace_members.user_id = current_setting('app.current_user_id')
    )
  );

CREATE POLICY "Workspace owners can update their workspaces" ON workspaces
  FOR UPDATE USING (owner_id = current_setting('app.current_user_id'));

CREATE POLICY "Users can create workspaces" ON workspaces
  FOR INSERT WITH CHECK (owner_id = current_setting('app.current_user_id'));

CREATE POLICY "Workspace owners can delete their workspaces" ON workspaces
  FOR DELETE USING (owner_id = current_setting('app.current_user_id'));

-- Create RLS policies for workspace members
CREATE POLICY "Workspace owners can manage members" ON workspace_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM workspaces
      WHERE workspaces.id = workspace_members.workspace_id
      AND workspaces.owner_id = current_setting('app.current_user_id')
    )
  );

CREATE POLICY "Members can view workspace members" ON workspace_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workspace_members wm
      WHERE wm.workspace_id = workspace_members.workspace_id
      AND wm.user_id = current_setting('app.current_user_id')
    )
  );

-- Create RLS policies for link tags
CREATE POLICY "Users can manage tags in their workspaces" ON link_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = link_tags.workspace_id
      AND workspace_members.user_id = current_setting('app.current_user_id')
    )
  );

-- Create RLS policies for link metadata
CREATE POLICY "Users can manage metadata for their links" ON link_metadata
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM links
      WHERE links.id = link_metadata.link_id
      AND links.user_id = current_setting('app.current_user_id')
    )
  );

-- Create RLS policies for user settings
CREATE POLICY "Users can manage their own settings" ON user_settings
  FOR ALL USING (user_id = current_setting('app.current_user_id'));

  -- Create functions for analytics
CREATE OR REPLACE FUNCTION get_link_stats(
  p_link_id UUID,
  p_start_date TIMESTAMPTZ,
  p_end_date TIMESTAMPTZ
)
RETURNS TABLE (
  total_clicks BIGINT,
  unique_clicks BIGINT,
  countries JSON,
  browsers JSON,
  devices JSON,
  referrers JSON
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_clicks,
    COUNT(DISTINCT session_id)::BIGINT as unique_clicks,
    COALESCE(
      json_object_agg(country, country_count)
      FILTER (WHERE country IS NOT NULL),
      '{}'::json
    ) as countries,
    COALESCE(
      json_object_agg(browser, browser_count)
      FILTER (WHERE browser IS NOT NULL),
      '{}'::json
    ) as browsers,
    COALESCE(
      json_object_agg(device_type, device_count)
      FILTER (WHERE device_type IS NOT NULL),
      '{}'::json
    ) as devices,
    COALESCE(
      json_object_agg(referer, referer_count)
      FILTER (WHERE referer IS NOT NULL),
      '{}'::json
    ) as referrers
  FROM (
    SELECT
      country,
      COUNT(*) as country_count,
      browser,
      COUNT(*) as browser_count,
      device_type,
      COUNT(*) as device_count,
      referer,
      COUNT(*) as referer_count
    FROM clicks
    WHERE
      link_id = p_link_id
      AND created_at >= p_start_date
      AND created_at <= p_end_date
    GROUP BY country, browser, device_type, referer
  ) stats;
END;
$$;

-- Create functions for analytics
CREATE OR REPLACE FUNCTION get_link_stats(
  p_link_id UUID,
  p_start_date TIMESTAMPTZ,
  p_end_date TIMESTAMPTZ
)
RETURNS TABLE (
  total_clicks BIGINT,
  unique_clicks BIGINT,
  countries JSON,
  browsers JSON,
  devices JSON,
  referrers JSON
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_clicks,
    COUNT(DISTINCT session_id)::BIGINT as unique_clicks,
    COALESCE(
      json_object_agg(country, country_count)
      FILTER (WHERE country IS NOT NULL),
      '{}'::json
    ) as countries,
    COALESCE(
      json_object_agg(browser, browser_count)
      FILTER (WHERE browser IS NOT NULL),
      '{}'::json
    ) as browsers,
    COALESCE(
      json_object_agg(device_type, device_count)
      FILTER (WHERE device_type IS NOT NULL),
      '{}'::json
    ) as devices,
    COALESCE(
      json_object_agg(referer, referer_count)
      FILTER (WHERE referer IS NOT NULL),
      '{}'::json
    ) as referrers
  FROM (
    SELECT
      country,
      COUNT(*) as country_count,
      browser,
      COUNT(*) as browser_count,
      device_type,
      COUNT(*) as device_count,
      referer,
      COUNT(*) as referer_count
    FROM clicks
    WHERE
      link_id = p_link_id
      AND created_at >= p_start_date
      AND created_at <= p_end_date
    GROUP BY country, browser, device_type, referer
  ) stats;
END;
$$;


-- Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  default_workspace_id uuid;
BEGIN
  
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
    COALESCE(NEW.raw_user_meta_data->>'language', 'en'),
    COALESCE(NEW.raw_user_meta_data->>'timezone', 'UTC'),
    '{"email": true, "push": false}'::jsonb,
    NOW(),
    NOW()
  );

  -- Create default workspace
  INSERT INTO workspaces (
    name,
    slug,
    description,
    owner_id,
    created_at,
    updated_at
  )
  VALUES (
    'Personal Workspace',
    'personal-' || lower(regexp_replace(NEW.email, '[^a-zA-Z0-9]', '-', 'g')),
    'My personal workspace',
    NEW.id,
    NOW(),
    NOW()
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
    NOW()
  );

  -- Create default bio page
  INSERT INTO bio_pages (
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
    lower(regexp_replace(split_part(NEW.email, '@', 1), '[^a-zA-Z0-9]', '', 'g')),
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)) || '''s Bio',
    'Welcome to my bio page!',
    'default',
    NEW.id,
    default_workspace_id,
    'public',
    NOW(),
    NOW()
  );

  RETURN NEW;
END;
$$;

-- Create a function to handle user deletion
CREATE OR REPLACE FUNCTION public.handle_user_deletion()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Delete user profile and all related data
  -- (Most cascades are handled by foreign key constraints)
  DELETE FROM public.users WHERE id = OLD.id;
  RETURN OLD;
END;
$$;

-- Trigger untuk user baru
CREATE OR REPLACE TRIGGER on_user_created
  AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  
-- Create trigger for user deletion
CREATE OR REPLACE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_deleti

  -- Permission setup untuk NeonDB
GRANT EXECUTE ON FUNCTION public.handle_new_user TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.handle_user_deletion TO PUBLIC;
GRANT USAGE ON SCHEMA public TO PUBLIC;