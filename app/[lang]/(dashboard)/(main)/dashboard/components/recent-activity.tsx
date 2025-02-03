'use client';
import DashboardDropdown from '@/components/dashboard-dropdown';
import { Web } from '@/components/svg';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Activity = {
  id: number;
  type: string;
  title: string;
  url: string;
  visited: string;
  statistik: {
    city: string;
    country: string;
    os: string;
    browser: string;
    refferer: string;
    language: string;
  };
};
interface RecentActivityProps {
  activities: Activity[];
}

const activities = [
  {
    id: 1,
    type: 'Bio Page',
    title: 'My Own Bio',
    url: 'https://lele.co/abc',
    visited: '12 - 12 - 2024',
    statistik: {
      city: 'bandung',
      country: 'indonesia',
      os: 'windows 10',
      browser: 'Chrome',
      refferer: 'facebook',
      language: 'En',
    },
  },
  {
    id: 2,
    type: 'Bio Page',
    title: 'My Own Bio',
    url: 'https://lele.co/abc',
    visited: '12 - 12 - 2024',
    statistik: {
      city: 'bandung',
      country: 'indonesia',
      os: 'windows 10',
      browser: 'Chrome',
      refferer: 'facebook',
      language: 'En',
    },
  },
  {
    id: 3,
    type: 'Bio Page',
    title: 'My Own Bio',
    url: 'https://lele.co/abc',
    visited: '12 - 12 - 2024',
    statistik: {
      city: 'bandung',
      country: 'indonesia',
      os: 'windows 10',
      browser: 'Chrome',
      refferer: 'facebook',
      language: 'En',
    },
  },
  {
    id: 4,
    type: 'Bio Page',
    title: 'My Own Bio',
    url: 'https://lele.co/abc',
    visited: '12 - 12 - 2024',
    statistik: {
      city: 'bandung',
      country: 'indonesia',
      os: 'windows 10',
      browser: 'Chrome',
      refferer: 'facebook',
      language: 'En',
    },
  },
  {
    id: 5,
    type: 'Bio Page',
    title: 'My Own Bio',
    url: 'https://lele.co/abc',
    visited: '12 - 12 - 2024',
    statistik: {
      city: 'bandung',
      country: 'indonesia',
      os: 'windows 10',
      browser: 'Chrome',
      refferer: 'facebook',
      language: 'En',
    },
  },
  {
    id: 6,
    type: 'Bio Page',
    title: 'My Own Bio',
    url: 'https://lele.co/abc',
    visited: '12 - 12 - 2024',
    statistik: {
      city: 'bandung',
      country: 'indonesia',
      os: 'windows 10',
      browser: 'Chrome',
      refferer: 'facebook',
      language: 'En',
    },
  },
  {
    id: 7,
    type: 'Bio Page',
    title: 'My Own Bio',
    url: 'https://lele.co/abc',
    visited: '12 - 12 - 2024',
    statistik: {
      city: 'bandung',
      country: 'indonesia',
      os: 'windows 10',
      browser: 'Chrome',
      refferer: 'facebook',
      language: 'En',
    },
  },
  {
    id: 8,
    type: 'Bio Page',
    title: 'My Own Bio',
    url: 'https://lele.co/abc',
    visited: '12 - 12 - 2024',
    statistik: {
      city: 'bandung',
      country: 'indonesia',
      os: 'windows 10',
      browser: 'Chrome',
      refferer: 'facebook',
      language: 'En',
    },
  },
  {
    id: 9,
    type: 'Bio Page',
    title: 'My Own Bio',
    url: 'https://lele.co/abc',
    visited: '12 - 12 - 2024',
    statistik: {
      city: 'bandung',
      country: 'indonesia',
      os: 'windows 10',
      browser: 'Chrome',
      refferer: 'facebook',
      language: 'En',
    },
  },
  {
    id: 10,
    type: 'Bio Page',
    title: 'My Own Bio',
    url: 'https://lele.co/abc',
    visited: '12 - 12 - 2024',
    statistik: {
      city: 'bandung',
      country: 'indonesia',
      os: 'windows 10',
      browser: 'Chrome',
      refferer: 'facebook',
      language: 'En',
    },
  },
];
const RecentActivity = () => {
  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between border-none pb-0'>
        <CardTitle className='font-semibold'> Recent Activity </CardTitle>
        <DashboardDropdown />
      </CardHeader>
      <CardContent className='px-0'>
        <div>
          {activities.map((item, index) => (
            <ActivityList activity={item} key={`social-item-${index}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

interface ActivityListProps {
  activity: Activity;
}

function ActivityList({ activity }: ActivityListProps) {
  return (
    <div className='space-y-3 px-4 py-[11px] hover:bg-default-50'>
      <div className='flex justify-between'>
        <div className='flex flex-wrap gap-2'>
          <div className='flex'>
            <div className='flex flex-col items-start justify-start space-x-0 space-y-3 md:flex-row md:items-center md:space-x-3 md:space-y-0'>
              <div className='flex items-center space-x-3'>
                <div className='rounded-md bg-primary p-1'>
                  <p className='text-sm font-semibold text-primary-foreground'>
                    {activity.type}
                  </p>
                </div>
                <p className='text- font-medium text-secondary-foreground'>
                  {activity.title}
                </p>
              </div>
              <p className='text-md font-normal text-default-600'>
                {activity.url}
              </p>
            </div>
          </div>
        </div>
        <div className='flex items-start'>
          <div className='p-1'>
            <p className='text-sm font-normal text-secondary-foreground'>
              {activity.visited}
            </p>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-wrap gap-2'>
        <div className='flex items-center gap-2'>
          <div className='h-5 w-5'>
            <Web />
          </div>
          <p className='text-sm font-normal text-secondary-foreground'>
            {`${activity.statistik.city}, ${activity.statistik.country}`}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-5 w-5'>
            <Web />
          </div>
          <p className='text-sm font-normal text-secondary-foreground'>
            {activity.statistik.os}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-5 w-5'>
            <Web />
          </div>
          <p className='text-sm font-normal text-secondary-foreground'>
            {activity.statistik.browser}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-5 w-5'>
            <Web />
          </div>
          <p className='text-sm font-normal text-secondary-foreground'>
            {activity.statistik.refferer}
          </p>
        </div>
      </div>
    </div>
  );
}
