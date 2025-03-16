'use client';

import { AnalyticsResponse } from '@/action/analytics-action';
import Analitycs from '@/app/[lang]/(dashboard)/(main)/analytics/components/analitycs';
import Maps from '@/app/[lang]/(dashboard)/(main)/analytics/components/maps';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { credentialsConfig } from '@/config/credentials.config';
import { formatDate } from '@/lib/utils';
import { BarChart, ExternalLink, LineChart, Link } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AnalyticsViewProps {
  trans: {
    [key: string]: string;
  };
  analytics: AnalyticsResponse | { status: string; message: string };
}

const AnalyticsView = ({ trans, analytics }: AnalyticsViewProps) => {
  const router = useRouter();

  // Check if analytics data is available
  const hasData = analytics.status === 'success';
  const data = hasData ? (analytics as AnalyticsResponse).data : null;

  return (
    <div className='space-y-6'>
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Analytics Dashboard
          </h1>
          <p className='text-muted-foreground'>
            Overview of your shortlinks and bio pages performance
          </p>
        </div>
      </div>

      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='charts'>Charts</TabsTrigger>
          <TabsTrigger value='visitors'>Visitors</TabsTrigger>
          <TabsTrigger value='map'>Map</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-4'>
          {!hasData ? (
            <Card>
              <CardHeader>
                <CardTitle>No Data Available</CardTitle>
                <CardDescription>
                  {(analytics as { message: string }).message ||
                    'Failed to load analytics data'}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Clicks
                    </CardTitle>
                    <LineChart className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {data?.counts.totalClicks}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      Shortlinks: {data?.counts.shortlinkClicks} | Bio Pages:{' '}
                      {data?.counts.bioPageClicks}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Shortlinks
                    </CardTitle>
                    <Link className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {data?.counts.shortlinks}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      {data?.recent.shortlinks} created in the last 7 days
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Bio Pages
                    </CardTitle>
                    <BarChart className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {data?.counts.bioPages}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      {data?.recent.bioPages} created in the last 7 days
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <Card className='col-span-1'>
                  <CardHeader>
                    <CardTitle>Top Shortlinks</CardTitle>
                    <CardDescription>
                      Your most clicked shortlinks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {data?.top.shortlinks.length === 0 ? (
                      <p className='text-sm text-muted-foreground'>
                        No shortlinks data available
                      </p>
                    ) : (
                      <div className='space-y-4'>
                        {data?.top.shortlinks.map((link) => (
                          <div
                            key={link.id}
                            className='flex items-center justify-between'
                          >
                            <div className='space-y-1'>
                              <p className='text-sm font-medium leading-none'>
                                {link.title || 'Untitled'}
                              </p>
                              <p className='text-sm text-muted-foreground'>
                                {credentialsConfig.siteUrl}/{link.short_code}
                              </p>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm font-medium'>
                                {link._count.clicks} clicks
                              </span>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8'
                                onClick={() =>
                                  router.push(
                                    `/shortlinks/${link.short_code}/edit`,
                                  )
                                }
                              >
                                <ExternalLink className='h-4 w-4' />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className='col-span-1'>
                  <CardHeader>
                    <CardTitle>Top Bio Pages</CardTitle>
                    <CardDescription>
                      Your most visited bio pages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {data?.top.bioPages.length === 0 ? (
                      <p className='text-sm text-muted-foreground'>
                        No bio pages data available
                      </p>
                    ) : (
                      <div className='space-y-4'>
                        {data?.top.bioPages.map((page) => (
                          <div
                            key={page.id}
                            className='flex items-center justify-between'
                          >
                            <div className='space-y-1'>
                              <p className='text-sm font-medium leading-none'>
                                {page.title}
                              </p>
                              <p className='text-sm text-muted-foreground'>
                                {credentialsConfig.siteUrl}/bio/{page.username}
                              </p>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm font-medium'>
                                {page._count.clicks} clicks
                              </span>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8'
                                onClick={() =>
                                  router.push(`/bio-pages/${page.id}`)
                                }
                              >
                                <ExternalLink className='h-4 w-4' />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value='charts' className='space-y-4'>
          {!hasData ? (
            <Card>
              <CardHeader>
                <CardTitle>No Data Available</CardTitle>
                <CardDescription>
                  {(analytics as { message: string }).message ||
                    'Failed to load analytics data'}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <Analitycs analytics={analytics} />
          )}
        </TabsContent>

        <TabsContent value='visitors' className='space-y-4'>
          {!hasData ? (
            <Card>
              <CardHeader>
                <CardTitle>No Data Available</CardTitle>
                <CardDescription>
                  {(analytics as { message: string }).message ||
                    'Failed to load analytics data'}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <>
              <div className='grid gap-4 md:grid-cols-3'>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Browsers</CardTitle>
                    <CardDescription>
                      Most used browsers by your visitors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {data?.visitors.browsers.map((browser, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between'
                        >
                          <span className='text-sm font-medium'>
                            {browser.browser || 'Unknown'}
                          </span>
                          <span className='text-sm text-muted-foreground'>
                            {browser._count.browser} visits
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Devices</CardTitle>
                    <CardDescription>
                      Most used devices by your visitors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {data?.visitors.devices.map((device, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between'
                        >
                          <span className='text-sm font-medium'>
                            {device.device || 'Unknown'}
                          </span>
                          <span className='text-sm text-muted-foreground'>
                            {device._count.device} visits
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Operating Systems</CardTitle>
                    <CardDescription>
                      Most used OS by your visitors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {data?.visitors.os.map((os, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between'
                        >
                          <span className='text-sm font-medium'>
                            {os.os || 'Unknown'}
                          </span>
                          <span className='text-sm text-muted-foreground'>
                            {os._count.os} visits
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Visitors</CardTitle>
                  <CardDescription>
                    Latest visitors to your links
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='overflow-x-auto'>
                      <table className='w-full table-auto'>
                        <thead>
                          <tr className='border-b'>
                            <th className='px-4 py-2 text-left'>Date</th>
                            <th className='px-4 py-2 text-left'>IP</th>
                            <th className='px-4 py-2 text-left'>Location</th>
                            <th className='px-4 py-2 text-left'>Browser</th>
                            <th className='px-4 py-2 text-left'>Device</th>
                            <th className='px-4 py-2 text-left'>Link</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.visitors.recent.map((visitor) => (
                            <tr key={visitor.id} className='border-b'>
                              <td className='px-4 py-2'>
                                {visitor.created_at
                                  ? formatDate(visitor.created_at.toString())
                                  : 'Unknown'}
                              </td>
                              <td className='px-4 py-2'>
                                {visitor.ip || 'Unknown'}
                              </td>
                              <td className='px-4 py-2'>
                                {visitor.country
                                  ? `${visitor.city || ''}, ${visitor.country}`
                                  : 'Unknown'}
                              </td>
                              <td className='px-4 py-2'>
                                {visitor.browser || 'Unknown'}
                              </td>
                              <td className='px-4 py-2'>
                                {visitor.device || 'Unknown'}
                              </td>
                              <td className='px-4 py-2'>
                                {visitor.links ? (
                                  <span>
                                    {visitor.links.title ||
                                      visitor.links.short_code}
                                  </span>
                                ) : visitor.bioPages ? (
                                  <span>{visitor.bioPages.title}</span>
                                ) : (
                                  'Unknown'
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value='map' className='space-y-4'>
          {!hasData ? (
            <Card>
              <CardHeader>
                <CardTitle>No Data Available</CardTitle>
                <CardDescription>
                  {(analytics as { message: string }).message ||
                    'Failed to load analytics data'}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <Maps analytics={analytics} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsView;
