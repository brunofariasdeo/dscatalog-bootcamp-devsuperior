import { CLIENT_ID, CLIENT_SECRET } from './auth';
import qs from 'qs';
import axios, { Method } from 'axios';

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

export const makeRequest = ({ method = 'GET', url, data, params, headers }:RequestParams) => {
  return axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    params, 
    headers
  });
}

export const makeLogin = (loginData: LoginData) => {
  const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

  const headers = {
    Authorization: `Basic ${window.btoa(token)}`,
    'Content-Type': 'application/x-www-form-urlencoded' 
  }

  const payload = qs.stringify({ ...loginData, grant_type: 'password' });

  return makeRequest({ url: '/oauth/token', data: payload, method: 'POST', headers } )
}