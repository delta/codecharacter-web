import * as UserInterfaces from 'app/types/User';

export interface StateProps {
  isUserProfileModalOpen: boolean;
  userDetails: UserInterfaces.UserStoreState;
}

export interface ListDisabled {
  isUserNameDisabled?: boolean;
  isFullNameDisabled?: boolean;
  isEmailDisabled?: boolean;
  isFlagSelectDisabled?: boolean;
  isPasswordDisabled?: boolean;
}
export interface State {
  avatar: string;
  username: string;
  oldPassword: string;
  password: string;
  repeatPassword: string;
  email: string;
  country: string;
  fullName: string;
  listDisabled: ListDisabled;
}

export enum InputName {
  avatar = 'avatar',
  username = 'username',
  oldPassword = 'oldPassword',
  password = 'password',
  repeatPassword = 'repeatPassword',
  email = 'email',
  country = 'country',
  fullName = 'fullName',
  listDisabled = 'listDisabled',
}

export enum InputState {
  isUserNameDisabled = 'isUserNameDisabled',
  isFullNameDisabled = 'isFullNameDisabled',
  isEmailDisabled = 'isEmailDisabled',
  isFlagSelectDisabled = 'isFlagSelectDisabled',
  isPasswordDisabled = 'isPasswordDisabled',
}

export interface DispatchProps {
  checkUsernameExists: (username: string) => void;
  editUserPassword: (editUserPasswordDetails: UserInterfaces.EditUserPassword) => void;
  editUserProfile: (editUserDetails: UserInterfaces.EditUserDetails) => void;
  getUserDetails: () => void;
  toggleUserProfileModal: (isUserProfileModalOpen: boolean) => void;
}

export type Props = StateProps & DispatchProps;
