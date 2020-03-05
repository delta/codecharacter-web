import { UserActions } from 'app/actions';
import * as UserInterfaces from 'app/types/User';

export enum ErrorMessage {
  FORBIDDEN = 'Forbidden',
  UNAUTHORISED = 'Unauthorised',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  METHOD_NOT_SUPPORTED = "Request method 'POST' not supported",
  NULL = '',
}

const userStoreIntialState: UserInterfaces.UserStoreState = {
  avatar: '',
  college: '',
  country: 'IN',
  email: '',
  errorMessage: '',
  fullName: '',
  isAuthenticationOpen: true,
  isFirstLogin: true,
  isLoggedIn: false,
  isLoginLoading: false,
  isUserProfileModalOpen: false,
  userId: 0,
  userType: UserInterfaces.UserType.STUDENT,
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
        userId,
        isUserProfileModalOpen,
        errorMessage,
        avatar,
        college,
        userType,
        isFirstLogin,
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
        isFirstLogin: isFirstLogin !== undefined ? isFirstLogin : state.isFirstLogin,
        isLoggedIn: isLoggedIn !== undefined ? isLoggedIn : state.isLoggedIn,
        isUserProfileModalOpen:
          isUserProfileModalOpen !== undefined
            ? isUserProfileModalOpen
            : state.isUserProfileModalOpen,
        userId: userId !== undefined ? userId : state.userId,
        userType: userType !== undefined ? userType : state.userType,
        username: username !== undefined ? username : state.username,
      };
    }

    case UserActions.Type.UPDATE_ERROR_MESSAGE: {
      let errorMessage = action.payload.errorMessage;
      switch (action.payload.errorMessage) {
        case ErrorMessage.FORBIDDEN:
        case ErrorMessage.UNAUTHORISED:
        case ErrorMessage.INTERNAL_SERVER_ERROR:
        case ErrorMessage.METHOD_NOT_SUPPORTED:
          errorMessage = ErrorMessage.NULL;
          break;
      }
      return {
        ...state,
        errorMessage: errorMessage ? errorMessage : '',
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
