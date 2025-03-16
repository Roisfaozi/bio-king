interface ClickActivity {
  id: string;
  ip: string;
  city: string | null;
  country: string | null;
  os: string;
  device: string;
  browser: string;
  referer: string;
  language: string;
  created_at: string;
  links: Link | null;
  bioPages: BioPage | null;
}

interface Link {
  id: string;
  short_code: string;
  title: string;
  original_url: string;
  user_id: string;
}

interface BioPage {
  id: string;
  username: string;
  title: string;
  user_id: string;
}

interface RecentActivity {
  id: string;
  type: 'shortlink' | 'bio';
  title: string | undefined;
  url: string;
  visited_at: string;
  ip: string;
  city: string | 'Unknown';
  country: string | 'Unknown';
  os: string;
  browser: string;
  device: string;
  referrer: string;
  language: string;
}

type RecentActivities = RecentActivity[];

type RecentCliksResponse = ClickActivity[];

export type {
  ClickActivity,
  Link,
  BioPage,
  RecentCliksResponse,
  RecentActivities,
  RecentActivity as RecentActivityType,
};
