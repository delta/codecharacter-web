import { SubmissionActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  changeCurrentRequest: SubmissionActions.changeCurrentRequest,
  changeState: SubmissionActions.changeState,
  resetSubmissionState: SubmissionActions.resetSubmissionState,
  saveMaps: SubmissionActions.saveMaps,
  updateAiIds: SubmissionActions.updateAiIds,
  updateCurrentAiId: SubmissionActions.updateCurrentAiId,
  updateDebugRunCode: SubmissionActions.updateDebugRunCode,
  updateDebugRunCommitHash: SubmissionActions.updateDebugRunCommitHash,
  updateDebugRunRequest: SubmissionActions.updateDebugRunRequest,
  updateMapId: SubmissionActions.updateMapId,
};

export enum Request {
  NONE = 'NONE',
  SELF_MATCH = 'SELF_MATCH',
  PREVIOUS_COMMIT_MATCH = 'PREVIOUS_COMMIT_MATCH',
  AI_MATCH = 'AI_MATCH',
  LOCK_CODE = 'LOCK_CODE',
  DEBUG_RUN = 'DEBUG_RUN',
}

export enum RequestState {
  COMPILE_PREVIOUS_COMMIT_CODE = 'COMPILE_PREVIOUS_COMMIT_CODE',
  COMPILE_CURRENT_CODE = 'COMPILE_CURRENT_CODE',
  EXECUTE_PREVIOUS_COMMIT_MATCH = 'EXECUTE_PREVIOUS_COMMIT_MATCH',
  EXECUTE_SELF_MATCH = 'EXECUTE_SELF_MATCH',
  EXECUTE_AI_MATCH = 'EXECUTE_AI_MATCH',
  DEBUG_RUN = 'DEBUG_RUN',
  IDLE = 'IDLE',
}

export interface SubmissionStoreState {
  currentAiId: number;
  aiIds: number[];
  request: Request;
  state: RequestState;
  debugRunRequest: Request;
  debugRunCode: string;
  debugRunCommitHash: string;
  mapId: number;
  maps: Map[];
}

export interface Map {
  mapId: number;
  name: string;
}

export type SubmissionStoreAction = ActionType<typeof actions>;
