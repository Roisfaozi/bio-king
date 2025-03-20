'use server';

import { type User } from '@/app/api/user/data';
import { registerUser } from '@/config/user.config';
export const addUser = async (data: User) => {
  const response = await registerUser(data);
  return response;
};
