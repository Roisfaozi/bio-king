import { cn, translate } from '@/lib/utils';

const MenuLabel = ({
  item,
  className,
  trans,
}: {
  item: any;
  className?: string;
  trans: any;
}) => {
  const { title } = item;
  return (
    <div
      className={cn(
        'mb-3 mt-4 text-xs font-semibold uppercase text-default-900',
        className,
      )}
    >
      {translate(title, trans)}
    </div>
  );
};

export default MenuLabel;
