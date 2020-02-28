// tslint:disable:no-any
import { resType } from 'app/types/sagas';

export function responseWrapper(response: any) {
  return response.json().then((data: any) => {
    return new Promise((resolve, reject) => {
      let type: string = resType.SUCCESS;
      let error: string = '';
      if (!response.ok) {
        type = resType.ERROR;
        error = data.error ? 'Your username or password was incorrect.' : '';
      }
      resolve({
        error,
        type,
        body: data,
      });
    });
  });
}
