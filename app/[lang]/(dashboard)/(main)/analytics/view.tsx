import Analitycs from '@/app/[lang]/(dashboard)/(main)/analytics/components/analitycs';
import Maps from '@/app/[lang]/(dashboard)/(main)/analytics/components/maps';
interface BiooPageViewProps {
  trans: {
    [key: string]: string;
  };
}

const AnalitycsPageView = ({ trans }: BiooPageViewProps) => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='text-2xl font-medium text-default-800'>
          Analytics {trans?.dashboard}
        </div>
      </div>
      <div className='w-full'></div>
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-12 space-y-6'>
          <Analitycs />
        </div>

        <div className='col-span-12 space-y-6'>
          <Analitycs />
        </div>
        <div className='col-span-12 space-y-6'>
          <Maps />
        </div>
      </div>
    </div>
  );
};

export default AnalitycsPageView;
