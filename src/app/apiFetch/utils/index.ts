/* tslint:disable:no-any*/
/* tslint:disable:no-console*/
import { resType } from 'app/types/sagas';

export enum HeadReqType {
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  PROFILE = 'PROFILE',
  PASSWORD = 'PASSWORD',
  OTHERS = 'OTHERS',
}

export function jsonResponseWrapper(response: any) {
  return response.json().then((data: any) => {
    return new Promise((resolve, reject) => {
      let type: string = resType.SUCCESS;
      let error: string = '';
      // resource : found || fetched || created
      if (response.status !== 302 && response.status !== 200 && response.status !== 201) {
        type = resType.ERROR;
        error = data.error;
      }
      resolve({
        error,
        type,
        body: data,
      });
    });
  });
}

export function headResponseWrapper(response: any, headReqType: HeadReqType) {
  return new Promise((resolve, reject) => {
    let type: string = resType.SUCCESS;
    let error: string = '';
    switch (response.status) {
      case 302:
        error =
          headReqType === HeadReqType.EMAIL
            ? 'Email already registered.'
            : 'Username already taken.';
        type = resType.ERROR;
        break;
      case 409:
        error =
          headReqType === HeadReqType.PROFILE
            ? 'Update not successful. Please try again'
            : 'Please try again';
        type = resType.ERROR;
        break;
      case 401:
        error =
          headReqType === HeadReqType.PASSWORD
            ? 'Incorrect old password.'
            : 'Please try again with correct password';
        type = resType.ERROR;
        break;
      case 500:
      case 403:
        error = headReqType === HeadReqType.OTHERS ? '' : '';
        type = resType.ERROR;
    }
    resolve({
      error,
      type,
    });
  });
}

export function getReqHeaders() {
  const getCookie = (name: string) => {
    const cookies = Object.assign(
      {},
      ...document.cookie.split('; ').map((cookie) => {
        const key = cookie.split('=')[0];
        const value = cookie.split('=')[1];

        return { [key]: value };
      }),
    );
    return cookies[name];
  };
  const headersConfig = new Headers();
  headersConfig.append('Content-Type', 'application/json');
  headersConfig.append(SET_COOKIE.XSRF, getCookie(GET_COOKIE.XSRF));
  return headersConfig;
}

export enum SET_COOKIE {
  XSRF = 'X-XSRF-TOKEN',
}

export enum GET_COOKIE {
  XSRF = 'XSRF-TOKEN',
}
