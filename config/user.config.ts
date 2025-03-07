import { api } from '@/config/axios.config';

type UserRegisterInput = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(userData: UserRegisterInput) {
  try {
    const response = await api.post('/user/register', userData);

    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response;
  }
}
