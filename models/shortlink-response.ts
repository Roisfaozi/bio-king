interface RecentLinkResponse {
  id: string;
  type: 'bio' | 'shortlink';
  status: 'online';
  visibility: 'public';
  title: string;
  url: string;
  created_at: bigint | null;
}

export type { RecentLinkResponse };
