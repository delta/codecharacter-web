import { action } from 'typesafe-actions';

export namespace UserActions {
  export enum Type {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REGISTER = 'REGISTER',
    GET_DETAILS = 'GET_DETAILS',
    UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE',
    UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS',
    CHECK_USERNAME_EXISTS = 'CHECK_USERNAME_EXISTS',
  }

  export const login = (username: string, password: string) =>
    action(Type.LOGIN, {
      password,
      username,
    });

  export const logout = () => action(Type.LOGOUT);

  export interface RegisterDetails {
    username: string;
    password: string;
    repeatPassword: string;
    email: string;
    country?: string;
    fullName: string;
    pragyanId?: string;
  }

  export const register = (registerDetails: RegisterDetails) =>
    action(Type.REGISTER, { registerDetails });

  export const getDetails = () => action(Type.GET_DETAILS);

  export const updateErrorMessage = (errorMessage: string) =>
    action(Type.UPDATE_ERROR_MESSAGE, { errorMessage });

  interface UserDetails {
    isLoggedIn: boolean;
    username?: string;
    email?: string;
    country?: string;
  }

  export const updateUserDetails = (userDetails: UserDetails) =>
    action(Type.UPDATE_USER_DETAILS, { userDetails });

  export const checkUsernameExists = (username: string) =>
    action(Type.CHECK_USERNAME_EXISTS, { username });
}
