'use client';

import ReportsArea from './components/reports-area';
import ReportsSnapshot from './components/reports-snapshot';
import ShortLinksForm from './components/short-links-form';

interface DashboardPageViewProps {
  trans: {
    [key: string]: string;
  };
}
const DashboardPageView = ({ trans }: DashboardPageViewProps) => {
  return (
    <div className='space-y-6'>
      {/* reports area */}

      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-12 lg:col-span-2'>
          <div className='grid h-full grid-cols-1 gap-6'>
            <ReportsArea />
          </div>
        </div>
        <div className='col-span-12 lg:col-span-10'>
          <ReportsSnapshot />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-12 lg:col-span-6 xl:col-span-6'>
          <ShortLinksForm />
        </div>
        <div className='col-span-12 lg:col-span-6 xl:col-span-6'>
          <ShortLinksForm />
        </div>
      </div>
    </div>
  );
};

export default DashboardPageView;
