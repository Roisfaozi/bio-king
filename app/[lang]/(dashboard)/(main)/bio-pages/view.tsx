import { getBiosWithClick } from '@/action/bio-action';
import AddBioDialog from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/add-bio-dialog';
import BioCard from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/bio-card';
import BioSummary from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/bio-summary';
import { Badge } from '@/components/ui/badge';
import { BioPagesWithClicksResponse } from '@/models/bio-page-response';
import { Shield } from 'lucide-react';

interface BioPageViewProps {
  trans: {
    [key: string]: string;
  };
}

const getBioPages = async () => {
  try {
    const data = await getBiosWithClick();
    if (data.status === 'success') {
      return {
        data: data.data as BioPagesWithClicksResponse[],
        isAdmin: data.isAdmin || false,
      };
    }
    return { data: [], isAdmin: false };
  } catch (error) {
    console.error('Error fetching bio pages:', error);
    return { data: [], isAdmin: false };
  }
};

const BioPagesView = async ({ trans }: BioPageViewProps) => {
  const { data: bio, isAdmin } = await getBioPages();

  const totalViews =
    bio?.reduce((sum, page) => sum + (page._count?.clicks || 0), 0) || 0;
  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-medium text-default-800'>
            Bio Pages {trans?.dashboard}
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
              ? 'Semua halaman bio yang telah dibuat oleh semua pengguna dalam sistem.'
              : 'Halaman bio yang telah Anda buat untuk menampilkan profil dan tautan.'}
          </p>
        </div>
        <AddBioDialog />
      </div>
      <div className='w-full'>
        <BioSummary totalPages={bio?.length || 0} totalViews={totalViews} />
      </div>
      <div className='grid grid-cols-12 gap-6'>
        {bio &&
          bio.map((item, index) => (
            <div className='col-span-12 lg:col-span-4' key={index}>
              <BioCard bio={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BioPagesView;
