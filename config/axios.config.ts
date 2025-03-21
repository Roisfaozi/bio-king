import { credentialsConfig } from '@/config/credentials.config';
import axios from 'axios';

const baseURL = credentialsConfig.siteUrl + '/api';
console.log('baseURL', baseURL);
export const api = axios.create({
  baseURL,
});
