'use client';

export default function PlansSection() {
  return (
    <div>
      <h2 className='mb-6 text-2xl font-bold'>PLANS FOR EVERYONE</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <div className='rounded border border-gray-700 p-5'>
          <h3 className='mb-2 text-lg font-semibold'>STARTER</h3>
          <p className='mb-4 text-sm text-gray-400'>
            Basic tools and community features for everyone
          </p>
          <button className='w-full rounded border border-white bg-transparent py-2 text-sm font-medium text-white hover:bg-white/10'>
            FREE TO JOIN
          </button>
        </div>
        <div className='rounded border border-gray-700 bg-gradient-to-b from-blue-800/30 to-transparent p-5'>
          <h3 className='mb-2 text-lg font-semibold'>PRO</h3>
          <p className='mb-4 text-sm text-gray-400'>
            Advanced editing tools and analytics for creators
          </p>
          <button className='w-full rounded border border-white bg-transparent py-2 text-sm font-medium text-white hover:bg-white/10'>
            TRY FOR FREE
          </button>
        </div>
        <div className='rounded border border-gray-700 bg-gradient-to-b from-yellow-600/30 to-transparent p-5'>
          <h3 className='mb-2 text-lg font-semibold'>PRO+</h3>
          <p className='mb-4 text-sm text-gray-400'>
            Everything in PRO plus exclusive features
          </p>
          <button className='w-full rounded border border-white bg-transparent py-2 text-sm font-medium text-white hover:bg-white/10'>
            TRY FOR FREE
          </button>
        </div>
      </div>
    </div>
  );
}
