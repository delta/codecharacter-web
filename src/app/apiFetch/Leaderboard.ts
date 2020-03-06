/* tslint:disable:no-console*/
import { jsonResponseWrapper } from 'app/apiFetch/utils';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import { API_BASE_URL } from '../../config/config';

export const getLeaderboard = (body: LeaderboardInterfaces.GetLeaderboard) => {
  return fetch(`${API_BASE_URL}leaderboard/${body.pageNo}/${body.pageSize}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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

export const getLeaderboardByDiv = (body: LeaderboardInterfaces.GetLeaderboardByDiv) => {
  return fetch(`${API_BASE_URL}leaderboard/division/${body.div}/${body.pageNo}/${body.pageSize}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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

export const getLeaderboardByUserType = (body: LeaderboardInterfaces.GetLeaderboardByUserType) => {
  return fetch(
    `${API_BASE_URL}leaderboard/userType/${body.UserType}/${body.pageNo}/${body.pageSize}`,
    {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  )
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

export const getLeaderboardByDivAndType = (
  body: LeaderboardInterfaces.GetLeaderboardByDivAndType,
) => {
  return fetch(
    `${API_BASE_URL}leaderboard/userType/${body.UserType}/division/${body.div}/${body.pageNo}/${body.pageSize}`,
    {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  )
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

export const getLeaderboardByUsername = (body: LeaderboardInterfaces.Search) => {
  return fetch(`${API_BASE_URL}leaderboard/${body.username}/${body.pageNo}/${body.pageSize}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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

export const getTimer = () => {
  return fetch(`${API_BASE_URL}user/wait-time`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((response) => response.text())
    .then((data) => data)
    .catch((err) => {
      console.error(err);
    });
};
