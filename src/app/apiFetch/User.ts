import { UserActions } from 'app/actions/User';
import { BodyInterfaces } from 'app/sagas/User';
import { API_BASE_URL } from '../../config/config';

export const userLogin = (body: BodyInterfaces.Login) => {
  return fetch(`${API_BASE_URL}user/login`, {
    body: JSON.stringify(body),
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

export const userRegister = (body: UserActions.RegisterDetails) => {
  return fetch(`${API_BASE_URL}user/register`, {
    body: JSON.stringify(body),
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

export const checkUsernameExists = (username: string) => {
  return fetch(`${API_BASE_URL}user/checkusername/${username}`, {
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
