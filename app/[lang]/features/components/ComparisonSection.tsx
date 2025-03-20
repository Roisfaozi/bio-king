import { PatternBackground } from '@/components/landing-page/partials/pattern-background';
import { CheckCircle, Crown } from 'lucide-react';

export default function ComparisonSection() {
  const comparisonRows = [
    {
      feature: 'Custom themes',
      bioking: true,
      compA: true,
      compB: false,
    },
    {
      feature: 'Advanced analytics',
      bioking: true,
      compA: false,
      compB: true,
    },
    {
      feature: 'Content blocks',
      bioking: true,
      compA: false,
      compB: false,
    },
    {
      feature: 'E-commerce integration',
      bioking: true,
      compA: true,
      compB: false,
    },
    {
      feature: 'Verified badge',
      bioking: true,
      compA: false,
      compB: true,
    },
    {
      feature: 'Custom domains',
      bioking: true,
      compA: true,
      compB: false,
    },
    {
      feature: 'Monetization tools',
      bioking: true,
      compA: false,
      compB: false,
    },
  ];

  return (
    <section className='bg-grid-pattern-purple relative w-full py-12 md:py-24 lg:py-32'>
      <PatternBackground variant='grid' color='purple' intensity='medium' />
      <div className='bg-grid-pattern pointer-events-none absolute inset-0 opacity-[0.03]'></div>
      <div className='container px-4 md:px-6'>
        <div className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
            <span>Why Choose Bio King</span>
          </div>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
            How we compare
          </h2>
          <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
            See how Bio King stacks up against other bio link tools in the
            market.
          </p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full border-collapse rounded-lg border bg-background'>
            <thead>
              <tr className='border-b'>
                <th className='p-4 text-left font-medium'>Features</th>
                <th className='p-4 text-center font-medium'>
                  <div className='flex flex-col items-center'>
                    <div className='size-8 mb-2 flex items-center justify-center rounded-full bg-gradient-primary'>
                      <Crown className='h-5 w-5 text-white' />
                    </div>
                    <span>Bio King</span>
                  </div>
                </th>
                <th className='p-4 text-center font-medium'>Competitor A</th>
                <th className='p-4 text-center font-medium'>Competitor B</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className={i !== 6 ? 'border-b' : ''}>
                  <td className='p-4 font-medium'>{row.feature}</td>
                  <td className='p-4 text-center'>
                    {row.bioking ? (
                      <CheckCircle className='mx-auto h-5 w-5 text-primary' />
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                  <td className='p-4 text-center'>
                    {row.compA ? (
                      <CheckCircle className='mx-auto h-5 w-5 text-muted-foreground' />
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                  <td className='p-4 text-center'>
                    {row.compB ? (
                      <CheckCircle className='mx-auto h-5 w-5 text-muted-foreground' />
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
