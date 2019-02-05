import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import { API_BASE_URL } from '../../config/config';

export const getLeaderboard = (body: LeaderboardInterfaces.GetLeaderboard) => {
  return fetch(`${API_BASE_URL}leaderboard/${body.pattern}/${body.start}/${body.end}`, {
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
      throw error;
    });
};
