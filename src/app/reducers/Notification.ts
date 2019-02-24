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

const successNotifications = [
  {
    id: 1,
    text: 'Your recent match was a win',
    title: 'Success!',
    type: NotificationInterfaces.NotificationType.SUCCESS,
  },
  {
    id: 2,
    text: 'Your recent match was a win',
    title: 'Success!',
    type: NotificationInterfaces.NotificationType.SUCCESS,
  },
  {
    id: 3,
    text: 'Your recent match was a win',
    title: 'Success!',
    type: NotificationInterfaces.NotificationType.SUCCESS,
  },
];

const errorNotifications = [
  {
    id: 4,
    text: 'Game could not finish',
    title: 'Error!',
    type: NotificationInterfaces.NotificationType.ERROR,
  },
  {
    id: 5,
    text: 'Game could not finish',
    title: 'Error!',
    type: NotificationInterfaces.NotificationType.ERROR,
  },
  {
    id: 6,
    text: 'Game could not finish',
    title: 'Error!',
    type: NotificationInterfaces.NotificationType.ERROR,
  },
];

const infoNotifications = [
  {
    id: 7,
    text: 'You have moved up a postion in leaderboard',
    title: 'Info!',
    type: NotificationInterfaces.NotificationType.INFO,
  },
  {
    id: 8,
    text: 'You have moved up a postion in leaderboard',
    title: 'Info!',
    type: NotificationInterfaces.NotificationType.INFO,
  },
  {
    id: 9,
    text: 'You have moved up a postion in leaderboard',
    title: 'Info!',
    type: NotificationInterfaces.NotificationType.INFO,
  },
  {
    id: 10,
    text: 'You have moved up a postion in leaderboard',
    title: 'Info!',
    type: NotificationInterfaces.NotificationType.INFO,
  },
];

const notifications = [...successNotifications, ...errorNotifications, ...infoNotifications];

const notificationInitialState: NotificationInterfaces.NotificationStoreState = {
  notifications,
  loading: false,
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
    case NotificationActions.Type.RESET_NOTIFICATION_STATE: {
      return {
        ...notificationInitialState,
      };
    }
    default:
      return state;
  }
};
