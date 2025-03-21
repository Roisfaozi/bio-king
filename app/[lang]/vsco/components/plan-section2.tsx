import PlanCard from '@/app/[lang]/vsco/components/plan-card';
import SectionHeader from '@/app/[lang]/vsco/components/section-header';

export default function PlansSection() {
  const plans = [
    {
      title: 'STARTER',
      description: 'Free basic editing tools and community features.',
      buttonText: 'TRY FOR FREE',
      bgClass: '',
    },
    {
      title: 'PLUS',
      description:
        'All editing tools, advanced features, and exclusive presets.',
      buttonText: 'TRY FOR FREE',
      bgClass: 'bg-blue-900/20',
    },
    {
      title: 'PRO',
      description: 'Professional tools, analytics, and priority support.',
      buttonText: 'TRY FOR FREE',
      bgClass: 'bg-yellow-600/20',
    },
    {
      title: 'VSCO HUB',
      description:
        'Connect with brands and get discovered for paid opportunities.',
      buttonText: 'ABOUT VSCO HUB',
      bgClass: '',
    },
  ];

  return (
    <section className='bg-[#000] px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16'>
      <div className='mx-auto max-w-5xl'>
        <div className='mb-8 flex flex-col gap-4 sm:mb-12 md:flex-row md:gap-8'>
          <div>
            <SectionHeader title='PLANS' subtitle='FOR EVERYONE' />
            <p className='max-w-md text-xs text-muted-foreground sm:text-sm'>
              <span className='font-semibold'>VSCO Membership Makan</span> gives
              every photographer ways to find inspiration, develop a unique
              style, and discover new creative and professional opportunities.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6'>
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              description={plan.description}
              buttonText={plan.buttonText}
              bgClass={plan.bgClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
