import Workload from './workload';
import ThemeChange from './theme-change';
import UsersStat from './users-stat';

const ColorSchemas = () => {
  return (
    <section className='py-16 2xl:py-[120px]' id='themes'>
      <div className='container'>
        <div className='mx-auto max-w-[670px]'>
          <h2 className='mb-3 text-center text-xl font-semibold text-default-900 xl:text-3xl xl:leading-[46px]'>
            Color <span className='text-primary'>Schemes</span>
          </h2>
          <p className='text-center text-base text-default-700 xl:leading-7'>
            Define your digital environment: navigate through our comprehensive
            selection of customizable color schemes, perfect for matching any
            brand identity.
          </p>
        </div>
        <div className='mt-14'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            <div className='rounded-xl border-l border-t border-default-300 bg-default-100 pl-3 pt-3'>
              <Workload />
            </div>
            <div className='rounded-xl border border-default-300 bg-default-100 p-6'>
              <div className='mx-auto max-w-[286px]'>
                <p className='text-center text-lg font-semibold text-default-600 xl:text-xl'>
                  Express Your Own Style With Use One Click
                </p>
              </div>
              <ThemeChange />
            </div>
            <div className='rounded-xl border-l border-t border-default-300 bg-default-100 pl-3 pt-3'>
              <UsersStat />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorSchemas;
