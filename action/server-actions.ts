import { api } from '@/config/axios.config';
import { credentialsConfig } from '@/config/credentials.config';
import { logError } from '@/lib/helper';
import { ClicksApiResponse } from '@/models/click-resonse';
import { cookies } from 'next/headers';

export const getServerCookie = async (name: string) => {
  return cookies().get(name)?.value ?? '';
};

export const getRecentClicks = async (
  limit: number = 10,
): Promise<ClicksApiResponse> => {
  try {
    const cookie = await getServerCookie(credentialsConfig.sessionCookieName);
    const response = await api.get<ClicksApiResponse>(`/click/recent-click`, {
      headers: {
        Cookie: `${credentialsConfig.sessionCookieName}=${cookie}`,
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
