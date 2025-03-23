export interface ShortlinkWithClicksResponse {
  id: string;
  short_code: string;
  original_url: string;
  title?: string | null;
  user_id: string;
  bio_page_id?: string | null;
  is_active?: boolean | null;
  workspace_id?: string | null;
  type?: 'shortlink' | 'bio' | 'traplink' | null;
  status?: 'active' | 'inactive' | null;
  visibility?: 'public' | 'private' | 'protected' | null;
  password_hash?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  custom_domain?: string | null;
  click_limit?: number | null;
  created_at: bigint | null;
  updated_at: bigint | null;
  expires_at?: bigint | null;
  page_type?: string | null; // tinder or vsco
  _count?: {
    clicks: number;
  };
  users?: {
    name: string | null;
    email: string | null;
  };
}

export interface RecentLinkResponse {
  id: string;
  type: 'shortlink' | 'bio' | 'traplink';
  status: 'online' | 'disabled';
  visibility: 'public' | 'private';
  title: string;
  url: string;
  created_at: bigint | null;
}
