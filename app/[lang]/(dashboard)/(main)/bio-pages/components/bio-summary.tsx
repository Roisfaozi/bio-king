'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@iconify/react';

interface BioSummaryProps {
  totalPages: number;
  totalViews: number;
}

const BioSummary = ({ totalPages = 0, totalViews = 0 }: BioSummaryProps) => {
  return (
    <Card>
      <CardContent className='flex items-center justify-between pt-6'>
        <div className='flex h-5 w-1/2 items-center gap-2'>
          <p className='text-xl font-medium text-default-800'>
            {totalPages} bio pages
          </p>
          <Separator orientation='vertical' />
          <p className='text-xl font-medium text-default-800'>
            {totalViews} views
          </p>
        </div>
        <div>
          <InputGroup merged>
            <InputGroupText>
              <Icon icon='heroicons:magnifying-glass' />
            </InputGroupText>
            <Input type='text' placeholder='Search for bio pages' />
          </InputGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default BioSummary;
