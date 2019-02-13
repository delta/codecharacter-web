import { LeaderboardActions } from 'app/actions';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';

const leaderboardInitialState: LeaderboardInterfaces.LeaderboardStoreState = {
  isUserProfileModalOpen: false,
  loading: false,
  players: [],
  timerData: 0,
};

export const leaderboardReducer = (
  state = leaderboardInitialState,
  action: LeaderboardInterfaces.LeaderboardStoreAction,
) => {
  switch (action.type) {
    case LeaderboardActions.Type.UPDATE_LOADING_STATUS: {
      return {
        ...state,
        loading: action.payload.loadingStatus,
      };
    }
    case LeaderboardActions.Type.UPDATE_LEADERBOARD: {
      let players = [];
      if (action.payload.type === LeaderboardActions.updateType.APPEND) {
        players = [...state.players, ...action.payload.leaderboardData];
      } else {
        players = action.payload.leaderboardData;
      }
      return {
        ...state,
        players,
        loading: false,
      };
    }
    case LeaderboardActions.Type.UPDATE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case LeaderboardActions.Type.TOGGLE_USER_PROFILE_MODAL:
      return {
        ...state,
        isUserProfileModalOpen: action.payload.isUserProfileModalOpen,
      };
    case LeaderboardActions.Type.RESET_LEADERBOARD_STATE: {
      return {
        ...leaderboardInitialState,
      };
    }
    case LeaderboardActions.Type.SET_TIMER:
      return {
        ...state,
        timerData: action.payload.timerData,
      };
    default:
      return state;
  }
};
