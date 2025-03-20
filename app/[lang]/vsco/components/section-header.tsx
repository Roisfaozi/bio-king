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
    <div className={`mb-8 ${className}`}>
      {typeof title === 'string' ? (
        subtitle ? (
          <>
            <h2 className='mb-2 text-3xl font-bold'>{title}</h2>
            <h2 className='mb-6 text-3xl font-bold'>{subtitle}</h2>
          </>
        ) : (
          <h2 className='mb-6 text-3xl font-bold'>{title}</h2>
        )
      ) : (
        title
      )}
    </div>
  );
}
