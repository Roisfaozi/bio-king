'use client';

import { AnalyticsResponse, getAnalytics } from '@/action/analytics-action';
import AnalitycsChart from '@/app/[lang]/(dashboard)/(main)/analytics/components/analitycs/analitycs-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { themes } from '@/config/thems';
import { useThemeStore } from '@/store';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface AnalyticsProps {
  analytics: AnalyticsResponse | { status: string; message: string };
}

// Terjemahan untuk teks
const translations = {
  clicksAnalytics: 'Analitik Klik',
  createdItems: 'Item yang Dibuat',
  noData: 'Tidak ada data tersedia',
  clicksOverTime: 'Klik selama periode waktu',
  itemsCreatedOverTime: 'Item yang dibuat selama periode waktu',
  totalClicks: 'Total Klik',
  shortlinkClicks: 'Klik Shortlink',
  bioPageClicks: 'Klik Halaman Bio',
  totalCreated: 'Total Dibuat',
  shortlinksCreated: 'Shortlink Dibuat',
  bioPagesCreated: 'Halaman Bio Dibuat',
  timeRange: 'Rentang Waktu',
  last7Days: '7 Hari Terakhir',
  last30Days: '30 Hari Terakhir',
  last60Days: '60 Hari Terakhir',
  last90Days: '90 Hari Terakhir',
  thisYear: 'Tahun Ini',
  daily: 'Harian',
  weekly: 'Mingguan',
  monthly: 'Bulanan',
  groupBy: 'Kelompokkan Berdasarkan',
  loading: 'Memuat data...',
  applyFilters: 'Terapkan Filter',
};

const Analitycs = ({ analytics: initialAnalytics }: AnalyticsProps) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  // Warna untuk chart
  const primary = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`;
  const warning = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].warning})`;
  const success = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].success})`;
  const info = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].info})`;
  const destructive = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].destructive})`;

  // State untuk rentang waktu dan pengelompokan
  const [timeRange, setTimeRange] = useState('30');
  const [groupBy, setGroupBy] = useState('daily');
  const [isLoading, setIsLoading] = useState(false);
  const [analytics, setAnalytics] = useState<
    AnalyticsResponse | { status: string; message: string }
  >(initialAnalytics);

  // Fungsi untuk mengambil data analytics dengan filter
  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const data = await getAnalytics({
        timeRange,
        groupBy,
      });
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil API saat filter berubah
  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange, groupBy]);

  // Check if analytics data is available
  const hasData = analytics.status === 'success';
  const data = hasData ? (analytics as AnalyticsResponse).data : null;

  // Prepare data for charts
  const allClicksChartData = data?.charts.clicks || [];
  const allCreatedChartData = data?.charts.created || [];

  // Extract dates for x-axis
  const clicksDates = allClicksChartData.map((item) => item.date);
  const createdDates = allCreatedChartData.map((item) => item.date);

  // Prepare series for clicks chart
  const clicksSeries = [
    {
      name: translations.totalClicks,
      data: allClicksChartData.map((item) => item.totalClicks),
    },
    {
      name: translations.shortlinkClicks,
      data: allClicksChartData.map((item) => item.shortlinkClicks),
    },
    {
      name: translations.bioPageClicks,
      data: allClicksChartData.map((item) => item.bioPageClicks),
    },
  ];

  // Prepare series for created items chart
  const createdSeries = [
    {
      name: translations.totalCreated,
      data: allCreatedChartData.map((item) => item.total),
    },
    {
      name: translations.shortlinksCreated,
      data: allCreatedChartData.map((item) => item.shortlinks),
    },
    {
      name: translations.bioPagesCreated,
      data: allCreatedChartData.map((item) => item.bioPages),
    },
  ];

  // Warna untuk setiap series
  const clicksColors = [primary, warning, info];
  const createdColors = [success, destructive, info];

  // Mendapatkan judul chart berdasarkan rentang waktu yang dipilih
  const getChartTitle = (baseTitle: string) => {
    let timeRangeText = '';

    if (timeRange === '7') {
      timeRangeText = translations.last7Days;
    } else if (timeRange === '30') {
      timeRangeText = translations.last30Days;
    } else if (timeRange === '60') {
      timeRangeText = translations.last60Days;
    } else if (timeRange === '90') {
      timeRangeText = translations.last90Days;
    } else if (timeRange === 'year') {
      timeRangeText = translations.thisYear;
    }

    return `${baseTitle} (${timeRangeText})`;
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col justify-between gap-4 sm:flex-row'>
        <div className='flex flex-col gap-2 sm:flex-row'>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder={translations.timeRange} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='7'>{translations.last7Days}</SelectItem>
              <SelectItem value='30'>{translations.last30Days}</SelectItem>
              <SelectItem value='60'>{translations.last60Days}</SelectItem>
              <SelectItem value='90'>{translations.last90Days}</SelectItem>
              <SelectItem value='year'>{translations.thisYear}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={groupBy} onValueChange={setGroupBy}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder={translations.groupBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='daily'>{translations.daily}</SelectItem>
              <SelectItem value='weekly'>{translations.weekly}</SelectItem>
              <SelectItem value='monthly'>{translations.monthly}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-primary'></div>
            <p>{translations.loading}</p>
          </div>
        </div>
      ) : (
        <Tabs defaultValue='clicks' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='clicks'>
              {translations.clicksAnalytics}
            </TabsTrigger>
            <TabsTrigger value='created'>
              {translations.createdItems}
            </TabsTrigger>
          </TabsList>

          <TabsContent value='clicks'>
            <Card>
              <CardHeader className='mb-0 border-none pb-0'>
                <CardTitle>{translations.clicksAnalytics}</CardTitle>
              </CardHeader>
              <CardContent className='p-1 md:p-5'>
                {!hasData ? (
                  <div className='py-8 text-center'>{translations.noData}</div>
                ) : (
                  <AnalitycsChart
                    series={clicksSeries}
                    colors={clicksColors}
                    categories={clicksDates}
                    title={getChartTitle(translations.clicksOverTime)}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='created'>
            <Card>
              <CardHeader className='mb-0 border-none pb-0'>
                <CardTitle>{translations.createdItems}</CardTitle>
              </CardHeader>
              <CardContent className='p-1 md:p-5'>
                {!hasData ? (
                  <div className='py-8 text-center'>{translations.noData}</div>
                ) : (
                  <AnalitycsChart
                    series={createdSeries}
                    colors={createdColors}
                    categories={createdDates}
                    title={getChartTitle(translations.itemsCreatedOverTime)}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Analitycs;
