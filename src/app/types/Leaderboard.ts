import { LeaderboardActions } from 'app/actions';
import { Request } from 'app/types/code/Submission';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import { ActionType } from 'typesafe-actions';

export interface Player {
  userId: number;
  rank: number;
  country: string;
  username: string;
  rating: PlayerRating[];
  fullName: string;
  avatarId: number;
  type: string;
  wins: number;
  losses: number;
  ties: number;
}

export interface PlayerRating {
  userId: number;
  rating: number;
  ratingDeviation: number;
  validFrom: string;
}

export enum UserType {
  STUDENT = 'STUDENT',
  PROFESSIONAL = 'PROFESSIONAL',
  ALL = 'All',
}

export enum UserTypeName {
  STUDENT = 'Student',
  PROFESSIONAL = 'Professional',
  All = 'All',
}

export enum DivisionType {
  DIV1 = 'DIV_1',
  DIV2 = 'DIV_2',
  ALL = 'All',
}

export enum DivisionNames {
  DIV_1 = 'Division 1',
  DIV_2 = 'Division 2',
  All = 'All',
}

export interface GetLeaderboard {
  pageNo: number;
  pageSize: number;
}

export interface GetLeaderboardByDiv {
  div: DivisionType;
  pageNo: number;
  pageSize: number;
}

export interface GetLeaderboardByUserType {
  pageNo: number;
  pageSize: number;
  UserType: UserType;
}

export interface GetLeaderboardByDivAndType {
  div: DivisionType;
  pageNo: number;
  pageSize: number;
  UserType: UserType;
}

export interface Search {
  pageNo: number;
  pageSize: number;
  username: string;
}

export interface RunMatch {
  opponentId: number;
}

export interface StateProps {
  players: Player[];
  loading: boolean;
  timerData: number;
  username: string;
  isLoggedIn: boolean;
}

export interface DispatchProps {
  clearLeaderboard: () => void;
  getLeaderboard: (pageNo: number, pageSize: number) => void;
  getLeaderboardByUserType: (
    pageNo: number,
    pageSize: number,
    userType: LeaderboardInterfaces.UserType,
  ) => void;
  getLeaderboardByDivType: (
    pageNo: number,
    pageSize: number,
    div: LeaderboardInterfaces.DivisionType,
  ) => void;
  getLeaderboardByDivAndType: (
    div: LeaderboardInterfaces.DivisionType,
    pageNo: number,
    pageSize: number,
    userType: LeaderboardInterfaces.UserType,
  ) => void;
  getLeaderboardByUsername: (username: string, pageNo: number, pageSize: number) => void;
  getTimer: () => void;
  runMatch: (opponentId: number) => void;
  setTimer: (timerData: number) => void;
  updatePlayerId2: (playerId2: number) => void;
  updateRequest: (request: Request) => void;
}

export type Props = StateProps & DispatchProps;

export interface State {
  nextFetchIndex: number;
  offset: number;
  pageSize: number;
  pattern: string;
  isSearching: boolean;
  isModelOpen: boolean;
  currentDiv: DivisionType;
  currentUserType: UserType;
}

export interface ElementOwnProps {
  player: Player;
  rank: number;
  index: number;
  isPlayAgainstDisabled: boolean;
  runMatch: (opponentId: number) => void;
  currentUsername: string;
  updatePlayerId2: (playerId2: number) => void;
  updateRequest: (request: Request) => void;
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
  getLeaderboardByDiv: LeaderboardActions.getLeaderboardByDiv,
  getLeaderboardByDivAndType: LeaderboardActions.getLeaderboardByDivAndType,
  getLeaderboardByUserName: LeaderboardActions.getLeaderboardByUserName,
  getLeaderboardByUserType: LeaderboardActions.getLeaderboardByUserType,
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
