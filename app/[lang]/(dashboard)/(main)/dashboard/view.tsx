'use client';

import ReportsArea from './components/reports-area';

interface DashboardPageViewProps {
  trans: {
    [key: string]: string;
  };
}
const DashboardPageView = ({ trans }: DashboardPageViewProps) => {
  return (
    <div className='space-y-6'>
      {/* reports area */}

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <ReportsArea />
        </div>
      </div>
    </div>
  );
};

export default DashboardPageView;
