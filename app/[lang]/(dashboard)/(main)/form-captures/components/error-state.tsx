interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
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
        <p className='mt-4 text-sm text-muted-foreground'>{message}</p>
      </div>
    </div>
  );
}
