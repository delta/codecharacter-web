/* tslint:disable:no-console*/
import * as UserInterfaces from 'app/types/User';
import { API_BASE_URL } from '../../config/config';

export const userLogin = (body: UserInterfaces.Login) => {
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
      console.error(error);
    });
};

export const userLogout = () => {
  return fetch(`${API_BASE_URL}user/logout`, {
    credentials: 'include',
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

export const userRegister = (body: UserInterfaces.Register) => {
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
      console.error(error);
    });
};

export const userEditProfile = (body: UserInterfaces.EditUserDetails) => {
  return fetch(`${API_BASE_URL}user/profile/update`, {
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
      console.error(error);
    });
};

export const userEditPassword = (body: UserInterfaces.EditUserPassword) => {
  return fetch(`${API_BASE_URL}user/profile/updatePassword`, {
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
      console.error(error);
    });
};

export const userGetDetails = () => {
  return fetch(`${API_BASE_URL}user/profile`, {
    credentials: 'include',
    method: 'GET',
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
      console.error(error);
    });
};
