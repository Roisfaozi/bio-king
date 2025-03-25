'use server';

import { getCookie } from '@/action/action-utils';
import { api } from '@/config/axios.config';
import { logError } from '@/lib/helper';

export interface AnalyticsResponse {
  status: string;
  message?: string;
  data: {
    counts: {
      shortlinks: number;
      bioPages: number;
      totalClicks: number;
      shortlinkClicks: number;
      bioPageClicks: number;
    };
    recent: {
      shortlinks: number;
      bioPages: number;
      clicks: number;
    };
    top: {
      shortlinks: Array<{
        id: string;
        short_code: string;
        title: string | null;
        original_url: string;
        _count: {
          clicks: number;
        };
      }>;
      bioPages: Array<{
        id: string;
        username: string;
        title: string;
        _count: {
          clicks: number;
        };
      }>;
    };
    charts: {
      clicks: Array<{
        date: string;
        shortlinkClicks: number;
        bioPageClicks: number;
        totalClicks: number;
      }>;
      created: Array<{
        date: string;
        shortlinks: number;
        bioPages: number;
        total: number;
      }>;
    };
    visitors: {
      browsers: Array<{
        browser: string | null;
        _count: {
          browser: number;
        };
      }>;
      devices: Array<{
        device: string | null;
        _count: {
          device: number;
        };
      }>;
      os: Array<{
        os: string | null;
        _count: {
          os: number;
        };
      }>;
      countries: Array<{
        country: string | null;
        _count: {
          country: number;
        };
      }>;
      recent: Array<{
        id: string;
        ip: string | null;
        country: string | null;
        city: string | null;
        browser: string | null;
        os: string | null;
        device: string | null;
        created_at: bigint | null;
        links: {
          short_code: string;
          title: string | null;
        } | null;
        bioPages: {
          username: string;
          title: string;
        } | null;
      }>;
    };
    pages?: {
      pageTypeStats: Array<{
        platform: string;
        _count: number;
      }>;
      pageVisitsByDate: Array<{
        date: string;
        [key: string]: number | string;
      }>;
    };
    timeRange: string;
    groupBy: string;
  };
}

export interface AnalyticsParams {
  timeRange?: string; // '7', '30', '60', '90', 'year'
  groupBy?: string; // 'daily', 'weekly', 'monthly'
  bioId?: string; // ID bio page untuk filter analitik
  shortlinkId?: string; // ID shortlink untuk filter analitik
  includePages?: boolean;
}

export const getAnalytics = async (params?: AnalyticsParams) => {
  try {
    const cookie = await getCookie('next-auth.session-token');

    // Siapkan parameter query
    const queryParams = new URLSearchParams();

    if (params?.timeRange) {
      queryParams.append('timeRange', params.timeRange);
    }

    if (params?.groupBy) {
      queryParams.append('groupBy', params.groupBy);
    }

    // Tambahkan parameter bioId jika ada
    if (params?.bioId) {
      queryParams.append('bioId', params.bioId);
    }

    // Tambahkan parameter shortlinkId jika ada
    if (params?.shortlinkId) {
      queryParams.append('shortlinkId', params.shortlinkId);
    }

    // Tambahkan parameter includePages jika ada
    if (params?.includePages) {
      queryParams.append('includePages', 'true');
    }

    // Buat URL dengan parameter query
    const url = `/analytics${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await api.get<AnalyticsResponse>(url, {
      headers: {
        Cookie: `next-auth.session-token=${cookie}`,
      },
    });
    return response.data;
  } catch (error: any) {
    logError('Error fetching analytics:', error.response?.data || error);
    return {
      status: 'error',
      message: error.response?.data?.message || 'Failed to fetch analytics',
    };
  }
};
