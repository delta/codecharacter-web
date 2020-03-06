/* tslint:disable:no-console*/
import { API_BASE_URL } from '../../config/config';
import { jsonResponseWrapper, setRequestHeaders } from './utils';

export const getMatches = (pageNo: number, pageSize: number) => {
  return fetch(`${API_BASE_URL}user/match/${pageNo}/${pageSize}`, {
    credentials: 'include',
    headers: setRequestHeaders(),
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getTopMatches = (pageNo: number, pageSize: number) => {
  return fetch(`${API_BASE_URL}match/top/${pageNo}/${pageSize}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getGameLogs = (gameId: number) => {
  return fetch(`${API_BASE_URL}game/log/${gameId}`, {
    credentials: 'include',
    headers: setRequestHeaders(),
    method: 'GET',
  })
    .then((response) => {
      return jsonResponseWrapper(response);
    })
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};
