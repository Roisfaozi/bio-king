'use client';

import { getClientSideCookie } from '@/action/client-utils';
import { api } from '@/config/axios.config';
import { logError } from '@/lib/helper';
import { ClicksApiResponse } from '@/models/click-resonse';

export const getRecentClicks = async (
  limit: number = 10,
): Promise<ClicksApiResponse> => {
  try {
    const cookie = getClientSideCookie('next-auth.session-token');
    const response = await api.get<ClicksApiResponse>(`/click/recent-click`, {
      headers: {
        Cookie: `next-auth.session-token=${cookie}`,
      },
      params: {
        limit: limit,
      },
    });

    return response.data;
  } catch (error: any) {
    logError('Error fetching bio page:', error.response?.data || error.message);
    return {
      status: 'error',
      message:
        error.response?.data?.message ||
        'Terjadi kesalahan saat mengambil data aktivitas',
      data: [],
    };
  }
};
