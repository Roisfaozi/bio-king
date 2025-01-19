import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

const checkboxVariants = cva(
  'group peer  shrink-0   ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:stroke-primary-foreground ',
  {
    variants: {
      color: {
        default:
          'border border-default-400 data-[state=checked]:border-primary data-[state=checked]:bg-primary  ',
        secondary:
          'border border-default-300 data-[state=checked]:bg-default-300/90 ',

        destructive:
          'border  border-default-400 data-[state=checked]:border-destructive data-[state=checked]:bg-destructive ',
        warning:
          'border  border-default-400 data-[state=checked]:border-warning data-[state=checked]:bg-warning ',
        info: 'border  border-default-400 data-[state=checked]:border-info data-[state=checked]:bg-info ',
        success:
          'border  border-default-400 data-[state=checked]:border-success data-[state=checked]:bg-success ',
        dark: 'border  border-default-400 data-[state=checked]:bg-slate-900 ',
      },
      variant: {
        solid: 'bg-default-600',
        plain: ' border-none bg-transparent',
        faded: 'bg-card',
        filled: 'bg-default-200',
        outline: ' border border-current data-[state=checked]:bg-card',
        'filled-outline':
          'border-current bg-default-200 data-[state=checked]:bg-card',
      },
      radius: {
        none: '',
        sm: 'rounded-sm',
        base: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
      size: {
        xs: 'h-3 w-3 rounded-[2px] [&_svg]:h-2.5 [&_svg]:w-2.5',
        sm: 'h-4 w-4 [&_svg]:h-3 [&_svg]:w-3',
        md: 'h-5 w-5 [&_svg]:h-4 [&_svg]:w-4',
        lg: 'h-6 w-6 [&_svg]:h-4 [&_svg]:w-4',
        xl: 'h-7 w-7 [&_svg]:h-5 [&_svg]:w-5',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        color: 'destructive',
        className: ' border-destructive [&_svg]:stroke-destructive',
      },
      {
        variant: 'outline',
        color: 'success',
        className: ' border-success [&_svg]:stroke-success',
      },
      {
        variant: 'outline',
        color: 'info',
        className: ' border-info [&_svg]:stroke-info',
      },
      {
        variant: 'outline',
        color: 'warning',
        className: ' border-warning [&_svg]:stroke-warning',
      },
      {
        variant: 'outline',
        color: 'dark',
        className: ' border-foreground [&_svg]:stroke-foreground',
      },
      {
        variant: 'outline',
        color: 'default',
        className: ' border-primary [&_svg]:stroke-primary',
      },
      {
        variant: 'filled-outline',
        color: 'default',
        className: 'border-primary [&_svg]:stroke-primary',
      },
    ],

    defaultVariants: {
      color: 'default',
      size: 'md',
      radius: 'base',
      variant: 'faded',
    },
  },
);

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> &
  VariantProps<typeof checkboxVariants> & {
    lineThrough?: boolean;
    icon?: React.ReactNode;
  };

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      color,
      size,
      radius,
      variant,
      children,
      lineThrough,
      icon = <Check />,
      ...props
    },
    ref,
  ) => (
    <>
      {children ? (
        <div className='flex items-center'>
          <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
              checkboxVariants({ color, size, radius, variant }),
              className,
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator
              className={cn('flex items-center justify-center text-current')}
            >
              {icon}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          <Label
            htmlFor={props.id}
            className={cn(
              'transition-colors-opacity before:transition-width flex-1 cursor-pointer font-normal text-muted-foreground ltr:pl-2.5 rtl:pr-2.5 motion-reduce:transition-none',
              {
                'text-xs': size === 'xs',
                'text-sm': size === 'sm',
                'text-base': size === 'md',
                'text-lg': size === 'lg',
                'text-[18px]': size === 'xl',
                "text-medium relative inline-flex select-none items-center justify-center before:absolute before:h-0.5 before:w-0 before:bg-foreground before:content-[''] peer-data-[state=checked]:opacity-60 peer-data-[state=checked]:before:w-full":
                  lineThrough,
              },
            )}
          >
            {children}
          </Label>
        </div>
      ) : (
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            checkboxVariants({ color, size, radius, variant }),
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn('flex items-center justify-center text-current')}
          >
            {icon}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      )}
    </>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
