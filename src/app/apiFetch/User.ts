/* tslint:disable:no-console*/
import { HeadReqType, headResponseWrapper, jsonResponseWrapper } from 'app/apiFetch/utils';
import * as UserInterfaces from 'app/types/User';
import { API_BASE_URL } from '../../config/config';

export const activateUser = (body: UserInterfaces.ActivateUser) => {
  return fetch(`${API_BASE_URL}user/activate`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => {
      return headResponseWrapper(response, HeadReqType.USERNAME);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const userLogin = (body: UserInterfaces.Login) => {
  const formBody: string[] = [];
  Object.keys(body).forEach((key) =>
    // @ts-ignore
    formBody.push(`${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`),
  );
  const encodedString = formBody.join('&');

  return fetch(`${API_BASE_URL}login`, {
    body: encodedString,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    method: 'POST',
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

export const userLogout = () => {
  return fetch(`${API_BASE_URL}logout`, {
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
  return fetch(`${API_BASE_URL}user/`, {
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => {
      return headResponseWrapper(response, HeadReqType.USERNAME);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const userEditProfile = (body: UserInterfaces.EditUserDetails) => {
  return fetch(`${API_BASE_URL}user`, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  })
    .then((response) => {
      return headResponseWrapper(response, HeadReqType.PROFILE);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const userEditPassword = (body: UserInterfaces.EditUserPassword) => {
  const requestPayLoad = {
    newPassword: body.password,
    oldPassword: body.oldPassword,
  };
  return fetch(`${API_BASE_URL}user/password`, {
    body: JSON.stringify(requestPayLoad),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  })
    .then((response) => {
      return headResponseWrapper(response, HeadReqType.PASSWORD);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const userGetDetails = () => {
  return fetch(`${API_BASE_URL}user`, {
    credentials: 'include',
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

export const checkEmailExists = (email: string) => {
  const URL = `${API_BASE_URL}user/email/${encodeURIComponent(email)}`;
  return fetch(URL, {
    method: 'HEAD',
  })
    .then((response) => {
      return headResponseWrapper(response, HeadReqType.EMAIL);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const checkUsernameExists = (username: string) => {
  const URL = `${API_BASE_URL}user/username/${encodeURIComponent(username)}`;
  return fetch(URL, {
    method: 'HEAD',
  })
    .then((response) => {
      return headResponseWrapper(response, HeadReqType.USERNAME);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
