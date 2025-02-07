import { Cart, ClipBoard, DashBoard, Graph, Grid } from '@/components/svg';

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const menusConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      icon: DashBoard,
      child: [
        {
          title: 'Analytics',
          href: '/dashboard',
          icon: Graph,
        },
        {
          title: 'Ecommerce',
          href: '/ecommerce',
          icon: Cart,
        },
        {
          title: 'project ',
          href: '/project',
          icon: ClipBoard,
        },
      ],
    },
  ],
  sidebarNav: {
    classic: [
      {
        isHeader: true,
        title: 'menu',
      },

      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Grid,
      },
      {
        title: 'Bio Pages ',
        href: '/bio-pages',
        icon: ClipBoard,
      },
      {
        title: 'Analytics',
        href: '/analytics',
        icon: Graph,
      },
    ],
  },
};

export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
