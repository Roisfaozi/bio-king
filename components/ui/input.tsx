import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { InputColor, InputVariant, Radius, Shadow } from '@/lib/type';

//py-[10px]
export const inputVariants = cva(
  ' dark:border-700   h-9  w-full border-default-300  bg-background px-3   text-sm  transition duration-300 file:border-0 file:bg-transparent  file:text-sm file:font-medium  read-only:bg-background read-only:leading-9  disabled:cursor-not-allowed disabled:opacity-50 ',
  {
    variants: {
      color: {
        default:
          'border-default-300 text-default-500 placeholder:text-accent-foreground/50 focus:border-primary focus:outline-none  disabled:bg-default-200',
        primary:
          'border-primary text-primary placeholder:text-primary/70 focus:border-primary-700 focus:outline-none disabled:bg-primary/30  disabled:placeholder:text-primary',
        info: 'border-info/50 text-info placeholder:text-info/70 focus:border-info-700 focus:outline-none disabled:bg-info/30  disabled:placeholder:text-info',
        warning:
          'border-warning/50 text-warning placeholder:text-warning/70 focus:border-warning-700 focus:outline-none disabled:bg-warning/30  disabled:placeholder:text-info',
        success:
          'border-success/50 text-success placeholder:text-success/70 focus:border-success-700 focus:outline-none disabled:bg-success/30  disabled:placeholder:text-info',
        destructive:
          'border-destructive/50 text-destructive placeholder:text-destructive/70 focus:border-destructive-700 focus:outline-none disabled:bg-destructive/30  disabled:placeholder:text-destructive',
      },
      variant: {
        flat: 'bg-default-100 read-only:bg-default-100',
        underline: 'border-b',
        bordered: 'border  ',
        faded: 'border border-default-300 bg-default-100',
        ghost: 'border-0 focus:border',
        'flat-underline': 'border-b bg-default-100',
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
        '2xl': 'shadow-2xl',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded',
        md: 'rounded-lg',
        lg: 'rounded-xl',
        xl: 'rounded-[20px]',
      },
      size: {
        sm: 'h-8 text-xs read-only:leading-8',
        md: 'h-9 text-xs read-only:leading-9',
        lg: 'h-10 text-sm read-only:leading-10',
        xl: 'h-12 text-base read-only:leading-[48px]',
      },
    },
    compoundVariants: [
      {
        variant: 'flat',
        color: 'primary',
        className: 'bg-primary/10 read-only:bg-primary/10',
      },
      {
        variant: 'flat',
        color: 'info',
        className: 'bg-info/10 read-only:bg-info/10',
      },
      {
        variant: 'flat',
        color: 'warning',
        className: 'bg-warning/10 read-only:bg-warning/10',
      },
      {
        variant: 'flat',
        color: 'success',
        className: 'bg-success/10 read-only:bg-success/10',
      },
      {
        variant: 'flat',
        color: 'destructive',
        className: 'bg-destructive/10 read-only:bg-destructive/10',
      },
      {
        variant: 'faded',
        color: 'primary',
        className: 'border-primary/30 bg-primary/10 read-only:bg-primary/10',
      },
      {
        variant: 'faded',
        color: 'info',
        className: 'border-info/30 bg-info/10',
      },
      {
        variant: 'faded',
        color: 'warning',
        className: 'border-warning/30 bg-warning/10',
      },
      {
        variant: 'faded',
        color: 'success',
        className: 'border-success/30 bg-success/10',
      },
      {
        variant: 'faded',
        color: 'destructive',
        className: 'border-destructive/30 bg-destructive/10',
      },
    ],

    defaultVariants: {
      color: 'default',
      size: 'md',
      variant: 'bordered',
      radius: 'md',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  removeWrapper?: boolean;
  color?: InputColor;
  variant?: InputVariant;
  radius?: Radius;
  shadow?: Shadow;
  size?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size,
      color,
      radius,
      variant,
      shadow,
      removeWrapper = false,
      ...props
    },
    ref,
  ) => {
    return removeWrapper ? (
      <input
        type={type}
        className={cn(
          inputVariants({ color, size, radius, variant, shadow }),
          className,
        )}
        ref={ref}
        {...props}
      />
    ) : (
      <div className='w-full flex-1'>
        <input
          type={type}
          className={cn(
            inputVariants({ color, size, radius, variant, shadow }),
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
