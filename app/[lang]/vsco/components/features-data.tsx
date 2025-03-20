'use client';

import React from 'react';

export interface FeatureItem {
  title: string;
  image: string;
  badge?: {
    text: string;
    color: string;
  };
  overlay?: React.ReactNode;
}

export const featuresData: FeatureItem[] = [
  {
    title: 'PHOTO EDITOR',
    image:
      'https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/66b4f1a4c54f5c978a9339ce_PHOTO%20EDITOR.jpg',
  },
  {
    title: 'VSCO CANVAS',
    image:
      'https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/67c19b7fbddd0f94e2e6543e_canvas-small%402x.avif',
  },
  {
    title: 'VSCO SITES',
    image:
      'https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/673f3814c866d4c504d6b3fb_home-sites.jpg',
  },
  {
    title: 'PHOTO PRESETS',
    image:
      'https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/66b4f1a4ed4c201ae9a263da_PHOTO%20PRESETS.jpg',
    badge: {
      text: 'C1 PRO',
      color: 'orange-600',
    },
  },
  {
    title: 'BLOGS',
    image:
      'https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/671a79851127d16e5bc1e7b9_blog-icon%402x.jpg',
  },
  {
    title: 'CLIENT GALLERIES',
    image:
      'https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/66b4f1a4957642678d09a754_CLIENT%20GALLERIES.jpg',
  },
  {
    title: 'VIDEO EDITOR',
    image:
      'https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/66b4f1a4957642678d09a773_VIDEO%20EDITOR.jpg',
  },
  {
    title: 'FILM FX',
    image:
      'https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/66b4f1a41b857a42649c8aca_FILM%20FX.jpg',
  },
  {
    title: 'A.I. REMOVE',
    image:
      'https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/66b4f1a480e0923383ce4a3c_A.I.%20REMOVE.jpg',
  },
  {
    title: 'PHOTOGRAPHY JOBS',
    image:
      'https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/66b4f1a49f1b81107aa35625_PHOTOGRAPHY%20JOBS.jpg',
  },
  {
    title: 'ALL FEATURES',
    image:
      'https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/66b4f1a4641638b622f65569_ALL%20FEATURES.jpg',
  },
];
