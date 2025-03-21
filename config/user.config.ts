import { api } from '@/config/axios.config';

type UserRegisterInput = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(userData: UserRegisterInput) {
  try {
    const response = await api.post('/user/register', userData);
    if (response.data) {
      return response.data;
    }

    return response;
  } catch (error: any) {
    console.error('ini regist', error.response);
    return error.response;
  }
}
