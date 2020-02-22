/* tslint:disable:no-console*/
import * as UserInterfaces from 'app/types/User';
import { API_BASE_URL } from '../../config/config';

export const userLogin = (body: UserInterfaces.Login) => {
  const formBody = [];

  let key = encodeURIComponent('email');
  let value = encodeURIComponent(body.username);
  formBody.push(`${key}=${value}`);

  key = encodeURIComponent('password');
  value = encodeURIComponent(body.password);
  formBody.push(`${key}=${value}`);

  const str = formBody.join('&');

  return fetch(`${API_BASE_URL}login`, {
    body: str,
    //  credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    method: 'POST',
  })
    .then((response) => {
      console.log('response');
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log('data');
      console.log(data);
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
  return fetch(`${API_BASE_URL}user`, {
    body: JSON.stringify(body),
    // credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => {
      console.log('response');
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log('data');
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('error');
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
