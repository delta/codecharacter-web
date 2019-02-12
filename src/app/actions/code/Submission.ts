import * as SubmissionInterfaces from 'app/types/code/Submission';
import { action } from 'typesafe-actions';

export namespace SubmissionActions {
  export enum Type {
    CHANGE_STATE = 'CHANGE_STATE',
    CHANGE_CURRENT_REQUEST = 'CHANGE_CURRENT_REQUEST',
    CHANGE_STATE_CURRENT_REQUEST = 'CHANGE_STATE_CURRENT_REQUEST',
    HANDLE_COMPILE_SUCCESS = 'HANDLE_COMPILE_SUCCESS',
    HANDLE_COMPILE_ERROR = 'HANDLE_COMPILE_ERROR',
    HANDLE_EXECUTE_SUCCESS = 'HANDLE_EXECUTE_SUCCESS',
    HANDLE_EXECUTE_ERROR = 'HANDLE_EXECUTE_ERROR',
    UPDATE_MAP_ID = 'UPDATE_MAP_ID',
    LOCK_CODE = 'LOCK_CODE',
    PREVIOUS_COMMIT_MATCH = 'PREVIOUS_COMMIT_MATCH',
    SELF_MATCH = 'SELF_MATCH',
    RESET_SUBMISSION_STATE = 'RESET_SUBMISSION_STATE',
    LOAD_MAPS = 'LOAD_MAPS',
    SAVE_MAPS = 'SAVE_MAPS',
  }

  export const changeState = (state: SubmissionInterfaces.RequestState) =>
    action(Type.CHANGE_STATE, { state });

  export const changeCurrentRequest = (currentRequest: SubmissionInterfaces.Request) =>
    action(Type.CHANGE_CURRENT_REQUEST, { currentRequest });

  export const changeStateCurrentRequest = (
    state: SubmissionInterfaces.RequestState,
    currentRequest: SubmissionInterfaces.Request,
    commitHash = 'latest',
    mapId = 1,
  ) => action(Type.CHANGE_STATE_CURRENT_REQUEST, { state, currentRequest, commitHash, mapId });

  export const handleCompileSuccess = () => action(Type.HANDLE_COMPILE_SUCCESS);

  export const handleCompileError = (error: string) => action(Type.HANDLE_COMPILE_ERROR, { error });

  export const handleExecuteSuccess = (logs: string) =>
    action(Type.HANDLE_EXECUTE_SUCCESS, { logs });

  export const handleExecuteError = (error: string) => action(Type.HANDLE_EXECUTE_ERROR, { error });

  export const updateMapId = (mapId: number) => action(Type.UPDATE_MAP_ID, { mapId });

  export const lockCode = () => action(Type.LOCK_CODE);

  export const previousCommitMatch = (mapId: number, commitHash: string) =>
    action(Type.PREVIOUS_COMMIT_MATCH, { mapId, commitHash });

  export const selfMatch = (mapId: number) => action(Type.SELF_MATCH, { mapId });

  export const resetSubmissionState = () => action(Type.RESET_SUBMISSION_STATE);

  export const loadMaps = () => action(Type.LOAD_MAPS);

  export const saveMaps = (maps: SubmissionInterfaces.Map[]) =>
    action(Type.SAVE_MAPS, {
      maps,
    });
}
