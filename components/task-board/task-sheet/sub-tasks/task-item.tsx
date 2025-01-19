'use client';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from '@/components/ui/avatar';
import { faker } from '@faker-js/faker';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { ArrowRightLeft, Check, Tag, Trash2, X } from 'lucide-react';

import AssignMembers from '../../common/assign-members';
import { cn } from '@/lib/utils';
import {
  updateSubTaskAction,
  deleteSubTaskAction,
} from '@/action/project-action';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DeleteConfirmationDialog from '@/components/delete-confirmation-dialog';
import { type SubTask as SubTaskType } from '@/app/api/tasks/data';
const TaskItem = ({
  subtask,
  handlerSubSheet,
}: {
  subtask: SubTaskType;
  handlerSubSheet: () => void;
}) => {
  const { completed, assignDate, id } = subtask;
  const [isDone, setIsDone] = React.useState<boolean>(completed);
  // update isComplete
  const [open, setOpen] = useState<boolean>(false);

  const handleIsComplete = async (value: boolean) => {
    try {
      const newData = {
        ...subtask,
        completed: value,
      };

      await updateSubTaskAction(id, newData);
    } catch (error) {
      console.log(error);
    }
    setIsDone(!isDone);
  };

  const onAction = async (dltId: string) => {
    await deleteSubTaskAction(dltId);
  };
  return (
    <>
      <DeleteConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onAction(id)}
      />
      <div
        className={cn(
          'flex cursor-pointer gap-2 border-b border-dashed border-default-200 px-6 py-3',
          {
            'bg-default-50': completed,
          },
        )}
        onClick={handlerSubSheet}
      >
        <div className='mt-1 flex-none'>
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              size='sm'
              checked={isDone}
              onCheckedChange={handleIsComplete}
            />
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex'>
            <div
              className={cn('flex-1 text-base font-medium text-default-900', {
                'line-through': completed,
              })}
            >
              {subtask?.title}
            </div>
            <div className='flex flex-none items-center gap-2'>
              {/* assigned members */}
              {subtask?.assign?.length > 0 && (
                <div>
                  <AvatarGroup
                    max={3}
                    total={subtask.assign.length}
                    countClass='w-7 h-7'
                  >
                    {subtask.assign?.map((user, i) => (
                      <Avatar
                        className='h-7 w-7 ring-1 ring-background ring-offset-2 ring-offset-background'
                        key={`avatar-key-${i}`}
                      >
                        <AvatarImage src={user.image} />
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </div>
              )}
              {/* add new members start*/}
              <div onClick={(e) => e.stopPropagation()}>
                <AssignMembers />
              </div>

              {/* add new members end*/}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type='button'
                    size='icon'
                    className='relative h-6 w-6 rounded-full bg-default-100 text-primary hover:bg-default-100'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon
                      icon='heroicons:ellipsis-horizontal'
                      className='h-4 w-4 text-default-900'
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-fit' align='end'>
                  {!completed && (
                    <>
                      <DropdownMenuItem className='gap-2'>
                        <Icon
                          icon='heroicons:calendar'
                          className='h-4 w-4 text-default-500'
                        />
                        Add a due date
                      </DropdownMenuItem>

                      <DropdownMenuItem className='gap-2'>
                        <Tag className='h-4 w-4 text-default-500' />
                        Manage Tags
                      </DropdownMenuItem>

                      <DropdownMenuItem className='gap-2'>
                        <Check className='h-4 w-4 text-default-500' />
                        Convert to a task
                      </DropdownMenuItem>
                      <DropdownMenuItem className='gap-2'>
                        <ArrowRightLeft className='h-4 w-4 text-default-500' />
                        Move into another task
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem
                    className='group gap-2 hover:bg-destructive hover:text-destructive-foreground'
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(true);
                    }}
                  >
                    <Trash2 className='h-4 w-4 text-default-500 group-hover:text-destructive-foreground' />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='mt-3 flex items-center gap-3'>
            {completed ? (
              <Badge
                color='success'
                variant='soft'
                className='rounded px-1 py-0 text-[10px] capitalize leading-4'
              >
                Completed
              </Badge>
            ) : (
              <Badge
                color='warning'
                variant='soft'
                className='rounded px-1 py-0 text-[10px] capitalize leading-4'
              >
                {subtask.priority}
              </Badge>
            )}

            <div className='flex items-center gap-1 text-xs text-default-500'>
              <Icon
                icon='heroicons:calendar'
                className='h-3.5 w-3.5 text-default-500'
              />
              <span>{assignDate}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
