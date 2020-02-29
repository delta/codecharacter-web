/* tslint:disable:no-any*/
import { resType } from 'app/types/sagas';

export enum HeadReqType {
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  PROFILE = 'PROFILE',
  PASSWORD = 'PASSWORD',
  OTHERS = 'OTHERS',
}

/**
 * Middleware to access response object and resolved response data
 * @param response
 */
export function jsonResponseWrapper(response: any) {
  return response.json().then((data: any) => {
    // tslint:disable-next-line: no-console
    console.log(data);
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

/**
 *  Middleware to handle non-json and head type responses and return normalised object similar to json wrapper middleware
 * @param response
 * @param headReqType
 */
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
      body: response.text(),
    });
  });
}

/**
 *  Middleware to handle non-json and head type responses and return normalised object similar to json wrapper middleware
 * @param response
 * @param headReqType
 */
export function textResponseWrapper(response: any) {
  return response.text().then((data: any) => {
    return new Promise((resolve, reject) => {
      let type: string = resType.SUCCESS;
      let error: string = '';
      switch (response.status) {
        case 302:
        case 409:
        case 401:
        case 500:
        case 403:
          error = 'Oops! Something went wrong.';
          type = resType.ERROR;
      }
      resolve({
        error,
        type,
        body: data,
      });
    });
  });
}

/**
 * Function to set header and set cross site request forgery cookies
 */
export function setRequestHeaders() {
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
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append(SET_COOKIE.XSRF, getCookie(GET_COOKIE.XSRF));
  return headers;
}

export enum SET_COOKIE {
  XSRF = 'X-XSRF-TOKEN',
}

export enum GET_COOKIE {
  XSRF = 'XSRF-TOKEN',
}
