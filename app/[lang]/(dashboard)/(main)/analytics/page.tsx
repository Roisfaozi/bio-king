import AnalitycsPageView from '@/app/[lang]/(dashboard)/(main)/analytics/view';
import { getDictionary } from '@/app/dictionaries';

interface DashboardProps {
  params: {
    lang: any;
  };
}
const BioPages = async ({ params: { lang } }: DashboardProps) => {
  const trans = await getDictionary(lang);
  return <AnalitycsPageView trans={trans} />;
};

export default BioPages;
