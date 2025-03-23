'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ShortlinkWithClicksResponse } from '@/models/shortlink-response';
import { Loader2 } from 'lucide-react';

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  linkToDelete: ShortlinkWithClicksResponse | null;
  isLoading: boolean;
  onDelete: () => void;
}

const DeleteDialog = ({
  isOpen,
  onOpenChange,
  linkToDelete,
  isLoading,
  onDelete,
}: DeleteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Shortlink</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this shortlink? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label>Short URL</Label>
            <div className='rounded-md border border-input bg-muted px-3 py-2 text-sm'>
              {linkToDelete?.short_code}
            </div>
          </div>
          {linkToDelete?.title && (
            <div className='space-y-2'>
              <Label>Title</Label>
              <div className='rounded-md border border-input bg-muted px-3 py-2 text-sm'>
                {linkToDelete.title}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            disabled={isLoading}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
