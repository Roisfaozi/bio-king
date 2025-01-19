import React from 'react';
import { cn } from '@/lib/utils';
const FooterLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <footer className={cn('relative border-t bg-card px-6 py-4', className)}>
      {children}
    </footer>
  );
};

export default FooterLayout;
