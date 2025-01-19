import { Envelope } from '@/components/svg';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import shortImage from '@/public/images/all-img/short-image.png';
import Link from 'next/link';
import { contacts } from './data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const Inbox = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='relative h-8 w-8 rounded-full text-default-500 hover:bg-default-100 hover:text-primary data-[state=open]:bg-default-100 dark:text-default-800 dark:hover:bg-default-200 dark:data-[state=open]:bg-default-200 md:h-9 md:w-9'
        >
          <Envelope className='h-5 w-5' />
          <Badge className='absolute bottom-[calc(100%-16px)] left-[calc(100%-18px)] h-4 w-4 items-center justify-center p-0 text-xs font-medium ring-2 ring-primary-foreground'>
            1
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='z-[999] mx-4 p-0 lg:w-[412px]'
      >
        <DropdownMenuLabel
          style={{ backgroundImage: `url(${shortImage.src})` }}
          className='flex h-full w-full items-center bg-cover bg-no-repeat p-4'
        >
          <span className='flex-1 text-base font-semibold text-white'>
            Message
          </span>
          <Link
            href='/view-message'
            className='flex-0 text-xs font-medium text-white hover:underline hover:decoration-default-100 dark:decoration-default-900'
          >
            View All
          </Link>
        </DropdownMenuLabel>
        <div className='h-[350px] xl:h-[420px]'>
          <ScrollArea className='h-full'>
            {contacts.map((item, index) => (
              <DropdownMenuItem
                key={`inbox-${index}`}
                className='flex cursor-pointer gap-9 rounded-none px-4 py-2 dark:hover:bg-background'
              >
                <div className='flex flex-1 items-center gap-2'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='mb-[2px] whitespace-nowrap text-sm font-medium text-default-900'>
                      {item.fullName}
                    </div>
                    <div className='max-w-[100px] truncate text-xs text-default-900 lg:max-w-[185px]'>
                      {' '}
                      {item.about}
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    'whitespace-nowrap text-xs font-medium text-default-900',
                    {
                      'text-default-600': !item.unreadmessage,
                    },
                  )}
                >
                  {item.date}
                </div>
                <div
                  className={cn('mr-2 h-2 w-2 rounded-full', {
                    'bg-primary': !item.unreadmessage,
                  })}
                ></div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Inbox;
