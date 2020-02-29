import { MatchActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

export enum MatchViewTabType {
  MY_MATCHES = 'MY_MATCHES',
  TOP_MATCHES = 'TOP_MATCHES',
}

export interface OwnState {
  activeMatchViewTab: MatchViewTabType;
  pageNo: number;
}

export interface Game {
  id: number;
  verdict: string;
  mapId: number;
  winType: string;
}

export interface Match {
  avatar1: string;
  avatar2: string;
  username1: string;
  score1: number;
  rating1?: number;
  username2: string;
  score2: number;
  rating2?: number;
  verdict: string;
  playedAt: string;
  match_mode: string;
  games: Game[];
}

export interface StateProps {
  matches: Match[];
  topMatches: Match[];
  loading: boolean;
  currentUsername: string;
}

export interface DispatchProps {
  getMatches: (pageNo: number, pageSize: number) => void;
  getTopMatches: (pageNo: number, pageSize: number) => void;
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
  isSelected: boolean;
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

export interface RecievedGame {
  createdAt: string;
  id: number;
  interestingness: number;
  mapId: number;
  matchId: number;
  points1: number;
  points2: number;
  status: string;
  verdict: string;
}

export interface RecievedMatch {
  avatar1: number;
  avatar2: number;
  games: RecievedGame[];
  matchMode: string;
  playedAt: string;
  score1: number;
  score2: number;
  username1: string;
  username2: string;
  verdict: string;
}

export type MatchStoreAction = ActionType<typeof actions>;
