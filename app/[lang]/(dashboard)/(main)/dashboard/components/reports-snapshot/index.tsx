'use client';

import { getAnalytics } from '@/action/analytics-action';
import ReportsChart from '@/app/[lang]/(dashboard)/(main)/dashboard/components/reports-snapshot/reports-chart';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { themes } from '@/config/thems';
import { useThemeStore } from '@/store';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Variabel untuk menyimpan data chart di luar komponen agar tidak hilang saat re-render
let cachedChartData: ApexAxisChartSeries = [{ data: [] }];
let cachedCategories: string[] = [];
let dataFetched = false;

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

const ReportsSnapshot = () => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);
  const [loading, setLoading] = useState(!dataFetched);
  const [hasData, setHasData] = useState(
    dataFetched && cachedChartData[0]?.data?.length > 0,
  );
  const [chartData, setChartData] =
    useState<ApexAxisChartSeries>(cachedChartData);
  const [chartCategories, setChartCategories] =
    useState<string[]>(cachedCategories);
  const [error, setError] = useState<string | null>(null);

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
      // Format: DD Bulan (contoh: 15 Jun)
      return `${tanggal} ${bulan}`;
    } else {
      // Format: DD Bulan YYYY (contoh: 15 Jun 2023)
      return `${tanggal} ${bulan} ${tahun}`;
    }
  };

  useEffect(() => {
    // Reset cache jika kita mengubah parameter timeRange
    cachedChartData = [{ data: [] }];
    cachedCategories = [];
    dataFetched = false;

    // Jika data sudah pernah diambil dan masih ada, gunakan data yang sudah ada
    if (dataFetched && cachedChartData[0]?.data?.length > 0) {
      setChartData(cachedChartData);
      setChartCategories(cachedCategories);
      setHasData(true);
      setLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        // Mengambil data untuk 60 hari (2 bulan)
        const response = await getAnalytics({
          timeRange: '60',
          groupBy: 'daily',
        });
        console.log('Analytics response:', response);

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

            // Ambil data lengkap tanpa filter yang terlalu ketat
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
              // Simpan data dalam state dan cache
              const newChartData = [
                {
                  name: 'Total Klik',
                  data: totalClicksData,
                },
              ];

              console.log('Setting chart data:', newChartData);

              // Simpan di cache
              cachedChartData = newChartData;
              cachedCategories = categories;
              dataFetched = true;

              // Update state
              setChartData(newChartData);
              setChartCategories(categories);
              setHasData(true);
            } else {
              console.warn(
                'Data from API is empty or invalid after processing',
              );
              setHasData(false);
              setError('Data tidak lengkap setelah diproses');
            }
          } else {
            console.warn('Clicks data is not valid');
            setHasData(false);
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

          setHasData(false);
          setError('Tidak ada data dari API');
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setHasData(false);
        setError('Gagal mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const primary = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`;

  return (
    <Card>
      <CardHeader className='mb-0 border-none pb-0'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='flex-1'>
            <div className='whitespace-nowrap text-xl font-semibold text-default-900'>
              Recent Clicks
            </div>
            {error && <div className='text-sm text-destructive'>{error}</div>}
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
        ) : hasData ? (
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
  );
};

export default ReportsSnapshot;
