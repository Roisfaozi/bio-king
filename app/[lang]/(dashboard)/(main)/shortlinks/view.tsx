'use client';

import { deleteShortlinkByShortcode } from '@/action/links-action';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { credentialsConfig } from '@/config/credentials.config';
import { formatEpochDate } from '@/lib/utils';
import { ShortlinkWithClicksResponse } from '@/models/shortlink-response';
import {
  ChartBar,
  Copy,
  Edit,
  ExternalLink,
  Link2,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ShortlinksPageViewProps {
  trans: {
    [key: string]: string;
  };
  shortlinks: ShortlinkWithClicksResponse[];
  isAdmin?: boolean;
}

const ShortlinksPageView = ({
  trans,
  shortlinks: initialShortlinks,
  isAdmin = false,
}: ShortlinksPageViewProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [shortlinks, setShortlinks] =
    useState<ShortlinkWithClicksResponse[]>(initialShortlinks);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] =
    useState<ShortlinkWithClicksResponse | null>(null);
  const router = useRouter();

  const getStatusBadge = (isActive: boolean | null) => {
    if (isActive === true) {
      return (
        <Badge className='bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900'>
          Active
        </Badge>
      );
    }
    return (
      <Badge className='bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'>
        Inactive
      </Badge>
    );
  };

  // Filter shortlinks based on active tab and search query
  const filteredLinks = shortlinks
    .filter((link) => {
      if (activeTab === 'all') return true;
      return activeTab === 'active'
        ? link.is_active === true
        : link.is_active !== true;
    })
    .filter((link) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        link.title?.toLowerCase().includes(query) ||
        false ||
        link.short_code.toLowerCase().includes(query) ||
        link.original_url.toLowerCase().includes(query)
      );
    });

  const handleCopyLink = (shortCode: string) => {
    const fullUrl = `${credentialsConfig.siteUrl}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Link copied to clipboard!');
  };

  const handleOpenLink = (shortCode: string) => {
    const fullUrl = `${credentialsConfig.siteUrl}/${shortCode}`;
    window.open(fullUrl, '_blank');
  };

  const handleCreateShortlink = () => {
    router.push('/dashboard');
  };

  const handleEditClick = (link: ShortlinkWithClicksResponse) => {
    router.push(`/shortlinks/${link.short_code}/edit`);
  };

  const handleDeleteClick = (link: ShortlinkWithClicksResponse) => {
    setLinkToDelete(link);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!linkToDelete) return;

    setIsLoading(true);
    try {
      const response = await deleteShortlinkByShortcode(
        linkToDelete.short_code,
      );

      if (response.status === 'success') {
        // Remove the shortlink from the local state
        setShortlinks((prev) =>
          prev.filter((link) => link.id !== linkToDelete.id),
        );
        toast.success('Shortlink deleted successfully');
        setIsDeleteDialogOpen(false);
      } else {
        toast.error(response.message || 'Failed to delete shortlink');
      }
    } catch (error) {
      console.error('Error deleting shortlink:', error);
      toast.error('An error occurred while deleting the shortlink');
    } finally {
      setIsLoading(false);
    }
  };

  // Tampilkan jumlah klik
  const getClickCount = (link: ShortlinkWithClicksResponse) => {
    return link._count?.clicks || 0;
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {trans?.shortlinks || 'Shortlinks'}
            {isAdmin && (
              <Badge
                variant='outline'
                className='ml-2 bg-yellow-100 text-yellow-800'
              >
                <Shield className='mr-1 h-3 w-3' />
                Admin Mode
              </Badge>
            )}
          </h1>
          <p className='text-muted-foreground'>
            {isAdmin
              ? 'Semua shortlink yang telah dibuat oleh semua pengguna dalam sistem.'
              : 'Semua shortlink yang telah Anda buat untuk halaman bio dan tautan eksternal.'}
          </p>
        </div>

        <Button
          onClick={handleCreateShortlink}
          size='sm'
          className='flex items-center gap-1'
        >
          <Plus className='h-4 w-4' /> Buat Link Baru
        </Button>
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        <div className='relative flex-1'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search shortlinks...'
            className='pl-8'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs
          defaultValue='all'
          className='w-full md:w-auto'
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value='all'>All Links</TabsTrigger>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='inactive'>Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Your Shortlinks</CardTitle>
          <CardDescription>
            You have {filteredLinks.length} shortlinks in total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {shortlinks.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-8 text-center'>
              <p className='mb-4 text-muted-foreground'>
                You don't have any shortlinks yet
              </p>
              <Button onClick={handleCreateShortlink}>
                Create your first shortlink
              </Button>
            </div>
          ) : filteredLinks.length === 0 ? (
            <div className='py-8 text-center text-muted-foreground'>
              No shortlinks match your search criteria
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Short URL</TableHead>
                  <TableHead className='hidden md:table-cell'>
                    Original URL
                  </TableHead>
                  <TableHead className='hidden md:table-cell'>
                    Created
                  </TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className='font-medium'>
                      {link.title || 'Untitled'}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Link2 className='h-4 w-4 text-muted-foreground' />
                        <span className='text-sm'>{link.short_code}</span>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-6 w-6 rounded-full'
                          onClick={() => handleCopyLink(link.short_code)}
                        >
                          <Copy className='h-3 w-3' />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className='hidden max-w-[200px] truncate md:table-cell'>
                      <span className='text-sm text-muted-foreground'>
                        {link.original_url}
                      </span>
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {formatEpochDate(Number(link.created_at), 'PPP')}
                    </TableCell>
                    <TableCell>{getClickCount(link)}</TableCell>
                    <TableCell>{getStatusBadge(link.is_active)}</TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/shortlinks/${link.short_code}/analytics`,
                              )
                            }
                          >
                            <ChartBar className='mr-2 h-4 w-4' />
                            Statistik
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='flex items-center gap-2'
                            onClick={() => handleOpenLink(link.short_code)}
                          >
                            <ExternalLink className='h-4 w-4' />
                            <span>Open</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='flex items-center gap-2'
                            onClick={() => handleCopyLink(link.short_code)}
                          >
                            <Copy className='h-4 w-4' />
                            <span>Copy URL</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className='flex items-center gap-2'
                            onClick={() => handleEditClick(link)}
                          >
                            <Edit className='h-4 w-4' />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <Separator className='my-1' />
                          <DropdownMenuItem
                            className='flex items-center gap-2 text-destructive focus:text-destructive'
                            onClick={() => handleDeleteClick(link)}
                          >
                            <Trash2 className='h-4 w-4' />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
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
            <Button
              variant='outline'
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteSubmit}
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
    </div>
  );
};

export default ShortlinksPageView;
