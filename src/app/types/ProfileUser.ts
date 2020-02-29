import { ProfileUserActions } from 'app/actions';
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
  getUserDetails: ProfileUserActions.getUserDetails,
  updateUserDetails: ProfileUserActions.updateUserDetails,
};

export interface ProfileUserStoreState {
  fullName: string;
  username: string;
  email: string;
  country: string;
  college: string;
  userType: ProfileUserType;
  avatar: string;
}

export interface ProfileUserStoreState {
  avatar: string;
  college: string;
  country: string;
  email: string;
  fullName: string;
  type: string;
  username: string;
}

export type ProfileUserStoreAction = ActionType<typeof actions>;
