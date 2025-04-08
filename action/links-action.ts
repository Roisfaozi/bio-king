'use server';

import { getCookie } from '@/action/action-utils';
import { api } from '@/config/axios.config';
import { credentialsConfig } from '@/config/credentials.config';
import { logError } from '@/lib/helper';
import { ShortlinkWithClicksResponse } from '@/models/shortlink-response';
import { CreateBioInput } from '@/validation/bio';
import { BulkShortlinkInput, CreateShortlinkInput } from '@/validation/link';
import { Links } from '@prisma/client';
const sessionCookies = credentialsConfig.sessionCookieName;

export const createShortlink = async (data: CreateShortlinkInput) => {
  try {
    const cookie = await getCookie(sessionCookies);
    // Log data yang akan dikirim
    console.log('Creating shortlink with data:', data);

    const response = await api.post<CreateBioInput>('/shortlink', data, {
      headers: {
        Cookie: `${sessionCookies}=${cookie}`,
      },
    });
    console.log('response', response.data);
    return response.data;
  } catch (error: any) {
    logError('failed create bio', error.response.data);
    return error.response.data;
  }
};

export const getShortlinks = async (limit: number = 10) => {
  try {
    const cookie = await getCookie(sessionCookies);
    console.log('cookie', cookie);

    const response = await api.get('/shortlink', {
      headers: {
        Cookie: `${sessionCookies}=${cookie}`,
      },
      params: {
        limit: limit,
      },
    });

    return response.data;
  } catch (error: any) {
    logError('Error fetching all shortlinks:', error.response.data);
    return error.response.data;
  }
};

export async function createBulkShortlinks(data: BulkShortlinkInput) {
  try {
    const urlList = data.original_urls
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url !== '');

    // Process each URL
    const results = await Promise.all(
      urlList.map(async (url) => {
        const result = await createShortlink({ original_url: url });
        return {
          originalUrl: url,
          result,
        };
      }),
    );

    return {
      status: 'success',
      message: `Created ${results.length} shortlinks successfully`,
      data: results,
    };
  } catch (error) {
    console.error('Error creating bulk shortlinks:', error);
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export const getShortlinkByShortcode = async (shortcode: string) => {
  try {
    const cookie = await getCookie(sessionCookies);
    const response = await api.get<ShortlinkWithClicksResponse>(
      `/shortlink/${shortcode}`,
      {
        headers: {
          Cookie: `${sessionCookies}=${cookie}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    logError('Error fetching shortlink by shortcode:', error.response.data);
    return error.response.data;
  }
};

export const updateShortlinkByShortcode = async ({
  shortcode,
  title,
  is_active,
}: {
  shortcode: string;
  title?: string | null;
  is_active?: boolean;
}) => {
  try {
    const cookie = await getCookie(sessionCookies);

    const response = await api.patch<Links>(
      `/shortlink/${shortcode}`,
      {
        title,
        is_active,
      },
      {
        headers: {
          Cookie: `${sessionCookies}=${cookie}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    logError('Error updating shortlink by shortcode:', error.response.data);
    return error.response.data;
  }
};

export const deleteShortlinkByShortcode = async (shortcode: string) => {
  try {
    const cookie = await getCookie(sessionCookies);

    const response = await api.delete<Links>(`/shortlink/${shortcode}`, {
      headers: {
        Cookie: `${sessionCookies}=${cookie}`,
      },
    });

    return response.data;
  } catch (error: any) {
    logError('Error deleting shortlink by shortcode:', error.response.data);
    return error.response.data;
  }
};
