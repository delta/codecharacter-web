import { NotificationActions } from 'app/actions';
import * as NotificationInterfaces from 'app/types/Notification';

// @ts-ignore
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/PNotifyBrightTheme.css';

const stackBottomRight = {
  ...PNotify.defaultStack,
  dir1: 'up',
  dir2: 'left',
};

const pnotifyOptions = (title: string) => {
  return {
    title,
    addclass: 'stack-bottomright',
    buttons: {
      closer: true,
      sticker: true,
    },
    delay: 5000,
    stack: stackBottomRight,
    text: false,
  };
};

const notificationInitialState: NotificationInterfaces.NotificationStoreState = {
  announcements: [],
  loading: false,
  notifications: [],
};

export const notificationReducer = (
  state = notificationInitialState,
  action: NotificationInterfaces.NotificationStoreAction,
) => {
  switch (action.type) {
    case NotificationActions.Type.INFO: {
      PNotify.info(pnotifyOptions(action.payload.message));
      return state;
    }

    case NotificationActions.Type.SUCCESS: {
      PNotify.success(pnotifyOptions(action.payload.message));
      return state;
    }

    case NotificationActions.Type.ERROR: {
      PNotify.error(pnotifyOptions(action.payload.message));
      return state;
    }

    case NotificationActions.Type.HIDE_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload.id,
        ),
      };
    }

    case NotificationActions.Type.HIDE_NOTIFICATION_TYPE: {
      return {
        ...state,
        notifications:
          action.payload.type === NotificationInterfaces.NotificationTabType.ALL
            ? []
            : state.notifications.filter(
                (notification) => notification.type !== action.payload.type,
              ),
      };
    }

    case NotificationActions.Type.UPDATE_GLOBAL_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload.notifications,
      };
    }
    case NotificationActions.Type.UPDATE_GLOBAL_ANNOUNCEMENTS: {
      return {
        ...state,
        announcements: action.payload.announcements,
      };
    }

    case NotificationActions.Type.RESET_NOTIFICATION_STATE: {
      return {
        ...notificationInitialState,
      };
    }
    default:
      return state;
  }
};
