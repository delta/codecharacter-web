import { action } from 'typesafe-actions';

export namespace CodeActions {
  export enum Type {
    SAVE = 'SAVE',
    COMMIT = 'COMMIT',
    GET_LATEST_CODE = 'GET_LATEST_CODE',
    UPDATE_STATUS_MESSAGE = 'UPDATE_STATUS_MESSAGE',
    UPDATE_CODE = 'UPDATE_CODE',
  }

  export const save = () => action(Type.SAVE);

  export const commit = (commitMessage: string) => action(Type.COMMIT, { commitMessage });

  export const getLatestCode = () => action(Type.GET_LATEST_CODE);

  export const updateStatusMessage = (statusMessage: string) =>
    action(Type.UPDATE_STATUS_MESSAGE, { statusMessage });

  export const updateCode = (code: string) => action(Type.UPDATE_CODE, { code });
}
