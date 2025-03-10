interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface BioLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
}

interface BioPage {
  id: string;
  title: string;
  username: string;
  description: string | null;
  visibility: 'public' | 'private';
  profile_image_url: string | null;
  theme_config: {
    name: string;
    colors: {
      primary: string;
      text: string;
      background: string;
    };
  };
  seo_title: string | null;
  seo_description: string | null;
  social_image_url: string | null;
  social_links: SocialLink[];
  bio_links: BioLink[];
}

export type { BioLink, BioPage, SocialLink };
