import { UserActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

export enum UserType {
  STUDENT = 'STUDENT',
  PROFESSIONAL = 'PROFESSIONAL',
}

export interface Register {
  avatarId: number;
  college?: string;
  country: string;
  email: string;
  fullName: string;
  password: string;
  username: string;
  userType: UserType;
}

export interface EditUserDetails {
  username?: string;
  country?: string;
  fullName?: string;
  college?: string;
  type?: string;
  avatarId?: string;
}

export interface EditUserPassword {
  password?: string;
  oldPassword?: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface ActivateUser {
  authToken: string;
  userId: number;
}

const actions = {
  ActivateUser: UserActions.activateUser,
  closeStoryModeModal: UserActions.closeStoryModeModal,
  editUserPassword: UserActions.editUserPassword,
  editUserProfile: UserActions.editUserProfile,
  getUserDetails: UserActions.getUserDetails,
  login: UserActions.login,
  logout: UserActions.logout,
  openStoryModeModal: UserActions.openStoryModeModal,
  register: UserActions.register,
  resetUserState: UserActions.resetUserState,
  setIsAuthenticationOpen: UserActions.setIsAuthenticationOpen,
  setIsLoginLoading: UserActions.setIsLoginLoading,
  toggleIsNotificationPresent: UserActions.toggleIsNotificationPresent,
  toggleIsSocketPresent: UserActions.toggleIsSocketPresent,
  toggleUserProfileModal: UserActions.toggleUserProfileModal,
  updateErrorMessage: UserActions.updateErrorMessage,
  updateNotification: UserActions.updateNotification,
  updateSocketMessage: UserActions.updateSocketMessage,
  updateUserDetails: UserActions.updateUserDetails,
};

export interface UserStoreState {
  errorMessage: string;
  fullName: string;
  username: string;
  email: string;
  country: string;
  userId: number;
  isFirstLogin: boolean;
  isLoggedIn: boolean;
  isLoginLoading: boolean;
  isUserProfileModalOpen: boolean;
  isNotificationPresent: boolean;
  isSocketPresent: boolean;
  isStoryModeModalOpen?: boolean;
  storyModeModalLevel?: number;
  notification: string;
  socketMessage: string;
  isAuthenticationOpen: boolean;
  college: string;
  userType: UserType;
  avatar: string;
}

export type UserStoreAction = ActionType<typeof actions>;

export enum MatchMode {
  AUTO = 'AUTO',
  SELF = 'SELF',
  AI = 'AI',
  PREV_COMMIT = 'PREV_COMMIT',
  MANUAL = 'MANUAL',
}

export interface MatchDetails {
  mapId: number;
  matchMode: MatchMode;
  playerId1: number;
  playerId2: number;
}

export interface StateProps {
  isMatchRequestPresent: boolean;
  matchRequestDetails: MatchDetails;
}
