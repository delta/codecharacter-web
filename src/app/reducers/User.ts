import { UserActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  getDetails: UserActions.getDetails,
  login: UserActions.login,
  logout: UserActions.logout,
  register: UserActions.register,
};

export interface UserStoreState {
  username: string;
}

const userStoreIntialState: UserStoreState = {
  username: '',
};

export type UserStoreAction = ActionType<typeof actions>;

export const userReducer = (state = userStoreIntialState, action: UserStoreAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
