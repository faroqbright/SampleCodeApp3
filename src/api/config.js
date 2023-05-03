import axios from 'axios';

import { store } from '../redux'

// const ROOT_URL = 'https://dev.jobtrial.co.uk'; // staging server
// const ROOT_URL = 'https://services.jobtrial.co.uk'; // live server
// const ROOT_URL = 'http://35.242.156.129'; // new server
const ROOT_URL = 'https://dev-jobtrial.aureusventures.co.uk'; // base url

const BASE_URL = `${ROOT_URL}/api`;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    const { authenticationToken } = store.getState().userSession;
    if (authenticationToken) {
      requestConfig.headers = {
        'Authorization': `Bearer ${authenticationToken}`,
      };
    }
    return requestConfig;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export {
  ROOT_URL,
  BASE_URL,
  client,
};
