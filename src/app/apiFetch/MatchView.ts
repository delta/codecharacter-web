/* tslint:disable:no-console*/
import { API_BASE_URL } from '../../config/config';

export const getMatches = (pageNo: number, pageSize: number) => {
  return fetch(`${API_BASE_URL}user/match/${pageNo}/${pageSize}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((response) => {
      console.log('match response');
      console.log(response);

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
      console.log('top response');
      console.log(response);

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
  // TODO update url
  return fetch(`${API_BASE_URL}game/match/log/${gameId}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};
