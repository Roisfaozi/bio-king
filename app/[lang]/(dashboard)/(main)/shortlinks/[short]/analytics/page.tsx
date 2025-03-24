'use client';

import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import ShortlinkSummaryCard from './components/ShortlinkSummaryCard';
import ClicksChartCard from './components/ClicksChartCard';
import PageHeader from './components/PageHeader';
import useShortlinkAnalytics from './hooks/useShortlinkAnalytics';

interface ShortlinkAnalyticsPageProps {
  params: {
    short: string;
  };
}

const ShortlinkAnalyticsPage = ({ params }: ShortlinkAnalyticsPageProps) => {
  const {
    shortlink,
    loading,
    error,
    timeRange,
    chartData,
    chartCategories,
    primary,
    setTimeRange,
  } = useShortlinkAnalytics(params.short);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className='space-y-6'>
      <PageHeader />

      {shortlink && <ShortlinkSummaryCard shortlink={shortlink} />}

      <div className='grid grid-cols-1 gap-6'>
        <ClicksChartCard
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          chartData={chartData}
          chartCategories={chartCategories}
          chartColor={primary}
          isLoading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default ShortlinkAnalyticsPage;
