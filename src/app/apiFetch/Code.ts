/* tslint:disable:no-console*/
import { API_BASE_URL } from '../../config/config';
import { getReqHeaders, HeadReqType, headResponseWrapper } from './utils';

export const saveCode = (code: string) => {
  return fetch(`${API_BASE_URL}code`, {
    body: code,
    credentials: 'include',
    headers: getReqHeaders(),
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
    body: JSON.stringify({
      commitMessage,
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
      console.error(error);
    });
};

export const getLatestCode = () => {
  return fetch(`${API_BASE_URL}code/latest`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
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
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getCommitCode = (commitHash: string) => {
  return fetch(`${API_BASE_URL}code/view/${commitHash}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
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
      console.error(error);
    });
};

export const forkCode = (commitHash: string) => {
  return fetch(`${API_BASE_URL}code/fork/${commitHash}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
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
      console.error(error);
    });
};

export const getLastSaveTime = () => {
  return fetch(`${API_BASE_URL}code/lastsave`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
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
      console.error(error);
    });
};
