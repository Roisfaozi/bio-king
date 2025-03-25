import React from 'react';
import { Eye, Facebook } from 'lucide-react';

export function getSourceColor(source: string): string {
  switch (source.toLowerCase()) {
    case 'tinder':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'vsco':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'pinterest':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

export function getSourceIcon(source: string): JSX.Element {
  switch (source.toLowerCase()) {
    case 'tinder':
      return <Eye className='h-4 w-4 text-red-600' />;
    case 'vsco':
      return <Facebook className='h-4 w-4 text-purple-600' />;
    case 'pinterest':
      return <Facebook className='h-4 w-4 text-yellow-600' />;
    default:
      return <Facebook className='h-4 w-4 text-gray-600' />;
  }
}
