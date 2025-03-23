import React from 'react';
import { getAuthSession } from '@/lib/auth';
import { isAdmin } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { UsersManagement } from './components/users-management';

export const dynamic = 'force-dynamic';

export default async function UsersPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(`/${lang}/auth/login`);
  }

  // Hanya admin yang bisa mengakses halaman ini
  const userIsAdmin = isAdmin(session);
  if (!userIsAdmin) {
    redirect(`/${lang}/dashboard`);
  }

  return (
    <div className='mx-auto w-full max-w-7xl space-y-6 px-6 py-10'>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-bold'>Manajemen Pengguna</h1>
        <p className='mt-1 text-muted-foreground'>
          Kelola pengguna dan hak akses pada sistem
        </p>
      </div>

      <UsersManagement />
    </div>
  );
}
