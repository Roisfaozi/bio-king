import type React from 'react';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
};

export default function PageContainer({
  children,
  className = '',
  fullWidth = false,
}: PageContainerProps) {
  return (
    <div
      className={`w-full ${fullWidth ? '' : 'px-4 sm:px-6 md:px-10 lg:px-16'} ${className}`}
    >
      <div className={`${fullWidth ? 'w-full' : 'mx-auto max-w-5xl'}`}>
        {children}
      </div>
    </div>
  );
}
