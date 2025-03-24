'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterIcon } from 'lucide-react';

interface SearchFilterProps {
  initialSource?: string;
  initialStartDate?: string;
  initialEndDate?: string;
  initialShortcode?: string;
}

export default function SearchFilter({
  initialSource = '',
  initialStartDate = '',
  initialEndDate = '',
  initialShortcode = '',
}: SearchFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [source, setSource] = useState(initialSource);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [shortcode, setShortcode] = useState(initialShortcode);

  // Fungsi untuk menerapkan filter
  const applyFilters = () => {
    // Buat parameter query
    const params = new URLSearchParams();

    if (source) params.set('source', source);
    if (startDate) params.set('start_date', startDate);
    if (endDate) params.set('end_date', endDate);
    if (shortcode) params.set('shortcode', shortcode);

    // Reset ke halaman 1 ketika filter diterapkan
    params.set('page', '1');

    // Navigate ke URL baru dengan parameter filter
    router.push(`${pathname}?${params.toString()}`);
  };

  // Fungsi untuk mereset filter
  const resetFilters = () => {
    setSource('');
    setStartDate('');
    setEndDate('');
    setShortcode('');

    // Navigate ke URL tanpa parameter filter
    router.push(pathname);
  };

  return (
    <Card className='p-6'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Source
          </label>
          <Select value={source} onValueChange={setSource} defaultValue=''>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Semua Source' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=''>Semua Source</SelectItem>
              <SelectItem value='tinder'>Tinder</SelectItem>
              <SelectItem value='vsco'>VSCO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Tanggal Mulai
          </label>
          <Input
            type='date'
            value={startDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStartDate(e.target.value)
            }
            className='w-full'
          />
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Tanggal Akhir
          </label>
          <Input
            type='date'
            value={endDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEndDate(e.target.value)
            }
            className='w-full'
          />
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Shortcode
          </label>
          <Input
            type='text'
            value={shortcode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setShortcode(e.target.value)
            }
            placeholder='Filter berdasarkan shortcode'
            className='w-full'
          />
        </div>
      </div>

      <div className='mt-4 flex justify-end gap-2'>
        <Button onClick={resetFilters} variant='outline' color='secondary'>
          Reset
        </Button>
        <Button onClick={applyFilters} color='primary'>
          <FilterIcon size={16} className='mr-1' /> Terapkan Filter
        </Button>
      </div>
    </Card>
  );
}
