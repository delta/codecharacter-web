import * as UserInterfaces from 'app/types/User';
import { action } from 'typesafe-actions';

export namespace UserActions {
  export enum Type {
    ACTIVATE_USER = 'ACTIVATE_USER',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REGISTER = 'REGISTER',
    GET_USER_DETAILS = 'GET_USER_DETAILS',
    EDIT_USER_PROFILE = 'EDIT_USER_PROFILE',
    EDIT_USER_PASSWORD = 'EDIT_USER_PASSWORD',
    UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE',
    UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION',
    UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS',
    UPDATE_SOCKET_MESSAGE = 'UPDATE_SOCKET_MESSAGE',
    CHECK_EMAIL_EXISTS = 'CHECK_EMAIL_EXISTS',
    CHECK_USERNAME_EXISTS = 'CHECK_USERNAME_EXISTS',
    TOGGLE_USER_PROFILE_MODAL = 'TOGGLE_USER_PROFILE_MODAL',
    TOGGLE_IS_NOTIFICATION_PRESENT = 'TOGGLE_IS_NOTIFICATION_PRESENT',
    TOGGLE_IS_SOCKET_PRESENT = 'TOGGLE_IS_SOCKET_PRESENT',
    RESET_USER_STATE = 'RESET_USER_STATE',
    RESET_APP_STATE = 'RESET_APP_STATE',
    SET_IS_AUTHENTICATION_OPEN = 'SET_IS_AUTHENTICATION_OPEN',
    SET_IS_LOGIN_LOADING = 'SET_IS_LOGIN_LOADING',
  }

  export const activateUser = (authToken: string, userId: number) =>
    action(Type.ACTIVATE_USER, {
      authToken,
      userId,
    });

  export const login = (email: string, password: string) =>
    action(Type.LOGIN, {
      email,
      password,
    });

  export const logout = () => action(Type.LOGOUT);

  export const register = (registerDetails: UserInterfaces.Register) =>
    action(Type.REGISTER, { registerDetails });

  export const updateErrorMessage = (errorMessage: string) =>
    action(Type.UPDATE_ERROR_MESSAGE, { errorMessage });

  interface UserDetails {
    isLoggedIn: boolean;
    isFirstLogin?: boolean;
    userId?: number;
    avatar?: string;
    college?: string;
    userType?: UserInterfaces.UserType;
    fullName?: string;
    username?: string;
    email?: string;
    errorMessage?: string;
    country?: string;
    isUserProfileModalOpen?: boolean;
  }

  export const updateUserDetails = (userDetails: UserDetails) =>
    action(Type.UPDATE_USER_DETAILS, { userDetails });

  export const getUserDetails = () => action(Type.GET_USER_DETAILS);

  export const editUserProfile = (editUserDetails: UserInterfaces.EditUserDetails) =>
    action(Type.EDIT_USER_PROFILE, { editUserDetails });

  export const editUserPassword = (editUserPasswordDetails: UserInterfaces.EditUserPassword) =>
    action(Type.EDIT_USER_PASSWORD, { editUserPasswordDetails });

  export const checkEmailExists = (email: string) => action(Type.CHECK_EMAIL_EXISTS, { email });

  export const checkUsernameExists = (username: string) =>
    action(Type.CHECK_USERNAME_EXISTS, { username });

  export const toggleIsSocketPresent = () => action(Type.TOGGLE_IS_SOCKET_PRESENT);

  export const updateSocketMessage = (socketMessage: string) =>
    action(Type.UPDATE_SOCKET_MESSAGE, { socketMessage });

  export const toggleIsNotificationPresent = () => action(Type.TOGGLE_IS_NOTIFICATION_PRESENT);

  export const updateNotification = (notification: string) =>
    action(Type.UPDATE_NOTIFICATION, { notification });

  export const toggleUserProfileModal = (isUserProfileModalOpen: boolean) =>
    action(Type.TOGGLE_USER_PROFILE_MODAL, { isUserProfileModalOpen });

  export const resetUserState = () => action(Type.RESET_USER_STATE);

  export const resetAppState = () => action(Type.RESET_APP_STATE);

  export const setIsAuthenticationOpen = (isAuthenticationOpen: boolean) =>
    action(Type.SET_IS_AUTHENTICATION_OPEN, { isAuthenticationOpen });

  export const setIsLoginLoading = (isLoginLoading: boolean) =>
    action(Type.SET_IS_LOGIN_LOADING, { isLoginLoading });
}
