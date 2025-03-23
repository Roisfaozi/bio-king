'use client';

import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

interface ShortlinksFilterProps {
  searchQuery: string;
  activeTab: string;
  onSearchChange: (query: string) => void;
  onTabChange: (tab: string) => void;
}

const ShortlinksFilter = ({
  searchQuery,
  activeTab,
  onSearchChange,
  onTabChange,
}: ShortlinksFilterProps) => {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center'>
      <div className='relative flex-1'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='Search shortlinks...'
          className='pl-8'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Tabs
        defaultValue={activeTab}
        className='w-full md:w-auto'
        onValueChange={onTabChange}
        value={activeTab}
      >
        <TabsList>
          <TabsTrigger value='all'>All Links</TabsTrigger>
          <TabsTrigger value='active'>Active</TabsTrigger>
          <TabsTrigger value='inactive'>Inactive</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ShortlinksFilter;
