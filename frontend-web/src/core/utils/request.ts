import { CLIENT_ID, CLIENT_SECRET, getSessionData } from './auth';
import qs from 'qs';
import axios, { Method } from 'axios';
import history from './history';

type RequestParams = {
  data?: object | string;
  headers?: object;
  method?: Method;
  params?: object;
  url: string;
}

type LoginData = {
  password: string;
  username: string;
}

const BASE_URL = 'http://localhost:8080';

axios.interceptors.response.use(function (response) {
  return response;
}, function (error){
  if (error.response.status === 401){
    history.push('/admin/auth/login');
  }

  return Promise.reject(error);
});


export const makeRequest = ({ data, headers, method = 'GET', params, url }: RequestParams) => {
  return axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    params, 
    headers
  });
};

export const makePrivateRequest = ({ data, method = 'GET', params, url}: RequestParams) => {
  const sessionData = getSessionData();
  
  const headers = {
    'Authorization': `Bearer ${sessionData.access_token}`
  }

  return makeRequest({ data, headers, method, params, url });
};

export const makeLogin = (loginData: LoginData) => {
  const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

  const headers = {
    Authorization: `Basic ${window.btoa(token)}`,
    'Content-Type': 'application/x-www-form-urlencoded' 
  }

  const payload = qs.stringify({ ...loginData, grant_type: 'password' });

  return makeRequest({ url: '/oauth/token', data: payload, method: 'POST', headers } )
}