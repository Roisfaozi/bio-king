import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

const Faq = () => {
  return (
    <section className='bg-default-100 py-16 2xl:py-[120px]'>
      <div className='container'>
        <div className='mx-auto mb-14 max-w-[670px]'>
          <h2 className='mb-3 text-center text-xl font-semibold text-default-900 xl:text-3xl xl:leading-[46px]'>
            <span className='text-primary'>FAQs</span>
          </h2>
          <p className='text-center text-base text-default-700 xl:leading-7'>
            <strong> Got Questions?</strong> We've compiled a list of answers to
            your frequently asked questions. If you can't find what you're
            looking for here, don't hesitate to reach out to us.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2'>
          <div>
            <Accordion type='single' collapsible className='space-y-6'>
              <AccordionItem value='item-1' className='bg-background'>
                <AccordionTrigger className='text-left text-base font-medium text-default-900 xl:text-lg'>
                  What is a Regular License?
                </AccordionTrigger>
                <AccordionContent className='text-sm text-default-700 xl:text-base'>
                  A{' '}
                  <Link
                    href='https://themeforest.net/licenses/terms/regular'
                    target='_blank'
                    className='text-primary'
                  >
                    Regular License
                  </Link>{' '}
                  is designed for a single end-product that is free for
                  end-users. This license is suitable for both personal and
                  client projects. Note that each end-product or domain requires
                  its own Regular License.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2' className='bg-background'>
                <AccordionTrigger className='text-left text-base font-medium text-default-900 xl:text-lg'>
                  Can you explain the Extended License?
                </AccordionTrigger>
                <AccordionContent className='text-sm text-default-700 xl:text-base'>
                  An{' '}
                  <Link
                    href='https://themeforest.net/licenses/terms/extended'
                    target='_blank'
                    className='text-primary'
                  >
                    Extended License
                  </Link>
                  is needed for a single end-product that involves charging
                  end-users, such as with a subscription model or in a
                  marketplace. This applies to both your own projects and those
                  developed for clients. Each end-product or domain usage
                  demands a separate Extended License.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3' className='bg-background'>
                <AccordionTrigger className='text-left text-base font-medium text-default-900 xl:text-lg'>
                  Which license should I use for a SaaS application?
                </AccordionTrigger>
                <AccordionContent className='text-sm text-default-700 xl:text-base'>
                  If your SaaS application charges users, you'll need an
                  Extended License for each end product. Otherwise, a Regular
                  License is adequate. You can learn more from{' '}
                  <Link
                    href='https://themeforest.net/licenses/faq#faq-section-regular-and-extended-licenses'
                    target='_blank'
                    className='text-primary'
                  >
                    Envato
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4' className='bg-background'>
                <AccordionTrigger className='text-left text-base font-medium text-default-900 xl:text-lg'>
                  Do you provide design frames and GitHub access?
                </AccordionTrigger>
                <AccordionContent className='text-sm text-default-700 xl:text-base'>
                  DashTail itself doesn’t include Figma design files
                  automatically, but we're happy to provide them for free upon
                  request. This allows for flexible customization within Figma.
                  If you need GitHub access then you can ask our{' '}
                  <Link
                    href='https://codeshaperbd.freshdesk.com/support/login'
                    target='_blank'
                    className='text-primary'
                  >
                    support team
                  </Link>
                  . for GitHub access.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-5' className='bg-background'>
                <AccordionTrigger className='text-left text-base font-medium text-default-900 xl:text-lg'>
                  What skills are needed to use DashTail?
                </AccordionTrigger>
                <AccordionContent className='text-sm text-default-700 xl:text-base'>
                  Using DashTail effectively requires a foundational knowledge
                  of front-end development, particularly with Tailwind and React
                  for deeper customization. It's important to remember that
                  DashTail is a front-end template; knowledge of back-end
                  development is also necessary for full project development.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <Accordion type='single' collapsible className='space-y-6'>
              <AccordionItem value='item-1' className='bg-background'>
                <AccordionTrigger className='text-left text-base font-medium text-default-900 xl:text-lg'>
                  How are updates and upgrades handled?
                </AccordionTrigger>
                <AccordionContent className='text-sm text-default-700 xl:text-base'>
                  The latest DashTail version can always be downloaded from
                  ThemeForest without any extra charge. Updates can be easily
                  integrated by referring to our changelog and GitHub
                  repository.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2' className='bg-background'>
                <AccordionTrigger className='text-left text-base font-medium text-default-900 xl:text-lg'>
                  What is your support policy?
                </AccordionTrigger>
                <AccordionContent className='text-sm text-default-700 xl:text-base'>
                  We offer dedicated support through our portal, following
                  Envato's item{' '}
                  <Link
                    href='https://themeforest.net/page/item_support_policy'
                    target='_blank'
                    className='text-primary'
                  >
                    support policy{' '}
                  </Link>{' '}
                  closely to provide timely and efficient help.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3' className='bg-background'>
                <AccordionTrigger className='text-left text-base font-medium text-default-900 xl:text-lg'>
                  Is DashTail worth the investment?
                </AccordionTrigger>
                <AccordionContent className='text-sm text-default-700 xl:text-base'>
                  Absolutely. DashTail is meticulously crafted to streamline the
                  development process, offering a seamless and efficient way to
                  build your web UI. It's a worthwhile investment for any
                  developer looking for quality and efficiency.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4' className='bg-background'>
                <AccordionTrigger className='text-left text-base font-medium text-default-900 xl:text-lg'>
                  How can I get help with DashTail?
                </AccordionTrigger>
                <AccordionContent className='text-sm text-default-700 xl:text-base'>
                  For assistance, head over to our{' '}
                  <Link
                    href='https://codeshaperbd.freshdesk.com/support/login'
                    target='_blank'
                    className='text-primary'
                  >
                    support portal
                  </Link>{' '}
                  , register, and submit a ticket. Our dedicated support team is
                  ready to tackle any issues you might face.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
