import { Configuration } from '../api';
import { getToken } from './AuthUtils';

export const getConfiguration = (): Configuration => {
  return {
    basePath: 'http://localhost:3000',
    apiKey: getToken(),
  };
};
