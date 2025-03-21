import type React from 'react';
type SectionHeaderProps = {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  className?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-6 sm:mb-8 ${className}`}>
      {typeof title === 'string' ? (
        subtitle ? (
          <>
            <h2 className='mb-1 text-xl font-bold text-white sm:mb-2 sm:text-2xl md:text-3xl'>
              {title}
            </h2>
            <h2 className='mb-4 text-xl font-bold text-white sm:mb-6 sm:text-2xl md:text-3xl'>
              {subtitle}
            </h2>
          </>
        ) : (
          <h2 className='mb-4 text-xl font-bold text-white sm:mb-6 sm:text-2xl md:text-3xl'>
            {title}
          </h2>
        )
      ) : (
        title
      )}
    </div>
  );
}
