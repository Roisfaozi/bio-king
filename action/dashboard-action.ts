'use client';

import { getClientSideCookie } from '@/action/client-utils';
import { api } from '@/config/axios.config';
import { credentialsConfig } from '@/config/credentials.config';
import { logError } from '@/lib/helper';
import { ClicksApiResponse } from '@/models/click-resonse';
const sessionCookies = credentialsConfig.sessionCookieName;
/**
 * Get recent clicks
 * @param {number} [limit=10] number of record to fetch
 * @returns {Promise<ClicksApiResponse>} a promise that resolves with array of recent clicks
 * @throws {Error} if there is an error on fetching the data
 */
export const getRecentClicks = async (
  limit: number = 10,
): Promise<ClicksApiResponse> => {
  try {
    const cookie = getClientSideCookie(sessionCookies);
    const response = await api.get<ClicksApiResponse>(`/click/recent-click`, {
      headers: {
        Cookie: `${sessionCookies}=${cookie}`,
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
