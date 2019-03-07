import * as UserInterfaces from 'app/types/User';
import { action } from 'typesafe-actions';

export namespace UserActions {
  export enum Type {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REGISTER = 'REGISTER',
    GET_USER_DETAILS = 'GET_USER_DETAILS',
    EDIT_USER_PROFILE = 'EDIT_USER_PROFILE',
    EDIT_USER_PASSWORD = 'EDIT_USER_PASSWORD',
    UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE',
    UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS',
    CHECK_USERNAME_EXISTS = 'CHECK_USERNAME_EXISTS',
    TOGGLE_USER_PROFILE_MODAL = 'TOGGLE_USER_PROFILE_MODAL',
    RESET_USER_STATE = 'RESET_USER_STATE',
    RESET_APP_STATE = 'RESET_APP_STATE',
    SET_IS_AUTHENTICATION_OPEN = 'SET_IS_AUTHENTICATION_OPEN',
    SET_IS_LOGIN_LOADING = 'SET_IS_LOGIN_LOADING',
  }

  export const login = (username: string, password: string) =>
    action(Type.LOGIN, {
      password,
      username,
    });

  export const logout = () => action(Type.LOGOUT);

  export const register = (registerDetails: UserInterfaces.Register) =>
    action(Type.REGISTER, { registerDetails });

  export const updateErrorMessage = (errorMessage: string) =>
    action(Type.UPDATE_ERROR_MESSAGE, { errorMessage });

  interface UserDetails {
    isLoggedIn: boolean;
    avatar?: string;
    college?: string;
    type?: string;
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

  export const checkUsernameExists = (username: string) =>
    action(Type.CHECK_USERNAME_EXISTS, { username });

  export const toggleUserProfileModal = (isUserProfileModalOpen: boolean) =>
    action(Type.TOGGLE_USER_PROFILE_MODAL, { isUserProfileModalOpen });

  export const resetUserState = () => action(Type.RESET_USER_STATE);

  export const resetAppState = () => action(Type.RESET_APP_STATE);

  export const setIsAuthenticationOpen = (isAuthenticationOpen: boolean) =>
    action(Type.SET_IS_AUTHENTICATION_OPEN, { isAuthenticationOpen });

  export const setIsLoginLoading = (isLoginLoading: boolean) =>
    action(Type.SET_IS_LOGIN_LOADING, { isLoginLoading });
}
