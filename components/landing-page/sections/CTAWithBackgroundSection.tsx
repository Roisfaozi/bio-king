'use client';

import { CTASection } from '../partials/cta-section';
import { FloatingElementsBackground } from '../partials/floating-elements-background';

const CTAWithBackgroundSection = () => {
  return (
    <section className='relative'>
      <FloatingElementsBackground variant='rainbow' intensity='medium' />
      <div className='relative z-10'>
        <CTASection
          title='Ready to rule your online presence?'
          highlightedWord='rule'
          description='Join thousands of creators and businesses who trust Bio King for their link management needs. Get started for free today.'
          primaryButtonText='Create Your Bio Link'
          primaryButtonLink='/auth/signup'
          secondaryButtonText='Contact Sales'
          secondaryButtonLink='#'
          showEmailForm={true}
          emailPlaceholder='Enter your email'
          emailButtonText='Sign Up Free'
        />
      </div>
    </section>
  );
};

export default CTAWithBackgroundSection;
