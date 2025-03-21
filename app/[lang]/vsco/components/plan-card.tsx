import { Button } from '@/components/ui/button';

type PlanCardProps = {
  title: string;
  description: string;
  buttonText: string;
  className?: string;
  bgClass?: string;
};

export default function PlanCard({
  title,
  description,
  buttonText,
  className = '',
  bgClass = '',
}: PlanCardProps) {
  return (
    <div
      className={`xs:p-4 flex flex-col border border-gray-800 p-3 sm:p-6 ${bgClass} ${className}`}
    >
      <div className='xs:mb-3 mb-2 sm:mb-4'>
        <span className='xs:text-lg text-base font-bold sm:text-xl'>
          {title}
        </span>
      </div>
      <p className='xs:text-xs xs:mb-4 mb-3 flex-grow text-[10px] text-gray-400 sm:mb-6 sm:text-sm'>
        {description}
      </p>
      <Button
        variant='outline'
        size='sm'
        className='xs:text-xs xs:h-9 h-8 w-full rounded-full text-[10px] sm:h-10 sm:text-sm'
      >
        {buttonText}
      </Button>
    </div>
  );
}
