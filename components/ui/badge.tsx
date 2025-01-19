import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-[2px] text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      color: {
        default: 'border-transparent bg-primary text-primary-foreground ',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
        success: 'border-transparent bg-success  text-success-foreground ',
        info: 'border-transparent bg-info text-info-foreground ',
        warning: 'border-transparent  bg-warning text-warning-foreground',
        secondary: 'border-transparent bg-secondary text-foreground ',
        dark: 'border-transparent bg-accent-foreground text-accent ',
      },
      variant: {
        outline: 'border border-current bg-background  ',
        soft: 'bg-opacity-10 text-current  hover:text-primary-foreground',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        color: 'destructive',
        className: 'text-destructive',
      },
      {
        variant: 'outline',
        color: 'success',
        className: 'text-success',
      },
      {
        variant: 'outline',
        color: 'info',
        className: 'text-info',
      },
      {
        variant: 'outline',
        color: 'warning',
        className: 'text-warning',
      },
      {
        variant: 'outline',
        color: 'dark',
        className: 'text-accent-foreground',
      },
      {
        variant: 'outline',
        color: 'secondary',
        className:
          'border-default-500 text-muted-foreground dark:bg-transparent',
      },
      {
        variant: 'outline',
        color: 'default',
        className: 'text-primary',
      },
      // soft button variant
      {
        variant: 'soft',
        color: 'default',
        className: 'text-primary hover:text-primary',
      },
      {
        variant: 'soft',
        color: 'info',
        className: 'text-info hover:text-info',
      },
      {
        variant: 'soft',
        color: 'warning',
        className: 'text-warning hover:text-warning',
      },
      {
        variant: 'soft',
        color: 'destructive',
        className: 'text-destructive hover:text-destructive',
      },
      {
        variant: 'soft',
        color: 'success',
        className: 'text-success hover:text-success',
      },
      {
        variant: 'soft',
        color: 'secondary',
        className:
          '!bg-opacity-50 text-muted-foreground hover:text-muted-foreground ',
      },
      {
        variant: 'soft',
        color: 'default',
        className: 'text-primary hover:text-primary',
      },
    ],
    defaultVariants: {
      color: 'default',
    },
  },
);
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  variant?: 'outline' | 'soft';
  color?:
    | 'default'
    | 'destructive'
    | 'success'
    | 'info'
    | 'warning'
    | 'dark'
    | 'secondary';
}

function Badge({ className, color, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ color, variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
