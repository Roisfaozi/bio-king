import { Links } from '@prisma/client';

export interface ShortlinkWithClicksResponse extends Links {
  _count?: {
    clicks: number;
  };
}
