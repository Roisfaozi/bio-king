'use client';

import ReportsChart from '@/app/[lang]/(dashboard)/(main)/dashboard/components/reports-snapshot/reports-chart';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { themes } from '@/config/thems';
import { useThemeStore } from '@/store';
import { useTheme } from 'next-themes';

const allUsersSeries = [
  {
    data: [90, 70, 85, 60, 80, 70, 90, 75, 60, 80],
  },
];

const ReportsSnapshot = () => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const primary = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`;
  const warning = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].warning})`;
  const success = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].success})`;
  const info = `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].info})`;

  const tabsContentData = [
    {
      value: 'all',
      series: allUsersSeries,
      color: primary,
    },
  ];
  return (
    <Card>
      <CardHeader className='mb-0 border-none pb-0'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='flex-1'>
            <div className='whitespace-nowrap text-xl font-semibold text-default-900'>
              Recent Click
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-1 md:p-5'>
        {/* charts data */}
        {tabsContentData.map((item, index) => (
          <ReportsChart
            key={`report-tab-${index}`}
            series={item.series}
            chartColor={item.color}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ReportsSnapshot;
