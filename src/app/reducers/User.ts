import { UserActions } from 'app/actions';
import * as UserInterfaces from 'app/types/User';

const userStoreIntialState: UserInterfaces.UserStoreState = {
  avatar: '',
  college: '',
  country: 'IN',
  email: '',
  errorMessage: '',
  fullName: '',
  isAuthenticationOpen: true,
  isLoggedIn: false,
  isLoginLoading: false,
  isUserProfileModalOpen: false,
  type: '',
  username: '',
};

export const userReducer = (
  state = userStoreIntialState,
  action: UserInterfaces.UserStoreAction,
) => {
  switch (action.type) {
    case UserActions.Type.UPDATE_USER_DETAILS: {
      const {
        country,
        email,
        isLoggedIn,
        username,
        fullName,
        isUserProfileModalOpen,
        errorMessage,
        avatar,
        type,
        college,
      } = action.payload.userDetails;

      let isAuthenticationOpen = state.isAuthenticationOpen;

      if (!isLoggedIn && state.isLoggedIn) {
        isAuthenticationOpen = true;
      }

      if (isLoggedIn && !state.isLoggedIn) {
        isAuthenticationOpen = false;
      }

      return {
        ...state,
        isAuthenticationOpen,
        avatar: avatar !== undefined ? avatar : state.avatar,
        college: college !== undefined ? college : state.college,
        country: country !== undefined ? country : state.country,
        email: email !== undefined ? email : state.email,
        errorMessage: errorMessage !== undefined ? errorMessage : state.errorMessage,
        fullName: fullName !== undefined ? fullName : state.fullName,
        isLoggedIn: isLoggedIn !== undefined ? isLoggedIn : state.isLoggedIn,
        isUserProfileModalOpen:
          isUserProfileModalOpen !== undefined
            ? isUserProfileModalOpen
            : state.isUserProfileModalOpen,
        type: type !== undefined ? type : state.type,
        username: username !== undefined ? username : state.username,
      };
    }

    case UserActions.Type.UPDATE_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage ? action.payload.errorMessage : '',
      };
    }
    case UserActions.Type.TOGGLE_USER_PROFILE_MODAL: {
      return {
        ...state,
        isUserProfileModalOpen: action.payload.isUserProfileModalOpen,
      };
    }
    case UserActions.Type.SET_IS_AUTHENTICATION_OPEN: {
      return {
        ...state,
        isAuthenticationOpen: action.payload.isAuthenticationOpen,
      };
    }
    case UserActions.Type.SET_IS_LOGIN_LOADING: {
      return {
        ...state,
        isLoginLoading: action.payload.isLoginLoading,
      };
    }
    case UserActions.Type.RESET_USER_STATE: {
      return {
        ...userStoreIntialState,
      };
    }
    default:
      return state;
  }
};
