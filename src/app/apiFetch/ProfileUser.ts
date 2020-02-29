/* tslint:disable:no-console*/
import { jsonResponseWrapper } from 'app/apiFetch/utils';
import { API_BASE_URL } from '../../config/config';

export const getMatchStats = (username: string) => {
  const URL = `${API_BASE_URL}/match-stats/${encodeURIComponent(username)}`;
  return fetch(URL, {
    credentials: 'include',
    method: 'GET',
  })
    .then((response) => {
      return jsonResponseWrapper(response);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
