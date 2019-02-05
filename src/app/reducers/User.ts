import { UserActions } from 'app/actions';
import * as UserInterfaces from 'app/types/User';

const userStoreIntialState: UserInterfaces.UserStoreState = {
  country: 'IN',
  email: '',
  errorMessage: '',
  isLoggedIn: false,
  username: '',
};

export const userReducer = (
  state = userStoreIntialState,
  action: UserInterfaces.UserStoreAction,
) => {
  switch (action.type) {
    case UserActions.Type.UPDATE_USER_DETAILS: {
      const { country, email, isLoggedIn, username } = action.payload.userDetails;
      return {
        ...state,
        country: country !== undefined ? country : state.country,
        email: email !== undefined ? email : state.email,
        isLoggedIn: isLoggedIn !== undefined ? isLoggedIn : state.isLoggedIn,
        username: username !== undefined ? username : state.username,
      };
    }

    case UserActions.Type.UPDATE_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage ? action.payload.errorMessage : '',
      };
    }

    default:
      return state;
  }
};
