import { getShortlinkByShortcode } from '@/action/links-action';
import { getDictionary } from '@/app/dictionaries';
import { notFound } from 'next/navigation';
import EditShortlinkView from './view';

interface EditShortlinkPageProps {
  params: {
    lang: 'en' | 'bn' | 'ar';
    short: string;
  };
}

const EditShortlinkPage = async ({ params }: EditShortlinkPageProps) => {
  const { lang, short } = params;
  const trans = await getDictionary(lang);

  // Fetch shortlink data
  const response = await getShortlinkByShortcode(short);

  // If shortlink not found or error, redirect to 404
  if (response.status !== 'success' || !response.data) {
    notFound();
  }

  return <EditShortlinkView trans={trans} shortlink={response.data} />;
};

export default EditShortlinkPage;
