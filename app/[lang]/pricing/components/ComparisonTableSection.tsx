'use client';

export default function ComparisonTableSection() {
  return (
    <section className='relative w-full bg-muted/30 py-12 md:py-24 lg:py-32'>
      <div className='bg-dot-pattern pointer-events-none absolute inset-0 opacity-[0.03]'></div>
      <div className='container px-4 md:px-6'>
        <div className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
            Compare features
          </h2>
          <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
            Find the plan that's right for your needs. All plans include core
            features to help you create the perfect bio link page.
          </p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full border-collapse rounded-lg border bg-background'>
            <thead>
              <tr className='border-b'>
                <th className='p-4 text-left font-medium'>Features</th>
                <th className='p-4 text-center font-medium'>Free</th>
                <th className='p-4 text-center font-medium'>Pro</th>
                <th className='p-4 text-center font-medium'>Business</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b'>
                <td className='p-4 font-medium' colSpan={4}>
                  Bio Link Management
                </td>
              </tr>
              {[
                {
                  feature: 'Bio link pages',
                  free: '1',
                  pro: '1',
                  business: 'Multiple',
                },
                {
                  feature: 'Social media links',
                  free: '5',
                  pro: 'Unlimited',
                  business: 'Unlimited',
                },
                {
                  feature: 'Content blocks',
                  free: 'Basic',
                  pro: 'All',
                  business: 'All',
                },
                {
                  feature: 'Custom themes',
                  free: 'Limited',
                  pro: '✓',
                  business: '✓',
                },
                {
                  feature: 'Custom domains',
                  free: '—',
                  pro: '1',
                  business: 'Multiple',
                },
                {
                  feature: 'Bio King branding',
                  free: '✓',
                  pro: 'Removed',
                  business: 'Removed',
                },
              ].map((row, i) => (
                <tr key={i} className='border-b'>
                  <td className='p-4'>{row.feature}</td>
                  <td className='p-4 text-center'>{row.free}</td>
                  <td className='p-4 text-center'>{row.pro}</td>
                  <td className='p-4 text-center'>{row.business}</td>
                </tr>
              ))}

              <tr className='border-b'>
                <td className='p-4 font-medium' colSpan={4}>
                  Analytics
                </td>
              </tr>
              {[
                {
                  feature: 'Click tracking',
                  free: 'Basic',
                  pro: 'Advanced',
                  business: 'Enterprise',
                },
                {
                  feature: 'Geographic data',
                  free: 'Country',
                  pro: 'City',
                  business: 'Detailed',
                },
                {
                  feature: 'Device & browser',
                  free: 'Basic',
                  pro: 'Detailed',
                  business: 'Detailed',
                },
                {
                  feature: 'Referrer tracking',
                  free: '—',
                  pro: '✓',
                  business: '✓',
                },
                {
                  feature: 'Custom reports',
                  free: '—',
                  pro: 'Limited',
                  business: 'Unlimited',
                },
                {
                  feature: 'Data retention',
                  free: '30 days',
                  pro: '1 year',
                  business: 'Unlimited',
                },
              ].map((row, i) => (
                <tr key={i} className='border-b'>
                  <td className='p-4'>{row.feature}</td>
                  <td className='p-4 text-center'>{row.free}</td>
                  <td className='p-4 text-center'>{row.pro}</td>
                  <td className='p-4 text-center'>{row.business}</td>
                </tr>
              ))}

              <tr className='border-b'>
                <td className='p-4 font-medium' colSpan={4}>
                  Monetization & Advanced Features
                </td>
              </tr>
              {[
                {
                  feature: 'Product showcases',
                  free: '—',
                  pro: 'Limited',
                  business: 'Unlimited',
                },
                {
                  feature: 'Donation tools',
                  free: '—',
                  pro: 'Basic',
                  business: 'Advanced',
                },
                {
                  feature: 'Verified badge',
                  free: '—',
                  pro: '—',
                  business: '✓',
                },
                {
                  feature: 'Team access',
                  free: '—',
                  pro: '—',
                  business: '✓',
                },
                {
                  feature: 'Scheduled content',
                  free: '—',
                  pro: '✓',
                  business: '✓',
                },
                {
                  feature: 'Priority support',
                  free: '—',
                  pro: '—',
                  business: '✓',
                },
              ].map((row, i) => (
                <tr key={i} className={i !== 5 ? 'border-b' : ''}>
                  <td className='p-4'>{row.feature}</td>
                  <td className='p-4 text-center'>{row.free}</td>
                  <td className='p-4 text-center'>{row.pro}</td>
                  <td className='p-4 text-center'>{row.business}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
