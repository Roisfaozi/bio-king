'use server';

import { type User } from '@/app/api/user/data';
import { registerUser, registerAdmin } from '@/config/user.config';

export const addUser = async (data: User) => {
  const response = await registerUser(data);
  return response;
};

// Tipe data untuk pendaftaran admin
type AdminData = {
  name: string;
  email: string;
  password: string;
  token?: string;
};

// Server action untuk pendaftaran admin
export const addAdmin = async (data: AdminData) => {
  const response = await registerAdmin(data);
  return response;
};
