import { MatchActions } from 'app/actions';
import * as MatchViewInterfaces from 'app/types/MatchView';

const matchesInitialState: MatchViewInterfaces.MatchStoreState = {
  loading: false,
  matches: [],
  topMatches: [],
};

export const matchesReducer = (
  state = matchesInitialState,
  action: MatchViewInterfaces.MatchStoreAction,
) => {
  switch (action.type) {
    case MatchActions.Type.UPDATE_LOADING_STATUS: {
      return {
        ...state,
        loading: action.payload.loadingStatus,
      };
    }
    case MatchActions.Type.UPDATE_MATCHES: {
      return {
        ...state,
        loading: false,
        matches: action.payload.matchesData,
      };
    }
    case MatchActions.Type.UPDATE_TOP_MATCHES: {
      return {
        ...state,
        loading: false,
        topMatches: action.payload.topMatchesData,
      };
    }
    case MatchActions.Type.UPDATE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case MatchActions.Type.RESET_MATCH_VIEW:
      return {
        ...matchesInitialState,
      };
    default:
      return state;
  }
};
