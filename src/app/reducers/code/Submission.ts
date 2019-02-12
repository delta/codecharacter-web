import { SubmissionActions } from 'app/actions';
import * as SubmissionInterfaces from 'app/types/code/Submission';

const submissionStoreState: SubmissionInterfaces.SubmissionStoreState = {
  mapId: 1,
  maps: [],
  request: SubmissionInterfaces.Request.NONE,
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
    case SubmissionActions.Type.RESET_SUBMISSION_STATE:
      return {
        ...submissionStoreState,
      };
    case SubmissionActions.Type.SAVE_MAPS: {
      return {
        ...state,
        maps: action.payload.maps,
      };
    }
    default:
      return state;
  }
};
