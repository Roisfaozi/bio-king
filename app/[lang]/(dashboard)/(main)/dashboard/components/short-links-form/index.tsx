import { Card, CardHeader } from '@/components/ui/card';
import CardSnippet from '@/components/ui/card-snippet';
import InputFormLink from './link-forms';
import RecentLink from './recent-links';

const ShortLinksForm = () => {
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
      </Card>
      <CardSnippet>
        <InputFormLink />
      </CardSnippet>
      <RecentLink />
    </div>
  );
};

export default ShortLinksForm;
