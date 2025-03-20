'use client';
import { themes } from '@/config/thems';
import { useThemeStore } from '@/store';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';

// Gunakan dynamic import dengan noSSR untuk menghindari masalah hydration
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ReportsChartProps {
  series: ApexAxisChartSeries;
  categories?: string[];
  colors?: string[];
  chartColor?: string;
  height?: number;
}

const ReportsChart = ({
  series,
  categories = [],
  colors = [],
  chartColor,
  height = 300,
}: ReportsChartProps) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  // Gunakan colors jika tersedia, jika tidak gunakan chartColor
  const chartColors =
    colors.length > 0 ? colors : chartColor ? [chartColor] : undefined;

  // Log props untuk debugging
  useEffect(() => {
    console.log('ReportsChart render with props:', {
      series,
      categories,
      chartColors,
      seriesLength: series?.length,
      categoriesLength: categories?.length,
    });
  }, [series, categories, chartColors]);

  // Validasi data untuk mencegah error
  const validSeries = useMemo(() => {
    try {
      // Pastikan series adalah array dan memiliki data
      if (!Array.isArray(series) || series.length === 0) {
        console.warn('Invalid series data, using empty array');
        return [{ name: 'Total Klik', data: [] }];
      }

      // Pastikan setiap item dalam series memiliki data yang valid
      return series.map((item) => {
        if (!item || !Array.isArray(item.data)) {
          return { ...item, data: [] };
        }
        return item;
      });
    } catch (error) {
      console.error('Error validating series:', error);
      return [{ name: 'Total Klik', data: [] }];
    }
  }, [series]);

  // Validasi categories untuk mencegah error
  const validCategories = useMemo(() => {
    try {
      if (!Array.isArray(categories)) {
        console.warn('Invalid categories data, using empty array');
        return [];
      }
      return categories;
    } catch (error) {
      console.error('Error validating categories:', error);
      return [];
    }
  }, [categories]);

  // Warna untuk chart label dan grid
  const chartLabelColor = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel})`;
  const chartGridColor = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartGird})`;

  // Opsi chart yang disederhanakan dengan useMemo untuk performa
  const options = useMemo(
    () => ({
      chart: {
        id: 'basic-area',
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false, // Matikan animasi untuk performa lebih baik
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth' as const,
        width: 4,
      },
      colors: chartColors,
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      grid: {
        borderColor: chartGridColor,
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: validCategories,
        labels: {
          rotate: -45,
          style: {
            fontSize: '12px', // Memperbesar ukuran font dari 10px menjadi 12px
            colors: chartLabelColor,
            fontWeight: 500, // Menambahkan font weight agar lebih terlihat
          },
          formatter: function (value: string, timestamp?: number, opts?: any) {
            try {
              // Tampilkan label hanya setiap 5 hari atau di awal bulan
              const index = opts?.i || 0;
              // Periksa apakah value adalah string sebelum menggunakan includes
              if (
                index % 5 === 0 ||
                (typeof value === 'string' && value.includes('1 '))
              ) {
                return value;
              }
              return '';
            } catch (error) {
              console.error('Error formatting x-axis label:', error);
              return '';
            }
          },
        },
        title: {
          style: {
            color: chartLabelColor,
            fontSize: '14px', // Memperbesar ukuran font judul dari 12px menjadi 14px
            fontWeight: 600,
          },
        },
        axisBorder: {
          show: true,
          color: chartGridColor,
        },
        axisTicks: {
          show: true,
          color: chartGridColor,
        },
        tickAmount: 10, // Batasi jumlah ticks pada sumbu X
      },
      yaxis: {
        labels: {
          formatter: function (val: number) {
            try {
              return val.toFixed(0);
            } catch (error) {
              console.error('Error formatting y-axis label:', error);
              return '0';
            }
          },
          style: {
            colors: chartLabelColor,
            fontSize: '12px', // Memperbesar ukuran font dari default menjadi 12px
            fontWeight: 500, // Menambahkan font weight agar lebih terlihat
          },
        },
        title: {
          style: {
            color: chartLabelColor,
            fontSize: '14px', // Memperbesar ukuran font judul dari 12px menjadi 14px
            fontWeight: 600,
          },
        },
      },
      tooltip: {
        x: {
          formatter: function (val: number, opts?: any) {
            try {
              // Tampilkan tanggal lengkap di tooltip
              return validCategories[val - 1] || '';
            } catch (error) {
              console.error('Error formatting tooltip x value:', error);
              return '';
            }
          },
        },
        y: {
          formatter: function (val: number) {
            try {
              return val.toString();
            } catch (error) {
              console.error('Error formatting tooltip y value:', error);
              return '0';
            }
          },
        },
        style: {
          fontSize: '13px', // Menambahkan ukuran font untuk tooltip
        },
        theme: mode,
      },
    }),
    [chartColors, chartLabelColor, chartGridColor, validCategories, mode],
  );

  return (
    <div className='chart-container' style={{ minHeight: `${height}px` }}>
      {typeof window !== 'undefined' &&
        validSeries.length > 0 &&
        validCategories.length > 0 && (
          <Chart
            key='analytics-chart'
            options={options}
            series={validSeries}
            type='area'
            height={height}
            width='100%'
          />
        )}
    </div>
  );
};

export default ReportsChart;
