/* tslint:disable:no-console*/
import {
  HeadReqType,
  headResponseWrapper,
  jsonResponseWrapper,
  setRequestHeaders,
  textResponseWrapper,
} from 'app/apiFetch/utils';
import { API_BASE_URL } from '../../config/config';

export const saveCode = (code: string) => {
  return fetch(`${API_BASE_URL}code`, {
    body: code,
    credentials: 'include',
    headers: setRequestHeaders(),
    method: 'PUT',
  })
    .then((response) => {
      return headResponseWrapper(response, HeadReqType.OTHERS);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const commitCode = (commitMessage: string) => {
  return fetch(`${API_BASE_URL}code/commit`, {
    body: commitMessage,
    credentials: 'include',
    headers: setRequestHeaders(),
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

export const getLatestCode = () => {
  return fetch(`${API_BASE_URL}code/latest`, {
    credentials: 'include',
    headers: setRequestHeaders(),
    method: 'GET',
  })
    .then((response) => {
      return textResponseWrapper(response);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getCommitLog = () => {
  return fetch(`${API_BASE_URL}code/log`, {
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

export const getCommitCode = (commitHash: string) => {
  return fetch(`${API_BASE_URL}code/commit/${commitHash}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((response) => {
      return textResponseWrapper(response);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const forkCode = (commitHash: string) => {
  return fetch(`${API_BASE_URL}code/fork/${commitHash}`, {
    credentials: 'include',
    headers: setRequestHeaders(),
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

export const getLastSaveTime = () => {
  return fetch(`${API_BASE_URL}code/last-saved-at`, {
    credentials: 'include',
    headers: setRequestHeaders(),
    method: 'GET',
  })
    .then((response) => {
      return textResponseWrapper(response);
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
