import { LeaderboardActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

export interface Player {
  country: string;
  id: number;
  name: string;
  rating: number;
}

export interface StateProps {
  players: Player[];
}

export interface DispatchProps {
  getPlayersData: () => void;
}

export type Props = StateProps & DispatchProps;

export interface ElementOwnProps {
  player: Player;
  rank: number;
}

export type ElementProps = ElementOwnProps;

export interface LeaderboardDataType {
  loading: boolean;
  players: Player[];
}

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
