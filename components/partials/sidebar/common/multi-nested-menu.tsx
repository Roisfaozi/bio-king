import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { cn, getDynamicPath, isLocationMatch, translate } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const MultiNestedMenu = ({
  subItem,
  subIndex,
  activeMultiMenu,
  trans,
}: {
  subItem: any;
  subIndex: number;
  activeMultiMenu: number | null;
  trans: any;
}) => {
  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);

  return (
    <Collapsible open={activeMultiMenu === subIndex}>
      <CollapsibleContent className='CollapsibleContent'>
        <ul className='space-y-3 pl-1'>
          {subItem?.multi_menu?.map((item: any, i: number) => (
            <li className='first:pt-3' key={i}>
              <Link href={item.href}>
                <span
                  className={cn(
                    'flex items-center gap-3 text-sm capitalize transition-all duration-150 hover:text-primary',
                    {
                      'text-primary': isLocationMatch(item.href, locationName),
                      'text-default-600': !isLocationMatch(
                        item.href,
                        locationName,
                      ),
                    },
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-2 w-2 rounded-full border border-default-500',
                      {
                        'border-primary bg-primary ring-[4px] ring-primary/30':
                          isLocationMatch(item.href, locationName),
                      },
                    )}
                  ></span>
                  <span className='flex-1'>{translate(item.title, trans)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MultiNestedMenu;
