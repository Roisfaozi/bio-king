import { getAllBios } from '@/action/bio-action';
import { getShortlinks } from '@/action/links-action';
import { getRecentClicks } from '@/action/server-actions';
import ActivityList from '@/app/[lang]/(dashboard)/(main)/dashboard/components/activity-list';
import { RecentActivities, RecentCliksResponse } from '@/models/click-resonse';
import { RecentLinkResponse } from '@/models/shortlink-response';
import { BioPages, Links } from '@prisma/client';
import ReportsArea from './components/reports-area';
import ReportsSnapshot from './components/reports-snapshot';
import ShortLinksForm from './components/short-links-form';

interface DashboardPageViewProps {
  trans: {
    [key: string]: string;
  };
}

const getRecentShortLinks = async () => {
  try {
    const data = await getShortlinks(5);
    if (data.status === 'success') {
      const links = data.data;
      return links as Links[];
    }
    return [];
  } catch (error) {
    console.error('Error fetching bio pages:', error);
    return [];
  }
};

const getBioPages = async () => {
  try {
    const data = await getAllBios(5);
    if (data.status === 'success') {
      const bio = data.data;

      return bio as BioPages[];
    }
    return [];
  } catch (error) {
    console.error('Error fetching bio pages:', error);
    return [];
  }
};

const getClicks = async () => {
  try {
    const data = await getRecentClicks();
    if (data.status === 'success') {
      const clicks = data.data;
      return clicks as RecentCliksResponse;
    }
    return [];
  } catch (error) {
    console.error('Error fetching bio pages:', error);
    return [];
  }
};
const DashboardPageView = async ({ trans }: DashboardPageViewProps) => {
  const recentLinks = await getRecentShortLinks();
  const recentBio = await getBioPages();

  const recentClicks = await getClicks();
  const combinedLinks = [
    ...(recentLinks?.map((link) => ({
      id: link.id,
      type: 'shortlink' as const,
      status: link.is_active ? ('online' as const) : ('disabled' as const),
      visibility: 'public' as const,
      title: link.title || 'Untitled Link',
      url: `/${link.short_code}`,
      created_at: link.created_at,
    })) || []),
    ...(recentBio?.map((page) => ({
      id: page.id,
      type: 'bio' as const,
      status: 'online' as const,
      visibility: 'public' as const,
      title: page.title,
      url: `/bio/${page.username}`,
      created_at: page.created_at,
    })) || []),
  ].sort((a, b) => {
    // Handle null values and convert bigint to number for comparison
    const dateA = a?.created_at ? Number(a.created_at) : 0;
    const dateB = b?.created_at ? Number(b.created_at) : 0;
    return dateB - dateA;
  }) as RecentLinkResponse[];

  const recentActivities: RecentActivities = recentClicks.map((click) => {
    return {
      id: click.id,
      type: click.links ? 'shortlink' : 'bio',
      title: click.links?.title || click.bioPages?.title,
      url: click?.links
        ? `/${click?.links?.short_code}`
        : `/bio/${click?.bioPages?.username}`,
      visited_at: click.created_at,
      ip: click.ip || 'Unknown',
      city: click.city || 'Unknown',
      country: click.country || 'Unknown',
      os: click.os || 'Unknown',
      browser: click.browser || 'Unknown',
      device: click.device,
      referrer: click.referer,
      language: click.language,
    };
  });

  return (
    <div className='space-y-6'>
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
        <div className='col-span-12 space-y-6 lg:col-span-6 xl:col-span-6'>
          <ShortLinksForm recentLinks={combinedLinks} />
        </div>
        <div className='col-span-12 lg:col-span-6 xl:col-span-6'>
          <ActivityList activity={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPageView;
