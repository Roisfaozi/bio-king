import { api } from '@/config/axios.config';
import { credentialsConfig } from '@/config/credentials.config';

type UserRegisterInput = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(userData: UserRegisterInput) {
  const baseURL = credentialsConfig.siteUrl + '/api';
  console.log('baseURL', baseURL);
  try {
    const response = await api.post('/user/register', userData);
    if (response.data) {
      return response.data;
    }

    return response;
  } catch (error: any) {
    console.error('ini regist', error);
    return error.response;
  }
}
