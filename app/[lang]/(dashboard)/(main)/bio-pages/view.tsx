import { BioPages } from '@prisma/client';

import { getBios } from '@/action/bio-action';
import AddBioDialog from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/add-bio-dialog';
import BioCard from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/bio-card';
import BioSummary from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/bio-summary';

interface BioPageViewProps {
  trans: {
    [key: string]: string;
  };
}

interface BioPagesWithClicksResponse extends BioPages {
  _count: {
    links: number;
  };
}

const getBioPages = async () => {
  try {
    const data = await getBios();
    if (data.status === 'success') {
      const bio = data.data;
      return bio as BioPagesWithClicksResponse[];
    }
    return [];
  } catch (error) {
    console.error('Error fetching bio pages:', error);
    return [];
  }
};

const BioPagesView = async ({ trans }: BioPageViewProps) => {
  const bio = await getBioPages();

  const totalViews =
    bio?.reduce((sum, page) => sum + (page._count?.links || 0), 0) || 0;
  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='text-2xl font-medium text-default-800'>
          Analytics {trans?.dashboard}
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
