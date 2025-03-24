export default function LoadingState() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary'></div>
        <p>Memuat data...</p>
      </div>
    </div>
  );
}

// Versi khusus untuk loading chart
export function ChartLoadingState() {
  return (
    <div className='flex h-[300px] items-center justify-center'>
      <div className='text-center'>
        <div className='mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-primary'></div>
        <p>Memuat data...</p>
      </div>
    </div>
  );
}
