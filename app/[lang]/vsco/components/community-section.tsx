'use client';

export default function CommunitySection() {
  return (
    <section className='border-t border-gray-800 px-4 py-16 md:px-8'>
      <div className='mx-auto max-w-screen-xl'>
        <h2 className='mb-8 text-2xl font-bold'>FROM THE COMMUNITY</h2>
        <div className='grid grid-cols-2 gap-1 md:grid-cols-4'>
          <div className='aspect-square bg-gray-800 transition-opacity hover:opacity-80'></div>
          <div className='aspect-square bg-gray-800 transition-opacity hover:opacity-80'></div>
          <div className='aspect-square bg-gray-800 transition-opacity hover:opacity-80'></div>
          <div className='aspect-square bg-gray-800 transition-opacity hover:opacity-80'></div>
        </div>
        <div className='mt-8 flex justify-center'>
          <button className='mr-4 rounded border border-white bg-transparent px-6 py-2 text-sm font-medium text-white hover:bg-white/10'>
            DISCOVER MORE
          </button>
          <button className='rounded bg-transparent px-6 py-2 text-sm font-medium text-white hover:underline'>
            JOIN VS COMMUNITY
          </button>
        </div>
      </div>
    </section>
  );
}
