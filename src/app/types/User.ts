import { UserActions } from 'app/actions';
import * as RegisterInterfaces from 'app/types/Authentication/Register';
import { ActionType } from 'typesafe-actions';

export interface Register {
  avatar?: string;
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  country: string;
  fullName: string;
  pragyanId?: string;
  type: RegisterInterfaces.RegisterType;
  college?: string;
}

export interface EditUserDetails {
  username?: string;
  email?: string;
  country?: string;
  fullName?: string;
}

export interface EditUserPassword {
  password?: string;
  oldPassword?: string;
}

export interface Login {
  username: string;
  password: string;
}

const actions = {
  editUserPassword: UserActions.editUserPassword,
  editUserProfile: UserActions.editUserProfile,
  getUserDetails: UserActions.getUserDetails,
  login: UserActions.login,
  logout: UserActions.logout,
  register: UserActions.register,
  resetUserState: UserActions.resetUserState,
  toggleUserProfileModal: UserActions.toggleUserProfileModal,
  updateErrorMessage: UserActions.updateErrorMessage,
  updateUserDetails: UserActions.updateUserDetails,
};

export interface UserStoreState {
  errorMessage: string;
  fullName: string;
  username: string;
  email: string;
  country: string;
  isLoggedIn: boolean;
  isUserProfileModalOpen: boolean;
}

export type UserStoreAction = ActionType<typeof actions>;
