'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { themes } from '@/config/thems';
import { useThemeStore } from '@/store';
import { useTheme } from 'next-themes';
import ReportsChart from './reports-chart';

const allUsersSeries = [
  {
    data: [90, 70, 85, 60, 80, 70, 90, 75, 60, 80],
  },
];
const conversationSeries = [
  {
    data: [80, 70, 65, 40, 40, 100, 100, 75, 60, 80],
  },
];
const eventCountSeries = [
  {
    data: [20, 70, 65, 60, 40, 60, 90, 75, 60, 40],
  },
];
const newUserSeries = [
  {
    data: [20, 70, 65, 40, 100, 60, 100, 75, 60, 80],
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

  const tabsTrigger = [
    {
      value: 'all',
      text: 'all user',
      total: '10,234',
      color: 'primary',
    },
    {
      value: 'event',
      text: 'Event Count',
      total: '536',
      color: 'warning',
    },
    {
      value: 'conversation',
      text: 'conversations',
      total: '21',
      color: 'success',
    },
    {
      value: 'newuser',
      text: 'New User',
      total: '3321',
      color: 'info',
    },
  ];
  const tabsContentData = [
    {
      value: 'all',
      series: allUsersSeries,
      color: primary,
    },
    {
      value: 'event',
      series: eventCountSeries,
      color: warning,
    },
    {
      value: 'conversation',
      series: conversationSeries,
      color: success,
    },
    {
      value: 'newuser',
      series: newUserSeries,
      color: info,
    },
  ];
  return (
    <Card>
      <CardHeader className='mb-0 border-none pb-0'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='flex-1'>
            <div className='whitespace-nowrap text-xl font-semibold text-default-900'>
              Reports Snapshot
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-1 md:p-5'>
        <Tabs defaultValue='all'>
          {/* charts data */}
          {tabsContentData.map((item, index) => (
            <TabsContent key={`report-tab-${index}`} value={item.value}>
              <ReportsChart series={item.series} chartColor={item.color} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportsSnapshot;
