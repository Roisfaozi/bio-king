import AddBioDialog from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/add-bio-dialog';
import BioCard from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/bio-card';
import BioSummary from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/bio-summary';
import avatar2 from '@/public/images/avatar/avatar-2.jpg';
import avatar3 from '@/public/images/avatar/avatar-3.jpg';
import avatar4 from '@/public/images/avatar/avatar-4.jpg';
import avatar5 from '@/public/images/avatar/avatar-5.jpg';
import avatar1 from '@/public/images/avatar/avatar-7.jpg';
interface BiooPageViewProps {
  trans: {
    [key: string]: string;
  };
}

const biopage = [
  {
    title: 'John Smith',
    image: avatar1.src,
    url: 'https://example.com/john-smith',
    views: 200,
    createdAt: '2023-01-01',
  },
  {
    title: 'Jane Doe',
    image: avatar2.src,
    url: 'https://example.com/jane-doe',
    views: 150,
    createdAt: '2023-01-02',
  },
  {
    title: 'Bob Brown',
    image: avatar3.src,
    url: 'https://example.com/bob-brown',
    views: 100,
    createdAt: '2023-01-03',
  },
  {
    title: 'Alice Johnson',
    image: avatar4.src,
    url: 'https://example.com/alice-johnson',
    views: 50,
    createdAt: '2023-01-04',
  },
  {
    title: 'Michael Davis',
    image: avatar5.src,
    url: 'https://example.com/michael-davis',
    views: 20,
    createdAt: '2023-01-05',
  },
];
const BioPagesView = ({ trans }: BiooPageViewProps) => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='text-2xl font-medium text-default-800'>
          Analytics {trans?.dashboard}
        </div>
        <AddBioDialog />
      </div>
      <div className='w-full'>
        <BioSummary totalPages={12} totalViews={200} />
      </div>
      <div className='grid grid-cols-12 gap-6'>
        {biopage.map((item, index) => (
          <div className='col-span-12 lg:col-span-4'>
            <BioCard key={index} bio={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BioPagesView;
