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

    case NotificationActions.Type.DELETE_NOTIFICATION_TYPE: {
      const updatedNotifications =
        action.payload.type === NotificationInterfaces.NotificationTabType.ALL
          ? []
          : state.notifications.filter(
              // @ts-ignore
              (notification) => notification.type !== action.payload.type,
            );
      return {
        ...state,
        notifications: updatedNotifications,
      };
    }

    case NotificationActions.Type.DELETE_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload.id,
        ),
      };
    }
    case NotificationActions.Type.UPDATE_GLOBAL_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload.notifications,
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
