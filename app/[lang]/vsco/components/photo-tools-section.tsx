'use client';

export default function PhotoToolsSection() {
  return (
    <div>
      <h2 className='mb-6 text-2xl font-bold'>PHOTO TOOLS</h2>
      <div className='mb-4 flex space-x-4'>
        <div className='aspect-square w-1/4 rounded bg-gradient-to-br from-red-500 to-pink-500'></div>
        <div className='aspect-square w-1/4 rounded bg-gradient-to-br from-yellow-500 to-orange-500'></div>
        <div className='aspect-square w-1/4 rounded bg-gradient-to-br from-blue-500 to-purple-500'></div>
        <div className='aspect-square w-1/4 rounded bg-gradient-to-br from-green-500 to-teal-500'></div>
      </div>
      <p className='mb-4 text-gray-400'>
        Create with premium presets and advanced editing tools designed for
        photographers at all levels.
      </p>
      <button className='text-sm font-medium text-white hover:underline'>
        EXPLORE PHOTO TOOLS →
      </button>
    </div>
  );
}
