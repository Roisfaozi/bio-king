'use client';
import LayoutLoader from '@/components/layout-loader';
import { useMounted } from '@/hooks/use-mounted';
import AboutDashtail from './about-dashtail';
import AboutUs from './about-us';
import AllComponents from './all-components';
import ColorSchemas from './color-schemas';
import Contact from './contact';
import CustomProject from './custom-project';
import Faq from './faq';
import FigmaKit from './figma-kit';
import Footer from './footer';
import Header from './header';
import Hero from './hero';
import PricingPlan from './pricing-plan';
import ProjectTools from './project-tools';
import ShowCase from './showcase';
const LandingPageView = () => {
  const mounted = useMounted();
  if (!mounted) {
    return <LayoutLoader />;
  }
  return (
    <div className='bg-background'>
      <Header />
      <Hero />
      {/* <Stats /> */}
      <AllComponents />
      <ShowCase />
      <ColorSchemas />
      <ProjectTools />
      <FigmaKit />
      <AboutUs />
      <AboutDashtail />
      <Faq />
      <PricingPlan />
      <CustomProject />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPageView;
