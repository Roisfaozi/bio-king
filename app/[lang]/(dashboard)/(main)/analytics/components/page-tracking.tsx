'use client';

import { AnalyticsResponse } from '@/action/analytics-action';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { themes } from '@/config/thems';
import { useThemeStore } from '@/store';
import { Eye, FileText, Heart, ShoppingCart } from 'lucide-react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Import ApexCharts dengan dynamic import untuk menghindari SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PageTrackingProps {
  analytics: AnalyticsResponse;
}

// Helper function untuk mendapatkan icon berdasarkan tipe halaman
const getPageIcon = (pageType: string) => {
  switch (pageType) {
    case 'page':
      return <FileText className='h-4 w-4 text-blue-500' />;
    case 'feature':
      return <Heart className='h-4 w-4 text-purple-500' />;
    case 'pricing':
      return <ShoppingCart className='h-4 w-4 text-green-500' />;
    case 'tinder':
      return <Eye className='h-4 w-4 text-red-500' />;
    default:
      return <FileText className='h-4 w-4 text-gray-500' />;
  }
};

// Helper function untuk mendapatkan label yang lebih user-friendly
const getPageLabel = (pageType: string) => {
  switch (pageType) {
    case 'page':
      return 'Homepage';
    case 'feature':
      return 'Features Page';
    case 'pricing':
      return 'Pricing Page';
    case 'tinder':
      return 'Tinder Page';
    default:
      return pageType.charAt(0).toUpperCase() + pageType.slice(1);
  }
};

