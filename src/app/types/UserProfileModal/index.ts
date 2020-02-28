import * as UserInterfaces from 'app/types/User';

export interface StateProps {
  isUserProfileModalOpen: boolean;
  userDetails: UserInterfaces.UserStoreState;
}

export interface State {
  avatar: string;
  username: string;
  oldPassword: string;
  password: string;
  repeatPassword: string;
  country: string;
  fullName: string;
  isPasswordPage: boolean;
}

export enum InputName {
  avatar = 'avatar',
  username = 'username',
  oldPassword = 'oldPassword',
  password = 'password',
  repeatPassword = 'repeatPassword',
  country = 'country',
  fullName = 'fullName',
}

export interface DispatchProps {
  checkEmailExists: (email: string) => void;
  editUserPassword: (editUserPasswordDetails: UserInterfaces.EditUserPassword) => void;
  editUserProfile: (editUserDetails: UserInterfaces.EditUserDetails) => void;
  getUserDetails: () => void;
  toggleUserProfileModal: (isUserProfileModalOpen: boolean) => void;
}

export type Props = StateProps & DispatchProps;
