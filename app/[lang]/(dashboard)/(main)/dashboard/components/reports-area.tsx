'use client';
import { Eye, Session } from '@/components/svg';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';

const ReportsArea = () => {
  const reports = [
    {
      id: 1,
      name: 'Sessions',
      count: '6,132',
      rate: '150',
      isUp: true,
      icon: <Session className='h-4 w-4' />,
      color: 'primary',
    },
    {
      id: 2,
      name: 'Page Views',
      count: '11,236',
      rate: '202',
      isUp: false,
      icon: <Eye className='h-4 w-4' />,
      color: 'info',
    },
  ];
  return (
    <>
      {reports.map((item, index) => (
        <Card key={`report-card-${index} `} className=''>
          <CardHeader className='mb-0 flex-col-reverse flex-wrap gap-2 border-none pb-0 sm:flex-row'>
            <span className='flex-1 text-sm font-medium text-default-900'>
              {item.name}
            </span>
            <span
              className={cn(
                'flex h-9 w-9 flex-none items-center justify-center rounded-full bg-default-100',
                {
                  'bg-primary bg-opacity-10 text-primary':
                    item.color === 'primary',
                  'bg-info bg-opacity-10 text-info': item.color === 'info',
                  'bg-warning bg-opacity-10 text-warning':
                    item.color === 'warning',
                  'bg-destructive bg-opacity-10 text-destructive':
                    item.color === 'destructive',
                },
              )}
            >
              {item.icon}
            </span>
          </CardHeader>
          <CardContent className='px-4 pb-4'>
            <div className='mb-2.5 text-2xl font-semibold text-default-900'>
              {item.count}
            </div>
            <div className='flex items-center gap-1 font-semibold'>
              {item.isUp ? (
                <>
                  <span className='text-success'>{item.rate}%</span>
                  <Icon
                    icon='heroicons:arrow-trending-up-16-solid'
                    className='text-xl text-success'
                  />
                </>
              ) : (
                <>
                  <span className='text-destructive'>{item.rate}</span>
                  <Icon
                    icon='heroicons:arrow-trending-down-16-solid'
                    className='text-xl text-destructive'
                  />
                </>
              )}
            </div>
            <div className='mt-1 text-xs text-default-600'>
              vs Previous 30 Days
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ReportsArea;
