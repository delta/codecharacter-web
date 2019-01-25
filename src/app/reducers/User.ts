import { UserActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

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

const userStoreIntialState: UserStoreState = {
  country: 'IN',
  email: '',
  errorMessage: '',
  isLoggedIn: false,
  username: '',
};

export type UserStoreAction = ActionType<typeof actions>;

export const userReducer = (state = userStoreIntialState, action: UserStoreAction) => {
  switch (action.type) {
    case UserActions.Type.UPDATE_USER_DETAILS: {
      const { country, email, isLoggedIn, username } = action.payload.userDetails;
      return {
        country: country ? country : state.country,
        email: email ? email : state.email,
        isLoggedIn: isLoggedIn ? isLoggedIn : state.isLoggedIn,
        username: username ? username : state.username,
        ...state,
      };
    }

    case UserActions.Type.UPDATE_ERROR_MESSAGE: {
      return {
        errorMessage: action.payload.errorMessage ? action.payload.errorMessage : '',
        ...state,
      };
    }

    default:
      return state;
  }
};
