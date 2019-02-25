import { API_BASE_URL } from '../../config/config';

export const getUnreadNotifications = () => {
  return fetch(`${API_BASE_URL}notifications/global/`, {
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

export const deleteGlobalNotifications = (notificationId: number) => {
  return fetch(`${API_BASE_URL}notifications/global/${notificationId}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
};

export const getAllGlobalNotifications = () => {
  return fetch(`${API_BASE_URL}notifications/global/all`, {
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
