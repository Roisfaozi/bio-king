import UpdateBioPageForm from '@/app/[lang]/(dashboard)/(main)/bio-pages/[id]/edit/view';
import { getDictionary } from '@/app/dictionaries';
import { getBio } from '@/action/bio-action';
import { BioPageResponse } from '@/models/bio-page-response';

interface DashboardProps {
  params: {
    lang: any;
    id: string;
  };
}

const getBioEditPage = async (id: string): Promise<BioPageResponse | any> => {
  try {
    const data = await getBio(id);
    if (data.status === 'success') {
      const bio = data.data;
      return bio as BioPageResponse;
    }
    return data;
  } catch (error) {
    console.error('Error fetching bio pages:', error);
  }
};

const EditBioPage = async ({ params: { lang, id } }: DashboardProps) => {
  const trans = await getDictionary(lang);
  const data = await getBioEditPage(id);
  console.log(data);
  return <UpdateBioPageForm id={id} trans={trans} data={data} />;
};

export default EditBioPage;
