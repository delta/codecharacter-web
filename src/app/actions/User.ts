import { action } from 'typesafe-actions';

export namespace UserActions {
  export enum Type {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REGISTER = 'REGISTER',
    GET_DETAILS = 'GET_DETAILS',
  }

  export const login = (username: string, password: string) =>
    action(Type.LOGIN, {
      password,
      username,
    });

  export const logout = () => action(Type.LOGOUT);

  interface RegisterDetails {
    username: string;
    password: string;
    repeatPassword: string;
    email: string;
    country?: string;
    fullName: string;
    pragyanId: string;
  }

  export const register = (registerDetails: RegisterDetails) =>
    action(Type.REGISTER, registerDetails);

  export const getDetails = () => action(Type.GET_DETAILS);
}
