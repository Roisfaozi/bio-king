import { credentialsConfig } from '@/config/credentials.config';
import axios from 'axios';

const baseURL = credentialsConfig.siteUrl + '/api';
export const api = axios.create({
  baseURL,
});
