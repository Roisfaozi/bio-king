import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PageHeader() {
  const router = useRouter();

  return (
    <div className='flex items-center justify-between'>
      <Button
        variant='ghost'
        className='flex items-center gap-2'
        onClick={() => router.back()}
      >
        <ArrowLeft className='h-4 w-4' />
        Kembali
      </Button>
      <h1 className='text-2xl font-bold'>Statistik Shortlink</h1>
    </div>
  );
}