const PageTracking = ({ analytics }: PageTrackingProps) => {
  const { theme: mode } = useTheme();
  const { theme: config } = useThemeStore();
  const [windowLoaded, setWindowLoaded] = useState(false);

  useEffect(() => {
    setWindowLoaded(true);
  }, []);

  const theme = themes.find((t) => t.name === config);
  const isDark = mode === 'dark';

  // Periksa apakah data tracking halaman tersedia
  if (!analytics?.data?.pages) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Page Tracking</CardTitle>
          <CardDescription>
            No page tracking data available. Make sure to include
            ?includePages=true in your analytics request.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { pageTypeStats = [], pageVisitsByDate = [] } =
    analytics.data.pages || {};

  // Siapkan data untuk pie chart
  const pieChartOptions = {
    chart: {
      type: 'pie' as const,
      toolbar: {
        show: false,
      },
    },
    labels: pageTypeStats.map((stat: any) => {
      // Memberikan label yang lebih deskriptif
      switch (stat.platform) {
        case 'tinder':
          return 'Tinder Trap Page';
        case 'bio':
          return 'Bio/Linktree Page';
        case 'link':
          return 'Shortlink Redirect';
        case 'feature':
          return 'Features Page';
        case 'pricing':
          return 'Pricing Page';
        case 'page':
          return 'Homepage';
        default:
          return stat.platform.charAt(0).toUpperCase() + stat.platform.slice(1);
      }
    }),
    colors: [
      '#3B82F6', // Biru - Bio
      '#22C55E', // Hijau - Shortlink
      '#EF4444', // Merah - Tinder
      '#8B5CF6', // Ungu - Features
      '#F59E0B', // Kuning - Pricing
      '#6c757d', // Abu-abu - Homepage
    ],
    legend: {
      position: 'bottom' as const,
      horizontalAlign: 'center' as const,
      labels: {
        colors: isDark ? '#fff' : '#333',
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return Math.round(val) + '%';
      },
      style: {
        fontSize: '14px',
        colors: [isDark ? '#fff' : '#333'],
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const pieChartSeries = pageTypeStats.map((stat: any) => stat._count);

  // Siapkan data untuk bar chart
  const barChartOptions = {
    chart: {
      type: 'bar' as const,
      stacked: true,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    xaxis: {
      categories: pageVisitsByDate.map((entry: any) => entry.date),
      labels: {
        style: {
          colors: isDark ? '#fff' : '#333',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#fff' : '#333',
        },
      },
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'right' as const,
      labels: {
        colors: isDark ? '#fff' : '#333',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    grid: {
      borderColor: isDark ? '#1f2937' : '#e5e7eb',
      strokeDashArray: 4,
    },
    colors: ['#3B82F6', '#8B5CF6', '#22C55E', '#EF4444'],
  };

  // Transformasi data untuk bar chart series
  const barChartSeries = Object.keys(pageVisitsByDate[0] || {})
    .filter((key) => key !== 'date')
    .map((pageType) => {
      // Memberikan nama yang lebih deskriptif untuk setiap tipe halaman
      let name = 'Unknown';
      let color = '#6c757d';

      switch (pageType) {
        case 'tinder':
          name = 'Tinder Trap Page';
          color = '#EF4444'; // Merah
          break;
        case 'bio':
          name = 'Bio/Linktree Page';
          color = '#3B82F6'; // Biru
          break;
        case 'link':
          name = 'Shortlink Redirect';
          color = '#22C55E'; // Hijau
          break;
        case 'feature':
          name = 'Features Page';
          color = '#8B5CF6'; // Ungu
          break;
        case 'pricing':
          name = 'Pricing Page';
          color = '#F59E0B'; // Kuning
          break;
        case 'page':
          name = 'Homepage';
          color = '#6c757d'; // Abu-abu
          break;
        default:
          name = `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} Page`;
      }

      return {
        name,
        data: pageVisitsByDate.map((entry: any) => entry[pageType] || 0),
        color,
      };
    });

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Page Visits Overview</CardTitle>
          <CardDescription>
            Track how users are interacting with different pages of your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Page Stats - Pie Chart */}
            <div>
              <h3 className='mb-4 text-lg font-medium'>
                Page Visit Distribution
              </h3>
              <div className='h-80'>
                {windowLoaded && pageTypeStats && pageTypeStats.length > 0 ? (
                  <Chart
                    options={pieChartOptions}
                    series={pieChartSeries}
                    type='pie'
                    height={300}
                  />
                ) : (
                  <div className='flex h-full items-center justify-center'>
                    <p className='text-muted-foreground'>No data available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Page Visit Trends - Bar Chart */}
            <div>
              <h3 className='mb-4 text-lg font-medium'>Page Visit Trends</h3>
              <div className='h-80'>
                {windowLoaded &&
                pageVisitsByDate &&
                pageVisitsByDate.length > 0 ? (
                  <Chart
                    options={barChartOptions}
                    series={barChartSeries}
                    type='bar'
                    height={300}
                  />
                ) : (
                  <div className='flex h-full items-center justify-center'>
                    <p className='text-muted-foreground'>
                      No trend data available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Page Visit Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Page Visit Details</CardTitle>
          <CardDescription>
            Detailed breakdown of page visits across your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Total Visits</TableHead>
                <TableHead className='text-right'>% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageTypeStats && pageTypeStats.length > 0 ? (
                pageTypeStats.map((stat: any, index: number) => {
                  const totalVisits = pageTypeStats.reduce(
                    (sum: number, s: any) => sum + s._count,
                    0,
                  );
                  const percentage =
                    totalVisits > 0
                      ? ((stat._count / totalVisits) * 100).toFixed(1)
                      : '0';

                  return (
                    <TableRow key={index}>
                      <TableCell className='font-medium'>
                        <div className='flex items-center'>
                          {getPageIcon(stat.platform)}
                          <span className='ml-2'>
                            {getPageLabel(stat.platform)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{stat._count}</TableCell>
                      <TableCell className='text-right'>
                        {percentage}%
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className='py-4 text-center'>
                    No page visit data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className='mt-10'>
        <h3 className='mb-4 text-lg font-medium'>Page Types Tracked</h3>
        <div className='space-y-3'>
          {/* Seksi baru untuk menjelaskan kode warna dan jenis sumber */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='flex items-center rounded-md border p-3'>
              <div className='mr-3 h-4 w-4 rounded-full bg-red-500'></div>
              <div>
                <h4 className='font-medium'>Tinder Trap Page</h4>
                <p className='text-xs text-muted-foreground'>
                  Halaman Tinder palsu untuk tangkap lokasi
                </p>
              </div>
            </div>
            <div className='flex items-center rounded-md border p-3'>
              <div className='mr-3 h-4 w-4 rounded-full bg-blue-500'></div>
              <div>
                <h4 className='font-medium'>Bio/Linktree Page</h4>
                <p className='text-xs text-muted-foreground'>
                  Profil bio mirip Linktree dengan kumpulan link
                </p>
              </div>
            </div>
            <div className='flex items-center rounded-md border p-3'>
              <div className='mr-3 h-4 w-4 rounded-full bg-green-500'></div>
              <div>
                <h4 className='font-medium'>Shortlink Redirect</h4>
                <p className='text-xs text-muted-foreground'>
                  Tautan pendek yang melacak klik sebelum redirect
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTracking;
