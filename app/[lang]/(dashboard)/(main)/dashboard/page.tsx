import { getDictionary } from '@/app/dictionaries';
import DashboardPageView from './view';

interface DashboardProps {
  params: {
    lang: any;
  };
}

const Dashboard = async ({ params: { lang } }: DashboardProps) => {
  const trans = await getDictionary(lang);
  return <DashboardPageView trans={trans} />;
};

export default Dashboard;
