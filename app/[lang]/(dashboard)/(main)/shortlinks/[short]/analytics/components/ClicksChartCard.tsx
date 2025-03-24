import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ReportsChart from '@/app/[lang]/(dashboard)/(main)/dashboard/components/reports-snapshot/reports-chart';
import TimeRangeSelector from './TimeRangeSelector';
import { ChartErrorState } from './ErrorState';
import { ChartLoadingState } from './LoadingState';

interface ClicksChartCardProps {
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  chartData: ApexAxisChartSeries;
  chartCategories: string[];
  chartColor: string;
  isLoading: boolean;
  error: string | null;
}

export default function ClicksChartCard({
  timeRange,
  onTimeRangeChange,
  chartData,
  chartCategories,
  chartColor,
  isLoading,
  error,
}: ClicksChartCardProps) {
  // Helper untuk mendapatkan label rentang waktu
  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case '30':
        return '1 Bulan';
      case '60':
        return '2 Bulan';
      case '90':
        return '3 Bulan';
      case '365':
        return '1 Tahun';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader className='mb-0 border-none pb-0'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='flex-1'>
            <div className='whitespace-nowrap text-xl font-semibold text-default-900'>
              Klik {getTimeRangeLabel()} Terakhir
            </div>
            {error && <div className='text-sm text-destructive'>{error}</div>}
          </div>
          <TimeRangeSelector
            timeRange={timeRange}
            onChange={onTimeRangeChange}
          />
        </div>
      </CardHeader>
      <CardContent className='p-1 md:p-5'>
        {isLoading ? (
          <ChartLoadingState />
        ) : chartData[0]?.data?.length > 0 ? (
          <ReportsChart
            series={chartData}
            categories={chartCategories}
            chartColor={chartColor}
            height={300}
          />
        ) : (
          <ChartErrorState message={error || ''} />
        )}
      </CardContent>
    </Card>
  );
}
