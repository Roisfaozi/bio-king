import { useEffect, useState } from 'react';
import { getAnalytics } from '@/action/analytics-action';
import { getShortlinkByShortcode } from '@/action/links-action';
import { formatEpochDate } from '@/lib/utils';
import { ShortlinkWithClicksResponse } from '@/models/shortlink-response';
import { themes } from '@/config/thems';
import { useThemeStore } from '@/store';
import { useTheme } from 'next-themes';

export default function useShortlinkAnalytics(shortCode: string) {
  const { theme: config } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const [shortlink, setShortlink] =
    useState<ShortlinkWithClicksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ApexAxisChartSeries>([
    { data: [] },
  ]);
  const [chartCategories, setChartCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('60'); // Default 60 hari (2 bulan)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const shortlinkResponse = await getShortlinkByShortcode(shortCode);
        if (shortlinkResponse.status === 'error') {
          setError(shortlinkResponse.message);
          return;
        }
        setShortlink(shortlinkResponse.data);

        const analyticsResponse = await getAnalytics({
          timeRange: timeRange,
          groupBy: 'daily',
          shortlinkId: shortlinkResponse.data.id,
        });

        if (analyticsResponse.status === 'error') {
          setError(analyticsResponse.message);
          return;
        }

        if (
          'data' in analyticsResponse &&
          analyticsResponse.data?.charts?.clicks?.length > 0
        ) {
          const clicksData = analyticsResponse.data.charts.clicks;

          const dates = clicksData.map((item: { date: string }) =>
            formatEpochDate(Number(item.date), 'd MMM'),
          );
          const clicks = clicksData.map(
            (item: { shortlinkClicks: number }) => item.shortlinkClicks,
          );

          setChartCategories(dates);
          setChartData([
            {
              name: 'Klik',
              data: clicks,
            },
          ]);
        } else {
          setError('Tidak ada data klik yang tersedia');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shortCode, timeRange]);

  // Menghitung warna primary berdasarkan tema
  const primary = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`;

  return {
    shortlink,
    loading,
    error,
    timeRange,
    chartData,
    chartCategories,
    primary,
    setTimeRange,
  };
}
