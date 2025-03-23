import { Metadata } from 'next';
import RegisterAdminForm from './register-admin-form';

export const metadata: Metadata = {
  title: 'Register Admin | Bio King',
  description: 'Register as an admin in Bio King platform',
};

export default function RegisterAdminPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Buat Akun Admin
          </h1>
          <p className='text-sm text-muted-foreground'>
            Silakan masukkan informasi untuk membuat akun admin baru
          </p>
        </div>
        <RegisterAdminForm lang={lang} />
      </div>
    </div>
  );
}
