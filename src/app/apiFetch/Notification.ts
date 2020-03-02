import { jsonResponseWrapper, setRequestHeaders } from 'app/apiFetch/utils';
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
      /* tslint:disable-next-line:no-console */
      console.log(error);
    });
};

export const deleteGlobalNotifications = (notificationId: number) => {
  return fetch(`${API_BASE_URL}notifications/${notificationId}/`, {
    credentials: 'include',
    headers: setRequestHeaders(),
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
};

export const getAllGlobalNotifications = () => {
  return fetch(`${API_BASE_URL}notifications`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((response) => jsonResponseWrapper(response))
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
};

export const getAllGlobalAnnouncements = () => {
  return fetch(`${API_BASE_URL}announcements/`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((response) => jsonResponseWrapper(response))
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
};
