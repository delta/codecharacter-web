import { Commit } from 'app/types/code/Code';
import { action } from 'typesafe-actions';

export namespace CodeActions {
  export enum Type {
    SAVE = 'SAVE',
    COMMIT = 'COMMIT',
    GET_LATEST_CODE = 'GET_LATEST_CODE',
    UPDATE_STATUS_MESSAGE = 'UPDATE_STATUS_MESSAGE',
    UPDATE_CODE = 'UPDATE_CODE',
    GET_COMMIT_LOG = 'GET_COMMIT_LOG',
    UPDATE_COMMIT_LOG = 'UPDATE_COMMIT_LOG',
    CHECKOUT_CODE = 'CHECKOUT_CODE',
    SET_CURRENT_COMMIT_HASH = 'SET_CURRENT_COMMIT_HASH',
    FORK_CODE = 'FORK_CODE',
    RESET_CODE_STATE = 'RESET_CODE_STATE',
    GET_LAST_SAVE_TIME = 'GET_LAST_SAVE_TIME',
    UPDATE_LAST_SAVE_TIME = 'UPDATE_LAST_SAVE_TIME',
    UPDATE_IS_CODE_SAVED = 'UPDATE_IS_CODE_SAVED',
  }

  export const save = () => action(Type.SAVE);

  export const commit = (commitMessage: string) => action(Type.COMMIT, { commitMessage });

  export const getLatestCode = () => action(Type.GET_LATEST_CODE);

  export const updateStatusMessage = (statusMessage: string) =>
    action(Type.UPDATE_STATUS_MESSAGE, { statusMessage });

  export const updateCode = (code: string) => action(Type.UPDATE_CODE, { code });

  export const getCommitLog = () => action(Type.GET_COMMIT_LOG);

  export const updateCommitLog = (log: Commit[]) => action(Type.UPDATE_COMMIT_LOG, { log });

  export const checkoutCode = (commitHash: string) => action(Type.CHECKOUT_CODE, { commitHash });

  export const setCurrentCommitHash = (commitHash: string) =>
    action(Type.SET_CURRENT_COMMIT_HASH, { commitHash });

  export const forkCode = (commitHash: string) => action(Type.FORK_CODE, { commitHash });

  export const getLastSaveTime = () => action(Type.GET_LAST_SAVE_TIME);

  export const updateLastSaveTime = (lastSaveTime: Date) =>
    action(Type.UPDATE_LAST_SAVE_TIME, { lastSaveTime });

  export const resetCodeState = () => action(Type.RESET_CODE_STATE);

  export const updateIsCodeSaved = (isCodeSaved: boolean) =>
    action(Type.UPDATE_IS_CODE_SAVED, { isCodeSaved });
}
