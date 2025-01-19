import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const kbdVariants = cva(
  ' inline-flex h-8 items-center space-x-0.5 rounded-xl border  border-default-300 bg-default-100 px-3  text-center font-medium    leading-none   text-default-600 [&>abbr]:leading-none',
  {
    variants: {
      variant: {
        default: 'iam-default',
      },
      size: {
        sm: ' h-7 rounded-lg text-xs [&>abbr]:text-sm',
        md: ' text-sm [&>abbr]:text-lg',
        lg: ' h-9 px-4  text-base [&>abbr]:text-xl',
        xl: ' h-10 px-4  text-xl [&>abbr]:text-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

interface KbdProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof kbdVariants> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default';
  keys: string[];
}
const Kbd = React.forwardRef<HTMLDivElement, KbdProps>(
  (
    {
      className,
      keys,
      children,
      variant,
      size,

      ...props
    },
    ref,
  ) => {
    const kbdKeysMap: Record<string, string> = {
      command: '⌘',
      shift: '⇧',
      ctrl: '⌃',
      option: '⌥',
      enter: '↵',
      delete: '⌫',
      escape: '⎋',
      tab: '⇥',
      capslock: '⇪',
      up: '↑',
      right: '→',
      down: '↓',
      left: '←',
      pageup: '⇞',
      pagedown: '⇟',
      home: '↖',
      end: '↘',
      help: '?',
      space: '␣',
    };
    const getKeys = keys.map((key) => {
      const keyLabel = kbdKeysMap[key];
      return (
        <abbr key={key} title={`key-${key}`} className='no-underline'>
          {keyLabel}
        </abbr>
      );
    });
    return (
      <kbd ref={ref} className={cn(kbdVariants({ variant, size }), className)}>
        {getKeys}
        <span className='leading-none'>{children}</span>
      </kbd>
    );
  },
);
Kbd.displayName = 'Kbd';
export { Kbd };
