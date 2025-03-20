import axios from 'axios';
import { credentialsConfig } from '@/config/credentials.config';

const baseURL = credentialsConfig.siteUrl + '/api';

export const api = axios.create({
  baseURL,
});
