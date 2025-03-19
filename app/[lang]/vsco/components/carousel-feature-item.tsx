'use client';

interface Badge {
  text: string;
  color: string;
}

interface CarouselFeatureItemProps {
  title: string;
  image: string;
  badge?: Badge;
  overlay?: React.ReactNode;
}

export default function CarouselFeatureItem({
  title,
  image,
  badge,
  overlay,
}: CarouselFeatureItemProps) {
  return (
    <div className='w-72 flex-none'>
      <div className='group relative'>
        <div className='aspect-[4/3] overflow-hidden rounded-lg bg-gray-800'>
          <img
            src={image}
            alt={title}
            className='h-full w-full object-cover'
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/400x300/111827/FFFFFF?text=${encodeURIComponent(title)}`;
            }}
          />

          {badge && (
            <div className='absolute right-3 top-3'>
              <div
                className={`bg-${badge.color} rounded px-2 py-1 text-xs text-white`}
              >
                {badge.text}
              </div>
            </div>
          )}

          {overlay}
        </div>
        <div className='mt-3 flex items-center justify-between'>
          <h3 className='text-sm font-medium'>{title}</h3>
          <svg
            className='h-4 w-4'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5 12H19M19 12L12 5M19 12L12 19'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
