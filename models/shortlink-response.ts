import { Links } from '@prisma/client';

export interface ShortlinkWithClicksResponse extends Links {
  _count?: {
    clicks: number;
  };
}

export interface RecentLinkResponse {
  id: string;
  type: 'shortlink' | 'bio';
  status: 'online' | 'disabled';
  visibility: 'public' | 'private';
  title: string;
  url: string;
  created_at: Date | bigint;
}
