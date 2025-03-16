'use client';
import { themes } from '@/config/thems';
import {
  getGridConfig,
  getXAxisConfig,
  getYAxisConfig,
} from '@/lib/appex-chart-options';
import { useThemeStore } from '@/store';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ReportsChartProps {
  series: ApexAxisChartSeries;
  chartColor?: string;
  colors?: string[];
  height?: number;
  categories?: string[];
  title?: string;
}

const AnalitycsChart = ({
  series,
  chartColor,
  colors,
  height = 300,
  categories,
  title,
}: ReportsChartProps) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  // Gunakan colors jika disediakan, jika tidak gunakan chartColor untuk semua series
  const seriesColors =
    colors || (chartColor ? Array(series.length).fill(chartColor) : undefined);

  const options: any = {
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: seriesColors,
    tooltip: {
      theme: mode === 'dark' ? 'dark' : 'light',
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: function (value: number) {
          return value.toString();
        },
      },
      shared: true,
      intersect: false,
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartGird})`,
    ),
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [50, 100, 0],
      },
    },
    yaxis: getYAxisConfig(
      `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel})`,
    ),
    xaxis: {
      ...getXAxisConfig(
        `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel})`,
      ),
      categories: categories || [],
      type: 'datetime',
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    title: {
      text: title,
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel})`,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].chartLabel})`,
      },
    },
  };
  return (
    <Chart
      options={options}
      series={series}
      type='area'
      height={height}
      width={'100%'}
    />
  );
};

export default AnalitycsChart;
