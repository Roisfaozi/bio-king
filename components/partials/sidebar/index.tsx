'use client';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSidebar, useThemeStore } from '@/store';
import ClassicSidebar from './classic';
import MobileSidebar from './mobile-sidebar';

const Sidebar = ({ trans }: { trans: string }) => {
  const { sidebarType, collapsed } = useSidebar();
  const { layout } = useThemeStore();

  const isDesktop = useMediaQuery('(min-width: 1280px)');

  let selectedSidebar = null;

  if (!isDesktop && (sidebarType === 'popover' || sidebarType === 'classic')) {
    selectedSidebar = <MobileSidebar trans={trans} />;
  } else {
    const sidebarComponents: { [key: string]: JSX.Element } = {
      classic: <ClassicSidebar trans={trans} />,
    };

    selectedSidebar = sidebarComponents[sidebarType] || (
      <ClassicSidebar trans={trans} />
    );
  }

  return <div>{selectedSidebar}</div>;
};

export default Sidebar;
