import { getBio } from '@/action/bio-action';
import UpdateBioPageForm from '@/app/[lang]/(dashboard)/(main)/bio-pages/[id]/edit/view';
import { getDictionary } from '@/app/dictionaries';
import { BioPageResponse } from '@/models/bio-page-response';
import { revalidatePath } from 'next/cache';

interface DashboardProps {
  params: {
    lang: any;
    id: string;
  };
}

const getBioEditPage = async (id: string): Promise<BioPageResponse | any> => {
  try {
    const data = await getBio(id);
    if (data.status !== 'success') {
      throw new Error(data);
    }
    const bio = data.data;
    revalidatePath('/[lang]/(main)/bio-pages/[id]/edit', 'page');
    return bio as BioPageResponse;
  } catch (error: any) {
    console.error('Error fetching bio page:', error.response?.data || error);
  }
};

const EditBioPage = async ({ params: { lang, id } }: DashboardProps) => {
  const trans = await getDictionary(lang);
  const data = await getBioEditPage(id);
  return <UpdateBioPageForm id={id} trans={trans} data={data} />;
};

export default EditBioPage;
