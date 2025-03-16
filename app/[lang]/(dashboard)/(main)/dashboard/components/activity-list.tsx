'use client';
import { getClientSideCookie } from '@/action/client-utils';
import ListView from '@/app/[lang]/(dashboard)/(main)/dashboard/components/list-view';
import { api } from '@/config/axios.config';
import {
  ClickActivity,
  ClicksApiResponse,
  RecentActivities,
  RecentActivityType,
} from '@/models/click-resonse';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ActivityListProps {
  activity: RecentActivities;
}

export default function ActivityList({
  activity: initialActivity,
}: ActivityListProps) {
  const [selectedItem, setSelectedItem] = useState<RecentActivityType | null>(
    null,
  );
  const [activity, setActivity] = useState<RecentActivities>(initialActivity);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);

      // Menggunakan API fetch langsung tanpa server action
      const cookie = getClientSideCookie('next-auth.session-token');
      const response = await api.get<ClicksApiResponse>('/click/recent-click', {
        headers: {
          Cookie: `next-auth.session-token=${cookie}`,
        },
        params: {
          limit: 10,
        },
      });

      const apiResponse = response.data;

      if (apiResponse.status === 'success') {
        const recentActivities: RecentActivities = apiResponse.data.map(
          (click: ClickActivity) => {
            return {
              id: click.id,
              type: click.links ? 'shortlink' : 'bio',
              title: click.links?.title || click.bioPages?.title,
              url: click?.links
                ? `/${click?.links?.short_code}`
                : `/bio/${click?.bioPages?.username}`,
              visited_at: click.created_at,
              ip: click.ip || 'Unknown',
              city: click.city || 'Unknown',
              country: click.country || 'Unknown',
              os: click.os || 'Unknown',
              browser: click.browser || 'Unknown',
              device: click.device,
              referrer: click.referer,
              language: click.language,
            };
          },
        );

        setActivity(recentActivities);
        toast.success('Data aktivitas berhasil diperbarui');
      } else {
        toast.error(apiResponse.message || 'Gagal memperbarui data aktivitas');
        console.error('Error refreshing activity data:', apiResponse);
      }
    } catch (error: any) {
      console.error('Error refreshing activity data:', error);
      toast.error('Terjadi kesalahan saat memperbarui data');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <ListView
      activity={activity}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
    />
  );
}
