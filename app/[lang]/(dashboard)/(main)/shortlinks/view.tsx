'use client';

import {
  createShortlink,
  deleteShortlinkByShortcode,
  getShortlinks,
} from '@/action/links-action';
import { ShortlinkWithClicksResponse } from '@/models/shortlink-response';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { CreateShortlinkDialog } from './components/create-shortlink-dialog';
import DeleteDialog from './components/delete-dialog';
import ShortlinksContent from './components/shortlinks-content';
import ShortlinksFilter from './components/shortlinks-filter';
import ShortlinksHeader from './components/shortlinks-header';
import { z } from 'zod';
import { createShortlinkSchema } from '@/validation/link';

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
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newLink, setNewLink] = useState({
    original_url: '',
    title: '',
    page_type: 'tinder',
  });
  const [linkToDelete, setLinkToDelete] =
    useState<ShortlinkWithClicksResponse | null>(null);
  const router = useRouter();

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

  const handleCreateShortlink = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await createShortlink(newLink);

      if (response.status === 'success') {
        // Add the new shortlink to the local state
        if (response.data) {
          setShortlinks((prev) => [response.data, ...prev]);
        }
        toast.success('Link created successfully!');
        setIsCreateDialogOpen(false);
        setNewLink({ original_url: '', title: '', page_type: 'tinder' });
      } else {
        toast.error(response.message || 'Failed to create link');
      }
    } catch (error) {
      console.error('Error creating shortlink:', error);
      toast.error('Failed to create link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrapLinkSubmit = async (
    type: 'tinder' | 'vsco',
    title: string,
  ) => {
    try {
      const url = `/api/trap/${type}`;
      console.log('Creating trap link with URL:', url);

      const response = await createShortlink({
        original_url: url,
        type: 'traplink',
        title: title || `${type.charAt(0).toUpperCase() + type.slice(1)} Trap`,
        page_type: type,
      });

      if (response.status === 'success') {
        toast.success('Trap link created successfully');
        router.refresh();
      } else {
        toast.error(response.message || 'Failed to create trap link');
      }
    } catch (error) {
      console.error('Error creating trap link:', error);
      toast.error('Failed to create trap link');
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setNewLink((prev) => ({ ...prev, [field]: value }));
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

  // Tambahkan fungsi fetchShortlinks untuk memuat ulang data
  const fetchShortlinks = async () => {
    try {
      setIsLoading(true);
      // Dapatkan semua shortlinks dari API endpoint
      const { status, data } = await getShortlinks();
      if (status === 'success' && data) {
        setShortlinks(data);
      }
    } catch (error) {
      console.error('Error fetching shortlinks:', error);
      toast.error('Failed to load shortlinks');
    } finally {
      setIsLoading(false);
    }
  };

  // Load shortlinks on mount
  useEffect(() => {
    fetchShortlinks();
  }, []);

  return (
    <div className='space-y-6'>
      <ShortlinksHeader
        onCreateClick={handleCreateShortlink}
        isAdmin={isAdmin}
        trans={trans}
      />

      <ShortlinksFilter
        searchQuery={searchQuery}
        activeTab={activeTab}
        onSearchChange={setSearchQuery}
        onTabChange={setActiveTab}
      />

      <ShortlinksContent
        shortlinks={shortlinks}
        filteredLinks={filteredLinks}
        onDelete={handleDeleteClick}
        onCreateClick={handleCreateShortlink}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        linkToDelete={linkToDelete}
        isLoading={isLoading}
        onDelete={handleDeleteSubmit}
      />

      <CreateShortlinkDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={(values) => {
          createShortlink(values)
            .then((response) => {
              if (response.status === 'success') {
                if (response.data) {
                  setShortlinks((prev) => [response.data, ...prev]);
                }
                toast.success('Link created successfully!');
                setIsCreateDialogOpen(false);
              } else {
                toast.error(response.message || 'Failed to create link');
              }
            })
            .catch((error) => {
              console.error('Error creating shortlink:', error);
              toast.error('Failed to create link');
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
        onTrapLinkSubmit={handleTrapLinkSubmit}
      />
    </div>
  );
};

export default ShortlinksPageView;
