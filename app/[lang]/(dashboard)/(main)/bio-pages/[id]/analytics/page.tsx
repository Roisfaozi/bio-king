'use client';

import { getAnalytics } from '@/action/analytics-action';
import { getBioById } from '@/action/bio-action';
import ReportsChart from '@/app/[lang]/(dashboard)/(main)/dashboard/components/reports-snapshot/reports-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { themes } from '@/config/thems';
import { BioPagesWithClicksResponse } from '@/models/bio-page-response';
import { useThemeStore } from '@/store';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BioAnalyticsPageProps {
  params: {
    id: string;
  };
}

const BioAnalyticsPage = ({ params }: BioAnalyticsPageProps) => {
  const router = useRouter();
  const { theme: config } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const [bioPage, setBioPage] = useState<BioPagesWithClicksResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ApexAxisChartSeries>([
    { data: [] },
  ]);
  const [chartCategories, setChartCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('60'); // Default 60 hari (2 bulan)

  // Array nama bulan dalam bahasa Indonesia
  const namaBulan = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();

    // Dapatkan tanggal dan nama bulan
    const tanggal = date.getDate();
    const bulan = namaBulan[date.getMonth()];
    const tahun = date.getFullYear();

    // Jika tahun sama dengan tahun saat ini, tampilkan hanya tanggal dan bulan
    if (tahun === currentYear) {
      return `${tanggal} ${bulan}`;
    } else {
      return `${tanggal} ${bulan} ${tahun}`;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const bioResponse = await getBioById(params.id);
        if (bioResponse.status === 'error') {
          setError(bioResponse.message);
          return;
        }
        setBioPage(bioResponse.data);

        const analyticsResponse = await getAnalytics({
          timeRange: timeRange,
          groupBy: 'daily',
          bioId: params.id,
        });

        console.log('Analytics Response:', analyticsResponse);

        if (analyticsResponse.status === 'error') {
          setError(analyticsResponse.message);
          return;
        }
        // Process chart data dari charts.clicks
        if (
          'data' in analyticsResponse &&
          analyticsResponse.data?.charts?.clicks?.length > 0
        ) {
          const clicksData = analyticsResponse.data.charts.clicks;
          console.log('Clicks Data:', clicksData);

          const dates = clicksData.map((item: { date: string }) =>
            formatDate(item.date),
          );
          const clicks = clicksData.map(
            (item: { bioPageClicks: number }) => item.bioPageClicks,
          );

          console.log('Processed Data:', { dates, clicks });

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
  }, [params.id, timeRange]);

  const primary = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`;

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary'></div>
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mb-4 text-red-500'>⚠️</div>
          <p className='text-red-500'>{error}</p>
          <Button
            color='primary'
            className='mt-4'
            onClick={() => router.back()}
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <Button
          variant='ghost'
          className='flex items-center gap-2'
          onClick={() => router.back()}
        >
          <ArrowLeft className='h-4 w-4' />
          Kembali
        </Button>
        <h1 className='text-2xl font-bold'>Statistik Bio Page</h1>
      </div>

      {bioPage && (
        <Card className='mb-6'>
          <CardHeader className='pb-2'>
            <h2 className='text-xl font-semibold'>{bioPage.title}</h2>
            <p className='text-sm text-muted-foreground'>@{bioPage.username}</p>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-6'>
              <div>
                <p className='text-sm text-muted-foreground'>Total Views</p>
                <p className='text-2xl font-bold'>
                  {bioPage._count?.clicks || 0}
                </p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Status</p>
                <p className='text-md font-medium'>
                  {bioPage.is_active ? 'Aktif' : 'Tidak Aktif'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className='grid grid-cols-1 gap-6'>
        <Card>
          <CardHeader className='mb-0 border-none pb-0'>
            <div className='flex flex-wrap items-center gap-2'>
              <div className='flex-1'>
                <div className='whitespace-nowrap text-xl font-semibold text-default-900'>
                  Klik{' '}
                  {timeRange === '30'
                    ? '1 Bulan'
                    : timeRange === '60'
                      ? '2 Bulan'
                      : timeRange === '90'
                        ? '3 Bulan'
                        : timeRange === '365'
                          ? '1 Tahun'
                          : ''}{' '}
                  Terakhir
                </div>
                {error && (
                  <div className='text-sm text-destructive'>{error}</div>
                )}
              </div>
              <div className='flex gap-2'>
                <Button
                  color={timeRange === '30' ? 'primary' : 'default'}
                  variant='outline'
                  size='sm'
                  onClick={() => setTimeRange('30')}
                >
                  1 Bulan
                </Button>
                <Button
                  color={timeRange === '60' ? 'primary' : 'default'}
                  variant='outline'
                  size='sm'
                  onClick={() => setTimeRange('60')}
                >
                  2 Bulan
                </Button>
                <Button
                  color={timeRange === '90' ? 'primary' : 'default'}
                  variant='outline'
                  size='sm'
                  onClick={() => setTimeRange('90')}
                >
                  3 Bulan
                </Button>
                <Button
                  color={timeRange === '365' ? 'primary' : 'default'}
                  variant='outline'
                  size='sm'
                  onClick={() => setTimeRange('365')}
                >
                  1 Tahun
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className='p-1 md:p-5'>
            {loading ? (
              <div className='flex h-[300px] items-center justify-center'>
                <div className='text-center'>
                  <div className='mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-primary'></div>
                  <p>Memuat data...</p>
                </div>
              </div>
            ) : chartData[0]?.data?.length > 0 ? (
              <ReportsChart
                series={chartData}
                categories={chartCategories}
                chartColor={primary}
                height={300}
              />
            ) : (
              <div className='flex h-[300px] items-center justify-center'>
                <div className='text-center'>
                  <p>Tidak ada data klik yang tersedia</p>
                  {error && (
                    <p className='mt-2 text-sm text-destructive'>{error}</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BioAnalyticsPage;
