import { UserActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

export interface Register {
  avatarId: number;
  college?: string;
  country: string;
  email: string;
  fullName: string;
  password: string;
  username: string;
}

export interface EditUserDetails {
  username?: string;
  email?: string;
  country?: string;
  fullName?: string;
  college?: string;
  type?: string;
  avatar?: string;
}

export interface EditUserPassword {
  password?: string;
  oldPassword?: string;
}

export interface Login {
  email: string;
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
  setIsAuthenticationOpen: UserActions.setIsAuthenticationOpen,
  setIsLoginLoading: UserActions.setIsLoginLoading,
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
  isLoginLoading: boolean;
  isUserProfileModalOpen: boolean;
  isAuthenticationOpen: boolean;
  college: string;
  type: string;
  avatar: string;
}

export type UserStoreAction = ActionType<typeof actions>;
