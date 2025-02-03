import UpdateShortlinkForm from '@/app/[lang]/(dashboard)/(main)/bio-pages/[id]/edit/view';
import { getDictionary } from '@/app/dictionaries';

interface DashboardProps {
  params: {
    lang: any;
    id: string;
  };
}

const getBioPage = async (id: string) => {
  const url = new URL(`/api/bio-pages/${id}`, 'http://localhost:3000');
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const EditBioPage = async ({ params: { lang, id } }: DashboardProps) => {
  const trans = await getDictionary(lang);
  const { data } = await getBioPage(id);
  return <UpdateShortlinkForm id={id} trans={trans} data={data} />;
};

export default EditBioPage;
