import { LeaderboardActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

export interface Player {
  id: number;
  rank: number;
  country: string;
  username: string;
  rating: number;
  fullName: string;
  avatar: string;
  type: string;
  numWin: number;
  numLoss: number;
  numTie: number;
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

export interface RunMatch {
  opponentId: number;
}

export interface StateProps {
  players: Player[];
  loading: boolean;
  timerData: number;
  username: string;
}

export interface DispatchProps {
  clearLeaderboard: () => void;
  getLeaderboard: (pattern: string, start: number) => void;
  getTimer: () => void;
  runMatch: (opponentId: number) => void;
  setTimer: (timerData: number) => void;
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
  isPlayAgainstDisabled: boolean;
  runMatch: (opponentId: number) => void;
  currentUsername: string;
}

export type ElementProps = ElementOwnProps;

export interface TimerProps {
  timerData: number;
  getTimer: () => void;
  setTimer: (timerData: number) => void;
}

export interface TimerState {
  totalSeconds: number;
  seconds: number;
  minutes: number;
}

const actions = {
  getLeaderboard: LeaderboardActions.getLeaderboard,
  resetLeaderboardState: LeaderboardActions.resetLeaderboardState,
  setTimer: LeaderboardActions.setTimer,
  toggleUserProfileModal: LeaderboardActions.toggleUserProfileModal,
  updateError: LeaderboardActions.updateError,
  updateLeaderboard: LeaderboardActions.updateLeaderboard,
  updateLoading: LeaderboardActions.updateLoadingStatus,
};

export interface LeaderboardStoreState {
  isUserProfileModalOpen: boolean;
  readonly loading: boolean;
  readonly players: Player[];
  timerData: number;
}

export type LeaderboardStoreAction = ActionType<typeof actions>;
