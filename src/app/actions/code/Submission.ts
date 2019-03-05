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
    HANDLE_DEBUG_RUN_SUCCESS = 'HANDLE_DEBUG_RUN_SUCCESS',
    HANDLE_DEBUG_RUN_ERROR = 'HANDLE_DEBUG_RUN_ERROR',
    UPDATE_MAP_ID = 'UPDATE_MAP_ID',
    UPDATE_CURRENT_AI_ID = 'UPDATE_CURRENT_AI_ID',
    UPDATE_DEBUG_RUN_REQUEST = 'UPDATE_DEBUG_RUN_REQUEST',
    UPDATE_DEBUG_RUN_CODE = 'UPDATE_DEBUG_RUN_CODE',
    UPDATE_DEBUG_RUN_COMMIT_HASH = 'UPDATE_DEBUG_RUN_COMMIT_HASH',
    LOCK_CODE = 'LOCK_CODE',
    PREVIOUS_COMMIT_MATCH = 'PREVIOUS_COMMIT_MATCH',
    SELF_MATCH = 'SELF_MATCH',
    AI_MATCH = 'AI_MATCH',
    DEBUG_RUN = 'DEBUG_RUN',
    LOAD_MAPS = 'LOAD_MAPS',
    SAVE_MAPS = 'SAVE_MAPS',
    GET_AI_IDS = 'GET_AI_IDS',
    UPDATE_AI_IDS = 'UPDATE_AI_IDS',
    RESET_SUBMISSION_STATE = 'RESET_SUBMISSION_STATE',
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
    aiId = 1,
  ) =>
    action(Type.CHANGE_STATE_CURRENT_REQUEST, { state, currentRequest, commitHash, mapId, aiId });

  export const handleCompileSuccess = () => action(Type.HANDLE_COMPILE_SUCCESS);

  export const handleCompileError = (error: string) => action(Type.HANDLE_COMPILE_ERROR, { error });

  export const handleExecuteSuccess = (logs: string) =>
    action(Type.HANDLE_EXECUTE_SUCCESS, { logs });

  export const handleExecuteError = (error: string) => action(Type.HANDLE_EXECUTE_ERROR, { error });

  export const handleDebugRunSuccess = (stackTrace: string) =>
    action(Type.HANDLE_DEBUG_RUN_SUCCESS, { stackTrace });

  export const handleDebugRunError = () => action(Type.HANDLE_EXECUTE_ERROR);

  export const updateMapId = (mapId: number) => action(Type.UPDATE_MAP_ID, { mapId });

  export const updateCurrentAiId = (aiId: number) => action(Type.UPDATE_CURRENT_AI_ID, { aiId });

  export const lockCode = () => action(Type.LOCK_CODE);

  export const previousCommitMatch = (mapId: number, commitHash: string) =>
    action(Type.PREVIOUS_COMMIT_MATCH, { mapId, commitHash });

  export const selfMatch = (mapId: number) => action(Type.SELF_MATCH, { mapId });

  export const aiMatch = (mapId: number, aiId: number) => action(Type.AI_MATCH, { mapId, aiId });

  export const debugRun = () => action(Type.DEBUG_RUN);

  export const resetSubmissionState = () => action(Type.RESET_SUBMISSION_STATE);

  export const loadMaps = () => action(Type.LOAD_MAPS);

  export const saveMaps = (maps: SubmissionInterfaces.Map[]) =>
    action(Type.SAVE_MAPS, {
      maps,
    });

  export const updateDebugRunRequest = (request: SubmissionInterfaces.Request) =>
    action(Type.UPDATE_DEBUG_RUN_REQUEST, {
      request,
    });

  export const updateDebugRunCode = (code: string) =>
    action(Type.UPDATE_DEBUG_RUN_CODE, {
      code,
    });

  export const updateDebugRunCommitHash = (commitHash: string) =>
    action(Type.UPDATE_DEBUG_RUN_COMMIT_HASH, {
      commitHash,
    });

  export const getAiIds = () => action(Type.GET_AI_IDS);

  export const updateAiIds = (aiIds: number[]) => action(Type.UPDATE_AI_IDS, { aiIds });
}
