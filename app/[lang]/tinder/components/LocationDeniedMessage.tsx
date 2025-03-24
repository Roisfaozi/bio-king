import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationDeniedMessageProps {
  locationDenied: boolean;
  onTryAgainClick: () => void;
}

export default function LocationDeniedMessage({
  locationDenied,
  onTryAgainClick,
}: LocationDeniedMessageProps) {
  if (!locationDenied) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className='mb-8 w-full max-w-md rounded-lg bg-red-500/20 p-4 text-center'
      >
        <div className='flex flex-col items-center justify-center gap-2'>
          <AlertCircle className='h-8 w-8 text-red-500' />
          <h3 className='text-xl font-bold text-white'>Lokasi Diperlukan</h3>
          <p className='text-white/80'>
            Maaf, Anda harus mengizinkan akses lokasi untuk melanjutkan. Profil
            tidak dapat ditampilkan tanpa izin lokasi.
          </p>
          <Button
            onClick={onTryAgainClick}
            className='mt-2 bg-white text-red-600 hover:bg-white/90'
          >
            Coba Lagi
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
