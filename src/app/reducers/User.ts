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
  currentLevel: 1,
  currentStars: 0,
  email: '',
  errorMessage: '',
  fullName: '',
  isAuthenticationOpen: true,
  isFirstLogin: true,
  isLoggedIn: false,
  isLoginLoading: false,
  isNotificationPresent: false,
  isSocketPresent: false,
  isStoryModeModalOpen: false,
  isUserProfileModalOpen: false,
  notification: '',
  ratings: [{ level: 1, stars: 0 }],
  socketMessage: '',
  storyModeModalLevel: 0,
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
    case UserActions.Type.TOGGLE_IS_SOCKET_PRESENT: {
      return {
        ...state,
        isSocketPresent: !state.isSocketPresent,
      };
    }
    case UserActions.Type.TOGGLE_IS_NOTIFICATION_PRESENT: {
      return {
        ...state,
        isNotificationPresent: !state.isNotificationPresent,
      };
    }
    case UserActions.Type.TOGGLE_STORY_MODE_MODAL: {
      return {
        ...state,
        isStoryModeModalOpen: !state.isStoryModeModalOpen,
        storyModeModalLevel: action.payload.level,
      };
    }
    case UserActions.Type.UPDATE_SOCKET_MESSAGE: {
      return {
        ...state,
        socketMessage: action.payload.socketMessage,
      };
    }
    case UserActions.Type.UPDATE_NOTIFICATION: {
      return {
        ...state,
        notification: action.payload.notification,
      };
    }

    case UserActions.Type.RESET_USER_STATE: {
      return {
        ...userStoreIntialState,
      };
    }

    case UserActions.Type.UPDATE_USER_QUESTSTATUS: {
      return {
        ...state,
        ratings: action.payload.ratings,
      };
    }

    case UserActions.Type.SET_CURRENT_LEVEL: {
      return {
        ...state,
        currentLevel: action.payload.level,
        currentStars: action.payload.stars,
      };
    }

    default:
      return state;
  }
};
