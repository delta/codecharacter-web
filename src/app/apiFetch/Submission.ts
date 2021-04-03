/* tslint:disable:no-console*/
import { setRequestHeaders, textResponseWrapper } from 'app/apiFetch/utils';
import { API_BASE_URL } from '../../config/config';

export const codeCompile = (commitHash = 'latest') => {
  return fetch(`${API_BASE_URL}simulate/compile`, {
    body: JSON.stringify({
      commitHash,
    }),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};

export const executeSelfMatch = (mapId: number) => {
  return fetch(`${API_BASE_URL}simulate/match/self`, {
    body: JSON.stringify({
      mapId,
    }),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};

export const executeAiMatch = (mapId: number, aiId: number) => {
  return fetch(`${API_BASE_URL}simulate/match/ai`, {
    body: JSON.stringify({
      aiId,
      mapId,
    }),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};

export const executePreviousCommitMatch = (mapId: number) => {
  return fetch(`${API_BASE_URL}simulate/match/commit`, {
    body: JSON.stringify({
      mapId,
    }),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};

export const executeDebugRun = (code: string, mapId: number, type: string, commitHash?: string) => {
  return fetch(`${API_BASE_URL}simulate/debug`, {
    body: JSON.stringify({
      code,
      mapId,
      type,
      commitHash: commitHash ? commitHash : undefined,
    }),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};

export const lockCode = () => {
  return fetch(`${API_BASE_URL}code/submit`, {
    credentials: 'include',
    headers: setRequestHeaders(),
    method: 'PUT',
  })
    .then((response) => textResponseWrapper(response))
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};

export const loadMaps = () => {
  return fetch(`${API_BASE_URL}simulate/maps`, {
    credentials: 'include',
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};

export const loadAiIds = () => {
  return fetch(`${API_BASE_URL}simulate/ais`, {
    credentials: 'include',
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};
