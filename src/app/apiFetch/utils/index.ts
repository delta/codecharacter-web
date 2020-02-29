/* tslint:disable:no-any*/
/* tslint:disable:no-console*/
import { resType } from 'app/types/sagas';

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

export function headResponseWrapper(response: any) {
  return new Promise((resolve, reject) => {
    let type: string = resType.SUCCESS;
    let error: string = '';
    switch (response.status) {
      case 200:
        error = 'Email already registered';
        type = resType.ERROR;
        break;
    }
    resolve({
      error,
      type,
    });
  });
}
