import { LeaderboardActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

export interface Player {
  rank: number;
  country: string;
  username: string;
  rating: number;
  fullName: string;
}

export interface GetLeaderboard {
  start: number;
  pattern: string;
  end: number;
}

export interface Search {
  pattern: string;
  start: number;
  end: number;
}

export interface StateProps {
  players: Player[];
  loading: boolean;
  loggedInUsername: string;
}

export interface DispatchProps {
  clearLeaderboard: () => void;
  getLeaderboard: (pattern: string, start: number) => void;
  toggleUserProfileModal: (isUserProfileModalOpen: boolean) => void;
}

export type Props = StateProps & DispatchProps;

export interface State {
  nextFetchIndex: number;
  pattern: string;
  isSearching: boolean;
}

export interface ElementOwnProps {
  player: Player;
  rank: number;
  index: number;
  loggedInUsername: string;
  toggleUserProfileModal: (isUserProfileModalOpen: boolean) => void;
}

export type ElementProps = ElementOwnProps;

const actions = {
  getLeaderboard: LeaderboardActions.getLeaderboard,
  toggleUserProfileModal: LeaderboardActions.toggleUserProfileModal,
  updateError: LeaderboardActions.updateError,
  updateLeaderboard: LeaderboardActions.updateLeaderboard,
  updateLoading: LeaderboardActions.updateLoadingStatus,
};

export interface LeaderboardStoreState {
  isUserProfileModalOpen: boolean;
  readonly loading: boolean;
  readonly players: Player[];
}

export type LeaderboardStoreAction = ActionType<typeof actions>;
