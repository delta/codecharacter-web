import { LeaderboardActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';
import Player = LeaderboardActions.Player;

const actions = {
  getPlayersData: LeaderboardActions.getPlayersData,
  updateError: LeaderboardActions.updateError,
  updateLeaderboard: LeaderboardActions.updateLeaderboard,
};

export interface LeaderboardStoreState {
  readonly loading: boolean;
  readonly players: Player[];
}

export type LeaderboardStoreAction = ActionType<typeof actions>;

const leaderboardInitialState: LeaderboardStoreState = {
  loading: false,
  players: [
    { id: 1, name: 'Uenify', rating: 3500, country: 'in' },
    { id: 3, name: 'kekland', rating: 2750, country: 'in' },
    { id: 2, name: 'Madopew', rating: 1220, country: 'fr' },
    { id: 4, name: 'Yussend', rating: 700, country: 'in' },
    { id: 5, name: 'Admin', rating: 675, country: 'in' },
    { id: 1, name: 'Uenify', rating: 3500, country: 'in' },
    { id: 3, name: 'kekland', rating: 2750, country: 'in' },
    { id: 2, name: 'Madopew', rating: 1220, country: 'fr' },
    { id: 4, name: 'Yussend', rating: 700, country: 'in' },
    { id: 5, name: 'Admin', rating: 675, country: 'in' },
  ],
};

export const leaderboardReducer = (
  state = leaderboardInitialState,
  action: LeaderboardStoreAction,
) => {
  switch (action.type) {
    case LeaderboardActions.Type.UPDATE_LEADERBOARD: {
      return {
        ...state,
        loading: false,
        players: [...state.players, ...action.payload.players],
      };
    }
    case LeaderboardActions.Type.UPDATE_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
