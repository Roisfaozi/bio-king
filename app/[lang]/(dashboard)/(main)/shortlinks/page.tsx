import { getShortlinks } from '@/action/links-action';
import ShortlinksPageView from '@/app/[lang]/(dashboard)/(main)/shortlinks/view';
import { getDictionary } from '@/app/dictionaries';
import { ShortlinkWithClicksResponse } from '@/models/shortlink-response';

interface ShortlinksPageProps {
  params: {
    lang: 'en' | 'bn' | 'ar';
  };
}

const ShortlinksPage = async ({ params: { lang } }: ShortlinksPageProps) => {
  const trans = await getDictionary(lang);

  // Fetch shortlinks data
  const response = await getShortlinks(100); // Get up to 100 shortlinks
  let shortlinks: ShortlinkWithClicksResponse[] = [];
  let isAdmin = false;

  if (response.status === 'success') {
    shortlinks = response.data;
    // Periksa apakah ada properti isAdmin
    isAdmin = response.isAdmin === true;
  }

  return (
    <ShortlinksPageView
      trans={trans}
      shortlinks={shortlinks}
      isAdmin={isAdmin}
    />
  );
};

export default ShortlinksPage;
