'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

import { postCommentAction } from '@/action/project-action';
import avatar from '@/public/images/avatar/avatar-7.jpg';
import { SendHorizontal } from 'lucide-react';
import { type Task as TaskType } from '@/app/api/tasks/data';
const CommentFooter = ({ taskId }: { taskId?: TaskType['id'] }) => {
  const [message, setMessage] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto'; // Reset the height to auto to adjust
    e.target.style.height = `${e.target.scrollHeight - 15}px`;
  };

  const handleSelectEmoji = (emoji: any) => {
    setMessage(message + emoji.native);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = {
      name: 'CodeShaper',
      avatar: avatar,
      text: message,
      date: formatDate(new Date()),
      subTaskId: taskId,
    };

    try {
      await postCommentAction(newMessage as any);
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex w-full items-end gap-4 px-4'>
        <div className='flex-1'>
          <form onSubmit={handleSubmit}>
            <div className='relative flex gap-1'>
              <textarea
                value={message}
                placeholder='Type your message...'
                className='h-10 flex-1 break-words rounded-xl bg-default-100 p-1 px-3 pt-2'
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
                style={{
                  minHeight: '40px',
                  maxHeight: '120px',
                  overflowY: 'auto',
                  resize: 'none',
                }}
              />

              <Button
                type='submit'
                className='h-[42px] w-[42px] self-end rounded-full bg-default-100 p-0 hover:bg-default-100'
              >
                <SendHorizontal className='h-8 w-5 text-primary' />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentFooter;
