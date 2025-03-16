'use client';
import DashboardDropdown from '@/components/dashboard-dropdown';
import { Web } from '@/components/svg';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ClickActivity,
  RecentActivities,
  RecentActivityType,
  RecentCliksResponse,
} from '@/models/click-resonse';
import { format } from 'date-fns';
import { epochToDate } from '@/lib/utils';
import { credentialsConfig } from '@/config/credentials.config';
import { Chrome, Facebook, Monitor } from 'lucide-react';

interface RecentActivityProps {
  recentActivity: RecentActivities;
}

const RecentActivity = ({ recentActivity }: RecentActivityProps) => {
  console.log(recentActivity);

  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between border-none pb-0'>
        <CardTitle className='font-semibold'> Recent Activity </CardTitle>
        <DashboardDropdown />
      </CardHeader>
      <CardContent className='px-0'>
        <div>
          {recentActivity.map((item, index) => (
            <ActivityList activity={item} key={`social-item-${index}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

interface ActivityListProps {
  activity: RecentActivityType;
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
              <a
                href={activity.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-md font-normal text-default-600 hover:text-primary-400'
              >
                {credentialsConfig.siteUrl + activity.url}
              </a>
            </div>
          </div>
        </div>
        <div className='flex items-start'>
          <div className='p-1'>
            <p className='text-sm font-normal text-secondary-foreground'>
              {format(
                epochToDate(Number(activity.visited_at)),
                'MMM d, yyyy HH:mm',
              )}
            </p>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-wrap gap-2'>
        <div className='flex items-center gap-2'>
          <div className='h-5 w-5'>
            <Web className='h-4 w-4 text-gray-400' />
          </div>
          <p className='text-sm font-normal text-secondary-foreground'>
            {`${activity.city}, ${activity.country}`}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-5 w-5'>
            <Monitor className='h-4 w-4 text-gray-400' />
          </div>
          <p className='text-sm font-normal text-secondary-foreground'>
            {activity.os}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-5 w-5'>
            <Chrome className='h-4 w-4 text-gray-400' />
          </div>
          <p className='text-sm font-normal text-secondary-foreground'>
            {activity.browser}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-5 w-5'>
            <Facebook className='h-4 w-4 text-gray-400' />
          </div>
          <p className='text-sm font-normal text-secondary-foreground'>
            {activity.referrer}
          </p>
        </div>
      </div>
    </div>
  );
}
