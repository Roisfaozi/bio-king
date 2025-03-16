import { getAnalytics } from '@/action/analytics-action';
import { getDictionary } from '@/app/dictionaries';
import AnalyticsView from './view';

interface AnalyticsPageProps {
  params: {
    lang: 'en' | 'bn' | 'ar';
  };
}

const AnalyticsPage = async ({ params: { lang } }: AnalyticsPageProps) => {
  const trans = await getDictionary(lang);

  // Fetch analytics data
  const response = await getAnalytics();

  return <AnalyticsView trans={trans} analytics={response} />;
};

export default AnalyticsPage;
