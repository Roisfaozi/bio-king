import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const breadcrumbItemsVariants = cva(
  ' flex items-center gap-1 underline-offset-4  transition ',
  {
    variants: {
      color: {
        default:
          'hover:default-600/80 text-default-600 aria-[current=page]:text-primary data-[state=active]:text-primary',
        primary:
          'text-primary/80 hover:text-primary/60 aria-[current=page]:text-primary data-[state=active]:text-primary',
        success:
          'text-success/80 hover:text-success/60 aria-[current=page]:text-success data-[state=active]:text-success',
        info: 'text-info/80 hover:text-info/60 aria-[current=page]:text-info data-[state=active]:text-info',
        warning:
          'text-warning/80  hover:text-warning/60 aria-[current=page]:text-warning data-[state=active]:text-warning',
        destructive:
          'text-destructive/80  hover:text-destructive/60 aria-[current=page]:text-destructive data-[state=active]:text-destructive',
      },

      underline: {
        none: 'no-underline',
        hover: 'hover:underline',
        always: 'underline',
        active: 'active:underline',
        focus: 'focus:underline',
      },
      size: {
        md: 'text-base',
        sm: 'text-sm',
        lg: 'text-lg',
      },
    },

    defaultVariants: {
      color: 'default',
      size: 'sm',
      underline: 'none',
    },
  },
);
const breadcrumbsVariants = cva(' flex max-w-fit list-none flex-wrap ', {
  variants: {
    variant: {
      default: 'default-style',
      solid: ' rounded bg-muted p-3',
      bordered: 'rounded border-2 border-border p-3',
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});

interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof breadcrumbsVariants> {
  maxItems?: number;
  itemsBeforeCollapse?: any;
  itemsAfterCollapse?: any;
  renderEllipsis?: React.ReactNode;
  separator?: React.ReactNode;
  itemClasses?: string;
  disabled?: boolean;
  variant?: 'solid' | 'default' | 'bordered';
  underline?: string;
  ellipsisClass?: string;
  size?: any;
  color?: any;
}
const Breadcrumbs = React.forwardRef<HTMLOListElement, BreadcrumbsProps>(
  (
    {
      className,
      children,
      maxItems,
      itemsBeforeCollapse,
      itemsAfterCollapse,
      color,
      size,
      disabled,
      separator = (
        <Icon icon='heroicons:chevron-right' className='rtl:rotate-180' />
      ),
      variant,
      underline,
      renderEllipsis,
      ellipsisClass,
      itemClasses,
      ...props
    },
    ref,
  ) => {
    const breadcrumbItems = React.Children.toArray(children);
    const totalItems = breadcrumbItems.length;

    let visibleItems: React.ReactNode[] = breadcrumbItems;
    if (maxItems && totalItems > maxItems) {
      const visibleBefore = Math.min(
        itemsBeforeCollapse,
        totalItems - itemsAfterCollapse,
      );
      const visibleAfter = Math.min(
        itemsAfterCollapse,
        totalItems - visibleBefore,
      );
      visibleItems = [
        ...breadcrumbItems.slice(0, visibleBefore),
        null, // Placeholder for ellipsis
        ...breadcrumbItems.slice(totalItems - visibleAfter),
      ];
    }

    return (
      <ol
        ref={ref}
        className={cn(breadcrumbsVariants({ variant }), className)}
        {...props}
      >
        {visibleItems.map((child, index) => {
          const isLast = index === visibleItems.length - 1;

          const isCurrent =
            isLast || (child as React.ReactElement)?.props?.isCurrent;
          if (child === null) {
            return (
              <li
                key={`breadcrumb-ellipsis-${index}`}
                className={cn('flex items-center', {
                  'gap-1 text-base': renderEllipsis,
                })}
              >
                {renderEllipsis ? (
                  <div
                    className={cn(
                      'flex items-center gap-1 text-default-600',
                      ellipsisClass,
                    )}
                  >
                    {renderEllipsis}
                    <span className='separator self-center px-1'>
                      {separator ? (
                        separator
                      ) : (
                        <Icon icon='heroicons:chevron-right' />
                      )}
                    </span>
                  </div>
                ) : (
                  <div
                    className={cn(
                      'flex gap-1 text-base text-default-600',
                      ellipsisClass,
                    )}
                  >
                    <span>
                      <Icon icon='heroicons:ellipsis-horizontal' />
                    </span>
                    <span className='separator self-center px-1'>
                      {separator ? (
                        separator
                      ) : (
                        <Icon icon='heroicons:chevron-right' />
                      )}
                    </span>
                  </div>
                )}
              </li>
            );
          }
          return React.cloneElement(child as React.ReactElement, {
            ...props,
            isLast,
            isCurrent,
            disabled: disabled && !isLast,
            separator: separator,
            className: cn(
              breadcrumbItemsVariants({ color, size }),
              (child as React.ReactElement).props.className,
              itemClasses,
            ),
          });
        })}
      </ol>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';

const BreadcrumbItem = React.forwardRef<HTMLSpanElement, any>(
  (
    {
      className,
      children,
      color,
      isLast,
      href,
      size,
      disabled,
      underline,
      startContent,
      endContent,
      separator,
      isCurrent,
      onAction,
      modifier,
      ...props
    },
    ref,
  ) => {
    const ariaCurrent = isCurrent ? 'page' : null;
    const dataState = isCurrent ? 'active' : null;
    const dataDisabled = disabled && !isCurrent ? 'true' : null;

    const handleClick = () => {
      if (onAction && !isCurrent) {
        onAction(children);
      }
    };

    return (
      <li className='inline-flex items-center'>
        <span
          ref={ref}
          className={cn(
            breadcrumbItemsVariants({ color, size, underline }),
            className,
            {
              'cursor-pointer': (!isCurrent && onAction) || !isLast,
              'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50':
                disabled && !isCurrent,
            },
          )}
          aria-current={ariaCurrent}
          data-state={dataState}
          data-disabled={dataDisabled}
          onClick={handleClick}
          {...props}
        >
          {startContent && <span>{startContent}</span>}
          {href ? <Link href={href}>{children}</Link> : children}
          {endContent && <span>{endContent}</span>}
          {!isLast && separator && (
            <span className='separator cursor-default px-1'>{separator}</span>
          )}
        </span>
      </li>
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export { Breadcrumbs, BreadcrumbItem };
