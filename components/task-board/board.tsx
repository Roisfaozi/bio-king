'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { MoreHorizontal, Plus, Trash2, UserPlus } from 'lucide-react';

import { deleteBoardAction } from '@/action/project-action';
import DeleteConfirmationDialog from '@/components/delete-confirmation-dialog';

// dnd
import { type Board as BoardType } from '@/app/api/boards/data';
import { type Task as TaskType } from '@/app/api/tasks/data';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
interface TaskBoardProps {
  board: BoardType;
  children?: React.ReactNode;
  onEdit?: () => void;
  taskHandler?: () => void;
  isTaskOpen?: boolean;
  showButton?: boolean;
  tasks?: TaskType[];
  onUpdateTask?: (task: TaskType) => void;
  boards?: BoardType[];
}
const TaskBoard = ({
  board,
  children,
  onEdit,
  taskHandler,
  isTaskOpen,
  showButton,
  tasks,
  onUpdateTask,
  boards,
}: TaskBoardProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  async function onAction(id: string) {
    await deleteBoardAction(id);
  }
  const { name, status, id } = board;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'Column',
      board,
    },
    disabled: isTaskOpen,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <DeleteConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onAction(board.id)}
      />
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn(
          'w-full max-w-[277px] flex-none rounded-md border-t-4 bg-default-100 shadow-lg dark:bg-default-50',
          {
            'border-primary': status === 'primary',
            'border-warning': status === 'warning',
            'border-success': status === 'success',
            'opacity-50': isDragging,
          },
        )}
      >
        <CardHeader
          {...listeners}
          className='mb-0 flex-row items-center justify-between space-y-0 rounded-sm border-b border-default-200 px-3 py-2.5'
        >
          <div className='flex items-center'>
            <Button
              type='button'
              size='icon'
              className='h-5 w-5 rounded-sm border border-default-200 bg-transparent text-primary/80 hover:bg-transparent'
            >
              <UserPlus className='h-3 w-3' />
            </Button>
          </div>
          <div className='text-sm font-semibold capitalize text-default-800'>
            {name}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size='icon'
                className='h-8 w-8 rounded-full bg-transparent hover:bg-default-200'
              >
                <MoreHorizontal className='h-4 w-4 cursor-pointer text-default-900' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[196px]' align='end'>
              <DropdownMenuItem onSelect={onEdit}>
                <Icon
                  icon='heroicons:pencil-square'
                  className='mr-1 h-3.5 w-3.5 text-default-700'
                />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setOpen(true)}>
                <Trash2 className='mr-1 h-3.5 w-3.5 text-default-600' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        {/* main content  */}
        <CardContent className='px-0 pb-0'>
          {/* all tasks */}
          <div className='h-[calc(100vh-300px)]'>
            <ScrollArea className='h-full'>
              <div className='space-y-3 p-3'>{children}</div>
            </ScrollArea>
          </div>
        </CardContent>
        <CardFooter className='w-full px-3 pb-2'>
          {showButton && (
            <Button
              className='flex w-full items-center justify-center gap-1 bg-transparent hover:bg-transparent'
              onClick={taskHandler}
            >
              <Plus className='h-5 w-5 text-primary' />
              <span className='text-xs font-semibold text-primary'>
                Add Task
              </span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default TaskBoard;
