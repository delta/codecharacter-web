/* tslint:disable:no-console*/
import {
  HeadReqType,
  headResponseWrapper,
  jsonResponseWrapper,
  setRequestHeaders,
} from 'app/apiFetch/utils';
import { NotificationType } from 'app/types/Notification';
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
    .then((response) => jsonResponseWrapper(response))
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};

export const deleteGlobalNotifications = (notificationId: number) => {
  return fetch(`${API_BASE_URL}notifications/${notificationId}/`, {
    credentials: 'include',
    headers: setRequestHeaders(),
    method: 'DELETE',
  })
    .then((response) => headResponseWrapper(response, HeadReqType.OTHERS))
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};

export const deleteGlobalNotificationsByType = (type: NotificationType) => {
  return fetch(`${API_BASE_URL}notifications/type/${type}/`, {
    credentials: 'include',
    headers: setRequestHeaders(),
    method: 'DELETE',
  })
    .then((response) => headResponseWrapper(response, HeadReqType.OTHERS))
    .then((data) => data)
    .catch((error) => {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
    });
};
