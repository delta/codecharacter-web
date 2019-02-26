/* tslint:disable:no-console*/
import * as SimulationInterfaces from 'app/types/Leaderboard';
import { API_BASE_URL } from '../../config/config';

export const runMatch = (body: SimulationInterfaces.RunMatch) => {
  return fetch(`${API_BASE_URL}simulate/match`, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      Accept: 'applicaton/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
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
