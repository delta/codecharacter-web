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
}

export interface StateProps {
  profileUserDetails: ProfileUserStoreState;
}

export interface DispatchProps {
  updateProfileUserDetails: (updateProfileUserDetails: EditProfileUserDetails) => void;
  getUserDetails: () => void;
  getMatchStats: (username: string) => void;
}
export type Props = StateProps & DispatchProps;

export type ProfileUserStoreAction = ActionType<typeof actions>;
