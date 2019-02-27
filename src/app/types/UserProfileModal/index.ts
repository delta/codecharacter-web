import * as UserInterfaces from 'app/types/User';

export interface StateProps {
  isUserProfileModalOpen: boolean;
  userDetails: UserInterfaces.UserStoreState;
}

export interface ListDisabled {
  isUserNameDisabled?: boolean;
  isFullNameDisabled?: boolean;
  isFlagSelectDisabled?: boolean;
  isPasswordDisabled?: boolean;
}

export enum editFormType {
  OWN_PROFILE = 'OWN_PROFILE',
  OTHER_PROFILE = 'OTHER_PROFILE',
}
export interface State {
  activeForm: editFormType;
  avatar: string;
  username: string;
  oldPassword: string;
  password: string;
  repeatPassword: string;
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
  country = 'country',
  fullName = 'fullName',
  listDisabled = 'listDisabled',
}

export enum InputState {
  isUserNameDisabled = 'isUserNameDisabled',
  isFullNameDisabled = 'isFullNameDisabled',
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
