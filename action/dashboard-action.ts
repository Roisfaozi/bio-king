import { api } from '@/config/axios.config';
import { getCookie } from '@/action/action-utils';
import { BioPages } from '@prisma/client';
import { logError } from '@/lib/helper';

export const getRecentClicks = async (limit: number = 10) => {
  try {
    const cookie = await getCookie('next-auth.session-token');
    const response = await api.get(`/click/recent-click`, {
      headers: {
        Cookie: `next-auth.session-token=${cookie}`,
      },
      params: {
        limit: limit,
      },
    });

    return response.data;
  } catch (error: any) {
    logError('Error fetching bio page:', error.response.data);
    return error.response.data;
  }
};

//<RecentClickResponse[]>
