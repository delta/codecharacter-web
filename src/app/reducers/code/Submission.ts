import { SubmissionActions } from 'app/actions';
import * as SubmissionInterfaces from 'app/types/code/Submission';
import * as SubmitBarInterfaces from 'app/types/SubmitBar';

const submissionStoreState: SubmissionInterfaces.SubmissionStoreState = {
  aiIds: [],
  currentAiId: 1,
  debugRunCode: '',
  debugRunCommitHash: 'latest',
  debugRunRequest: SubmissionInterfaces.Request.NONE,
  mapId: 1,
  maps: [],
  request: SubmissionInterfaces.Request.NONE,
  selectedMap: SubmitBarInterfaces.Map.MAP1,
  state: SubmissionInterfaces.RequestState.IDLE,
};

export const submissionReducer = (
  state = submissionStoreState,
  action: SubmissionInterfaces.SubmissionStoreAction,
) => {
  switch (action.type) {
    case SubmissionActions.Type.CHANGE_CURRENT_REQUEST: {
      return {
        ...state,
        request: action.payload.currentRequest,
      };
    }
    case SubmissionActions.Type.CHANGE_STATE: {
      return {
        ...state,
        state: action.payload.state,
      };
    }
    case SubmissionActions.Type.UPDATE_MAP_ID: {
      return {
        ...state,
        mapId: action.payload.mapId,
      };
    }
    case SubmissionActions.Type.UPDATE_MAP: {
      return {
        ...state,
        selectedMap: action.payload.map,
      };
    }
    case SubmissionActions.Type.UPDATE_CURRENT_AI_ID: {
      return {
        ...state,
        currentAiId: action.payload.aiId,
      };
    }
    case SubmissionActions.Type.SAVE_MAPS: {
      return {
        ...state,
        maps: action.payload.maps,
      };
    }
    case SubmissionActions.Type.UPDATE_AI_IDS: {
      return {
        ...state,
        aiIds: action.payload.aiIds,
      };
    }
    case SubmissionActions.Type.UPDATE_DEBUG_RUN_REQUEST: {
      return {
        ...state,
        debugRunRequest: action.payload.request,
      };
    }
    case SubmissionActions.Type.UPDATE_DEBUG_RUN_CODE: {
      return {
        ...state,
        debugRunCode: action.payload.code,
      };
    }
    case SubmissionActions.Type.UPDATE_DEBUG_RUN_COMMIT_HASH: {
      return {
        ...state,
        debugRunCommitHash: action.payload.commitHash,
      };
    }
    case SubmissionActions.Type.RESET_SUBMISSION_STATE:
      return {
        ...submissionStoreState,
      };
    default:
      return state;
  }
};
