/* tslint:disable:no-any*/
/* tslint:disable:no-console*/
import { resType } from 'app/types/sagas';

export enum HeadReqType {
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  PROFILE = 'PROFILE',
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
    }
    resolve({
      error,
      type,
    });
  });
}
