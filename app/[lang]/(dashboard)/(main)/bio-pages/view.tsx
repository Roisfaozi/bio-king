import AddBioDialog from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/add-bio-dialog';
import BioSummary from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/bio-summary';
import ReportsSnapshot from '@/app/[lang]/(dashboard)/(main)/dashboard/components/reports-snapshot';
import UsersStat from '@/components/landing-page/color-schemas/users-stat';
interface BiooPageViewProps {
  trans: {
    [key: string]: string;
  };
}
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
        <div className='col-span-12 lg:col-span-4'>
          <ReportsSnapshot />
        </div>
        <div className='col-span-12 lg:col-span-4'>
          <UsersStat />
        </div>
      </div>
    </div>
  );
};

export default BioPagesView;
