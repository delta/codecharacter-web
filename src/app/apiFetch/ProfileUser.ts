/* tslint:disable:no-console*/
import { jsonResponseWrapper } from 'app/apiFetch/utils';
import { API_BASE_URL } from '../../config/config';

export const getMatchStats = (username: string) => {
  const URL = `${API_BASE_URL}user/match-stats/${encodeURIComponent(username)}`;
  return fetch(URL, {
    credentials: 'include',
    method: 'GET',
  })
    .then((response) => {
      console.log('fetch match response');
      console.log(response);
      return jsonResponseWrapper(response);
    })
    .then((data) => {
      console.log('fetch match data');
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getUserProfile = (username: string) => {
  const URL = `${API_BASE_URL}user/${username}`;
  return fetch(URL, {
    credentials: 'include',
    method: 'GET',
  })
    .then((response) => {
      console.log('fetch profile response');
      console.log(response);
      return jsonResponseWrapper(response);
    })
    .then((data) => {
      console.log('fetch profile data');
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
