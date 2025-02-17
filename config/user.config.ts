import { api } from '@/config/axios.config';
import { UserRegisterInput } from '@/models/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function registerUser(userData: UserRegisterInput) {
  try {
    const response = await api.post('/user/register', userData);

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}
