import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  merged?: boolean;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, merged, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'input-group group relative flex w-full flex-wrap items-stretch ltr:flex-row rtl:flex-row-reverse',
        className,
        {
          merged: merged,
        },
      )}
      {...props}
    />
  ),
);
InputGroup.displayName = 'InputGroup';

const InputGroupButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      '[&>*]:first:rounded-r-none [&>*]:last:rounded-l-none',
      className,
    )}
    {...props}
  />
));
InputGroupButton.displayName = 'InputGroupButton';

const InputGroupText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, color, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-center border border-default-300 bg-background px-3 text-sm font-normal text-default-500 ring-primary transition duration-300 first:rounded-l-md first:border-r-0 last:rounded-r-md last:border-l-0 group-focus-within:border-primary',
      className,
      {
        'border-info/50 ring-info-700 group-focus-within:border-info-700':
          color === 'info',
        'border-primary/50 ring-primary-700 group-focus-within:border-primary-700':
          color === 'primary',
        'border-success/50 ring-success-700 group-focus-within:border-success-700':
          color === 'success',
        'border-destructive/50 ring-destructive-700 group-focus-within:border-destructive-700':
          color === 'destructive',
        'border-warning/50 ring-warning-700 group-focus-within:border-warning-700':
          color === 'warning',
      },
    )}
    {...props}
  />
));
InputGroupText.displayName = 'InputGroupText';

export { InputGroup, InputGroupButton, InputGroupText };
