import { UserActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

export interface Register {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  country?: string;
  fullName: string;
  pragyanId?: string;
}

export interface Login {
  username: string;
  password: string;
}

const actions = {
  getDetails: UserActions.getDetails,
  login: UserActions.login,
  logout: UserActions.logout,
  register: UserActions.register,
  updateErrorMessage: UserActions.updateErrorMessage,
  updateUserDetails: UserActions.updateUserDetails,
};

export interface UserStoreState {
  errorMessage: string;
  username: string;
  email: string;
  country: string;
  isLoggedIn: boolean;
}

export type UserStoreAction = ActionType<typeof actions>;
