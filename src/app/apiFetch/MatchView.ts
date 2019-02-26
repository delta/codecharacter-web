/* tslint:disable:no-console*/
import { API_BASE_URL } from '../../config/config';

export const getMatches = () => {
  return fetch(`${API_BASE_URL}match/all`, {
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

export const getTopMatches = () => {
  return fetch(`${API_BASE_URL}match/pro`, {
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

export const getGameLogs = (gameId: number) => {
  return fetch(`${API_BASE_URL}match/log/${gameId}`, {
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
