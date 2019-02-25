import { MatchActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

export enum MatchViewTabType {
  MY_MATCHES = 'MY_MATCHES',
  TOP_MATCHES = 'TOP_MATCHES',
}

export interface OwnState {
  activeMatchViewTab: MatchViewTabType;
  offset: number;
}

export interface Game {
  id: number;
  verdict: string;
  mapId: number;
}

export interface Match {
  avatar1: string;
  avatar2: string;
  username1: string;
  score1: number;
  username2: string;
  score2: number;
  verdict: string;
  playedAt: string;
  games: Game[];
}

export interface StateProps {
  matches: Match[];
  topMatches: Match[];
  loading: boolean;
  currentUsername: string;
}

export interface DispatchProps {
  getMatches: () => void;
  getTopMatches: () => void;
  getGameLogs: (gameId: number) => void;
}

export type Props = StateProps & DispatchProps;

export type State = OwnState;

export interface ElementOwnProps {
  match: Match;
  index: number;
  currentUserMatch: boolean;
  type: MatchViewTabType;
  getGameLogs: (gameId: number) => void;
}

export interface ElementState {
  isHoveredOver: boolean;
}

export type ElementProps = ElementOwnProps;

const actions = {
  getMatches: MatchActions.getMatches,
  getTopMatches: MatchActions.getTopMatches,
  resetMatchView: MatchActions.resetMatchView,
  updateError: MatchActions.updateError,
  updateLoading: MatchActions.updateLoadingStatus,
  updateMatches: MatchActions.updateMatches,
  updateTopMatchs: MatchActions.updateTopMatches,
};

export interface MatchStoreState {
  loading: boolean;
  matches: Match[];
  topMatches: Match[];
}

export type MatchStoreAction = ActionType<typeof actions>;
