import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  const router = useRouter();

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <div className='mb-4 text-red-500'>⚠️</div>
        <p className='text-red-500'>{message}</p>
        <Button color='primary' className='mt-4' onClick={() => router.back()}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Kembali
        </Button>
      </div>
    </div>
  );
}

// Versi khusus untuk error pada chart
export function ChartErrorState({ message }: ErrorStateProps) {
  return (
    <div className='flex h-[300px] items-center justify-center'>
      <div className='text-center'>
        <p>Tidak ada data klik yang tersedia</p>
        {message && <p className='mt-2 text-sm text-destructive'>{message}</p>}
      </div>
    </div>
  );
}
