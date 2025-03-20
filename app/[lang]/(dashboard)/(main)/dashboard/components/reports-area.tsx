'use client';
import { AnalyticsResponse, getAnalytics } from '@/action/analytics-action';
import { Eye, Session } from '@/components/svg';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

const ReportsArea = () => {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await getAnalytics({ timeRange: '7' });
        if (response.status === 'success') {
          setAnalytics(response as AnalyticsResponse);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Hitung persentase perubahan untuk klik
  const calculateClicksChange = () => {
    if (
      !analytics?.data?.charts?.clicks ||
      analytics.data.charts.clicks.length < 2
    ) {
      return { rate: '0', isUp: true };
    }

    const clicksData = analytics.data.charts.clicks;
    const totalClicks = analytics.data.counts.totalClicks;

    // Hitung total klik untuk 3 hari terakhir
    const recentDays = clicksData.slice(-3);
    const olderDays = clicksData.slice(-6, -3);

    const recentTotal = recentDays.reduce(
      (sum, day) => sum + day.totalClicks,
      0,
    );
    const olderTotal = olderDays.reduce((sum, day) => sum + day.totalClicks, 0);

    if (olderTotal === 0) return { rate: '0', isUp: true };

    const percentChange = ((recentTotal - olderTotal) / olderTotal) * 100;
    return {
      rate: Math.abs(percentChange).toFixed(0),
      isUp: percentChange >= 0,
    };
  };

  // Hitung persentase perubahan untuk link/bio yang dibuat
  const calculateLinksChange = () => {
    if (
      !analytics?.data?.charts?.created ||
      analytics.data.charts.created.length < 2
    ) {
      return { rate: '0', isUp: true };
    }

    const createdData = analytics.data.charts.created;

    // Hitung total link/bio untuk 3 hari terakhir
    const recentDays = createdData.slice(-3);
    const olderDays = createdData.slice(-6, -3);

    const recentTotal = recentDays.reduce((sum, day) => sum + day.total, 0);
    const olderTotal = olderDays.reduce((sum, day) => sum + day.total, 0);

    if (olderTotal === 0) return { rate: '0', isUp: true };

    const percentChange = ((recentTotal - olderTotal) / olderTotal) * 100;
    return {
      rate: Math.abs(percentChange).toFixed(0),
      isUp: percentChange >= 0,
    };
  };

  // Hitung klik hari ini
  const getTodayClicks = () => {
    if (
      !analytics?.data?.charts?.clicks ||
      analytics.data.charts.clicks.length === 0
    ) {
      return '0';
    }

    const today =
      analytics.data.charts.clicks[analytics.data.charts.clicks.length - 1];
    return today.totalClicks.toString();
  };

  // Hitung link/bio yang dibuat hari ini
  const getTodayCreated = () => {
    if (
      !analytics?.data?.charts?.created ||
      analytics.data.charts.created.length === 0
    ) {
      return '0';
    }

    const today =
      analytics.data.charts.created[analytics.data.charts.created.length - 1];
    return today.total.toString();
  };

  const clicksChange = calculateClicksChange();
  const linksChange = calculateLinksChange();

  const reports = [
    {
      id: 1,
      name: 'Links & Bio',
      count: loading
        ? '...'
        : (
            (analytics?.data?.counts?.shortlinks || 0) +
            (analytics?.data?.counts?.bioPages || 0)
          ).toLocaleString(),
      rate: linksChange.rate,
      today: getTodayCreated(),
      isUp: linksChange.isUp,
      icon: <Session className='h-4 w-4' />,
      color: 'primary',
    },
    {
      id: 2,
      name: 'Clicks',
      count: loading
        ? '...'
        : (analytics?.data?.counts?.totalClicks || 0).toLocaleString(),
      rate: clicksChange.rate,
      today: getTodayClicks(),
      isUp: clicksChange.isUp,
      icon: <Eye className='h-4 w-4' />,
      color: 'info',
    },
  ];

  return (
    <>
      {reports.map((item, index) => (
        <Card key={`report-card-${index} `} className=''>
          <CardHeader className='mb-0 flex-col-reverse flex-wrap gap-2 border-none pb-0 sm:flex-row'>
            <span className='flex-1 text-sm font-medium text-default-900'>
              {item.name}
            </span>
            <span
              className={cn(
                'flex h-9 w-9 flex-none items-center justify-center rounded-full bg-default-100',
                {
                  'bg-primary bg-opacity-10 text-primary':
                    item.color === 'primary',
                  'bg-info bg-opacity-10 text-info': item.color === 'info',
                  'bg-warning bg-opacity-10 text-warning':
                    item.color === 'warning',
                  'bg-destructive bg-opacity-10 text-destructive':
                    item.color === 'destructive',
                },
              )}
            >
              {item.icon}
            </span>
          </CardHeader>
          <CardContent className='px-4 pb-4'>
            <div className='mb-2.5 text-2xl font-semibold text-default-900'>
              {item.count}
            </div>
            <div className='flex items-center gap-1 font-semibold'>
              {item.isUp ? (
                <>
                  <span className='text-success'>{item.rate}%</span>
                  <Icon
                    icon='heroicons:arrow-trending-up-16-solid'
                    className='text-xl text-success'
                  />
                </>
              ) : (
                <>
                  <span className='text-destructive'>{item.rate}%</span>
                  <Icon
                    icon='heroicons:arrow-trending-down-16-solid'
                    className='text-xl text-destructive'
                  />
                </>
              )}
            </div>
            <div className='mt-1 text-sm text-default-600'>
              <span className='text-primary'> +{item.today}</span> Hari Ini
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ReportsArea;
