import { ProfileUserActions } from 'app/actions';
import { RouteComponentProps } from 'react-router-dom';
import { ActionType } from 'typesafe-actions';

export enum ProfileUserType {
  STUDENT = 'STUDENT',
  PROFESSIONAL = 'PROFESSIONAL',
}

export interface EditProfileUserDetails {
  username?: string;
  email?: string;
  country?: string;
  fullName?: string;
  college?: string;
  type?: string;
  avatar?: string;
}

const actions = {
  getMatchStats: ProfileUserActions.getMatchStats,
  getUserDetails: ProfileUserActions.getUserDetails,
  updateMatchStats: ProfileUserActions.updateMatchStats,
  updateProfileUserDetails: ProfileUserActions.updateProfileUserDetails,
};

export interface ProfileUserStoreState {
  avatar: string;
  college: string;
  country: string;
  email: string;
  fullName: string;
  type: string;
  userType: ProfileUserType;
  username: string;
  matchStats: ProfileMatchStats;
}

export interface MatchStatsItem {
  wins: number;
  losses: number;
  ties: number;
}

export interface ProfileMatchStats {
  auto: MatchStatsItem;
  faced: MatchStatsItem;
  initiated: MatchStatsItem;
  lastMatchAt: string;
  numMatchches: number;
  userId: number;
}

export interface StateProps {
  profileUserDetails: ProfileUserStoreState;
}

export interface DispatchProps {
  updateProfileUserDetails: (updateProfileUserDetails: EditProfileUserDetails) => void;
  getUserDetails: (username: string) => void;
  getMatchStats: (username: string) => void;
}

interface UrlMatchParams {
  username: string;
}

export type Props = StateProps & DispatchProps & RouteComponentProps<UrlMatchParams>;

export type ProfileUserStoreAction = ActionType<typeof actions>;
