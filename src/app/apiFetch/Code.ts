import { API_BASE_URL } from '../../config/config';

export const saveCode = (code: string) => {
  return fetch(`${API_BASE_URL}code/save`, {
    body: JSON.stringify({
      code,
    }),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
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
      throw error;
    });
};

export const commitCode = (commitMessage: string) => {
  return fetch(`${API_BASE_URL}code/commit`, {
    body: JSON.stringify({
      commitMessage
    }),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
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
      throw error;
    });
};

export const getLatestCode = () => {
  return fetch(`${API_BASE_URL}code/latest`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
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
      throw error;
    });
};
