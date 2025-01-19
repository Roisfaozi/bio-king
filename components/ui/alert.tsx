'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative flex w-full  items-start  space-x-4 rounded-lg p-4 rtl:space-x-reverse md:items-center ',
  {
    variants: {
      color: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary  text-secondary-foreground',
        success: 'bg-success text-success-foreground',
        info: 'bg-info text-info-foreground',
        warning: 'bg-warning text-warning-foreground',
        destructive: 'bg-destructive text-destructive-foreground ',
        dark: 'bg-gray-950 text-slate-50 ',
      },
      variant: {
        outline: 'border border-current bg-background ',
        soft: 'border-current bg-opacity-10 text-current    ',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        color: 'destructive',
        className: ' bg-transparent  text-destructive ',
      },
      {
        variant: 'outline',
        color: 'success',
        className: ' bg-transparent  text-success ',
      },
      {
        variant: 'outline',
        color: 'info',
        className: ' bg-transparent  text-info ',
      },
      {
        variant: 'outline',
        color: 'warning',
        className: ' bg-transparent  text-warning ',
      },
      {
        variant: 'outline',
        color: 'dark',
        className: ' text-dark  bg-transparent ',
      },

      {
        variant: 'outline',
        color: 'secondary',
        className: ' bg-transparent text-default-700  dark:text-default-400 ',
      },
      // soft

      {
        variant: 'soft',
        color: 'info',
        className: 'text-info',
      },
      {
        variant: 'soft',
        color: 'warning',
        className: 'text-warning',
      },
      {
        variant: 'soft',
        color: 'destructive',
        className: 'text-destructive',
      },
      {
        variant: 'soft',
        color: 'success',
        className: 'text-success',
      },
      {
        variant: 'soft',
        color: 'default',
        className: 'text-primary',
      },
      {
        variant: 'soft',
        color: 'secondary',
        className: 'bg-opacity-40 text-card-foreground',
      },
    ],
    defaultVariants: {
      color: 'default',
    },
  },
);

// Define interface for variant props
interface AlertVariantProps extends VariantProps<typeof alertVariants> {}

// Define interface for remaining HTML attributes
interface AlertHTMLProps extends React.HTMLAttributes<HTMLDivElement> {
  dismissible?: boolean;
  onDismiss?: () => void;
}

// Merge both interfaces to create final AlertProps
type AlertProps = AlertVariantProps & AlertHTMLProps;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, color, variant, dismissible, onDismiss, children, ...props },
    ref,
  ) => {
    const [dismissed, setDismissed] = React.useState(false);

    const handleDismiss = () => {
      setDismissed(true);
      if (onDismiss) {
        onDismiss();
      }
    };

    return !dismissed ? (
      <div
        ref={ref}
        role='alert'
        className={cn(alertVariants({ color, variant }), className)}
        {...props}
        {...props}
      >
        {children}
        {dismissible && (
          <button onClick={handleDismiss} className='grow-0'>
            <Icon icon='heroicons:x-mark' className='h-5 w-5' />
          </button>
        )}
      </div>
    ) : null;
  },
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      'mb-2 grow text-lg font-medium leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('grow text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
