'use client';

import {
  deleteShortlinkByShortcode,
  createShortlink,
} from '@/action/links-action';
import { ShortlinkWithClicksResponse } from '@/models/shortlink-response';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ShortlinksHeader from './components/shortlinks-header';
import ShortlinksFilter from './components/shortlinks-filter';
import ShortlinksContent from './components/shortlinks-content';
import DeleteDialog from './components/delete-dialog';
import { CreateShortlinkDialog } from './components/create-shortlink-dialog';

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
    pageType: 'tinder' | 'vsco',
    title: string,
  ) => {
    setIsLoading(true);

    try {
      // URL yang dikirim ke API harus berupa path relatif yang valid
      const originalUrl = `/api/trap/${pageType}`;
      console.log('Creating trap link with URL:', originalUrl);

      const response = await createShortlink({
        original_url: originalUrl,
        title:
          title ||
          `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} Trap`,
        page_type: pageType,
        type: 'traplink',
      });

      console.log('Trap link creation response:', response);

      if (response) {
        if (response.code) {
          // Jika berhasil, response akan memiliki code
          toast.success(`${pageType.toUpperCase()} Trap link berhasil dibuat!`);

          // Refresh data setelah berhasil membuat trap link
          fetchShortlinks();
        } else {
          toast.error(response.detail || 'Gagal membuat trap link');
        }
        setIsCreateDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating trap link:', error);
      toast.error(
        error instanceof Error ? error.message : 'Gagal membuat trap link',
      );
    } finally {
      setIsLoading(false);
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
      const response = await fetch('/api/links');
      if (!response.ok) {
        throw new Error('Failed to fetch shortlinks');
      }
      const data = await response.json();
      if (data.status === 'success' && data.data) {
        setShortlinks(data.data);
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
