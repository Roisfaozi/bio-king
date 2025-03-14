import BulkShortlinkForm from '@/app/[lang]/(dashboard)/(main)/dashboard/components/short-links-form/multiple-link-forms';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InputFormLink from './link-forms';
import RecentLink from './recent-links';
import RecentLinks from './recent-links';
import { RecentLinkResponse } from '@/models/shortlink-response';

interface DashboardPageViewProps {
  recentLinks: RecentLinkResponse[];
}

const ShortLinksForm = ({ recentLinks }: DashboardPageViewProps) => {
  return (
    <div className='space-y-5'>
      <Card>
        <CardHeader className='mb-0 border-none'>
          <div className='flex flex-wrap items-center gap-2'>
            <div className='flex-1'>
              <div className='whitespace-pre-wrap text-sm text-default-900'>
                We are currently manually approving links. As soon as the link
                is approved, you will be able to start using it.
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className='px-4'>
          <div className='w-full'>
            <Tabs defaultValue='single'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='single'>Single Shortlink</TabsTrigger>
                <TabsTrigger value='bulk'>Bulk Creation</TabsTrigger>
              </TabsList>
              <Separator className='my-4' />
              <TabsContent value='single'>
                <InputFormLink />
              </TabsContent>
              <TabsContent value='bulk'>
                <BulkShortlinkForm />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <RecentLink recentLinks={recentLinks} />
    </div>
  );
};

export default ShortLinksForm;
