'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShortlinkWithClicksResponse } from '@/models/shortlink-response';
import ShortlinksTable from './shortlinks-table';

interface ShortlinksContentProps {
  shortlinks: ShortlinkWithClicksResponse[];
  filteredLinks: ShortlinkWithClicksResponse[];
  onDelete: (link: ShortlinkWithClicksResponse) => void;
  onCreateClick: () => void;
}

const ShortlinksContent = ({
  shortlinks,
  filteredLinks,
  onDelete,
  onCreateClick,
}: ShortlinksContentProps) => {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle>Your Shortlinks</CardTitle>
        <CardDescription>
          You have {filteredLinks.length} shortlinks in total
        </CardDescription>
      </CardHeader>
      <CardContent>
        {shortlinks.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-8 text-center'>
            <p className='mb-4 text-muted-foreground'>
              You don't have any shortlinks yet
            </p>
            <Button onClick={onCreateClick}>Create your first shortlink</Button>
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className='py-8 text-center text-muted-foreground'>
            No shortlinks match your search criteria
          </div>
        ) : (
          <ShortlinksTable links={filteredLinks} onDelete={onDelete} />
        )}
      </CardContent>
    </Card>
  );
};

export default ShortlinksContent;
