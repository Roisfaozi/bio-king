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

const BioAnalyticsPage = ({ params }) => {
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
    const fetchBioPage = async () => {
      try {
        const response = await getBioById(params.id);
        if (response.status === 'success' && response.data) {
          setBioPage(response.data);
        } else {
          setError('Bio page tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching bio page:', error);
        setError('Gagal mengambil data bio page');
      }
    };

    fetchBioPage();
  }, [params.id]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        // Mengambil data analitik khusus untuk bio page ini
        const response = await getAnalytics({
          timeRange,
          groupBy: 'daily',
          bioId: params.id, // Parameter tambahan untuk filter berdasarkan bio ID
        });

        console.log('Analytics response for bio:', response);

        if (
          response.status === 'success' &&
          'data' in response &&
          response.data?.charts?.clicks?.length > 0
        ) {
          // Persiapkan data chart dari respons API
          const clicksData = response.data.charts.clicks;
          console.log('Raw clicks data length:', clicksData.length);

          // Pastikan data tidak kosong dan valid
          if (
            clicksData &&
            Array.isArray(clicksData) &&
            clicksData.length > 0
          ) {
            // Urutkan data berdasarkan tanggal (dari terlama ke terbaru)
            const sortedData = [...clicksData].sort((a, b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            });

            console.log('Sorted data by date:', sortedData);
            console.log('Sorted data length:', sortedData.length);

            // Ambil data lengkap
            const totalClicksData = sortedData.map(
              (day: { totalClicks: number }) =>
                typeof day.totalClicks === 'number' ? day.totalClicks : 0,
            );

            // Format tanggal sesuai kebutuhan
            const categories = sortedData
              .map((day: { date: string }) =>
                typeof day.date === 'string' ? formatDate(day.date) : '',
              )
              .filter((date) => date !== '');

            console.log('API data prepared:', {
              totalClicksData,
              categories,
              totalClicksDataLength: totalClicksData.length,
              categoriesLength: categories.length,
            });

            if (totalClicksData.length > 0 && categories.length > 0) {
              // Simpan data dalam state
              const newChartData = [
                {
                  name: 'Total Klik',
                  data: totalClicksData,
                },
              ];

              console.log('Setting chart data:', newChartData);

              // Update state
              setChartData(newChartData);
              setChartCategories(categories);
            } else {
              console.warn(
                'Data from API is empty or invalid after processing',
              );
              setError('Data tidak lengkap setelah diproses');
            }
          } else {
            console.warn('Clicks data is not valid');
            setError('Data klik tidak valid');
          }
        } else {
          console.warn('API returned no data or invalid response structure');
          console.warn('Response status:', response.status);
          console.warn('Has data property:', 'data' in response);

          // Gunakan type guard untuk memeriksa properti data
          if ('data' in response) {
            console.warn(
              'Has charts property:',
              response.data?.charts ? 'yes' : 'no',
            );
            console.warn(
              'Has clicks property:',
              response.data?.charts?.clicks ? 'yes' : 'no',
            );
            console.warn(
              'Clicks length:',
              response.data?.charts?.clicks?.length || 0,
            );
          } else {
            console.warn('No data property in response');
          }

          setError('Tidak ada data dari API');
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Gagal mengambil data analitik');
      } finally {
        setLoading(false);
      }
    };

    if (bioPage) {
      fetchAnalytics();
    }
  }, [params.id, timeRange, bioPage]);

  const primary = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`;

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
