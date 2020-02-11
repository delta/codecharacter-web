import { NotificationActions } from 'app/actions';
import * as NotificationInterfaces from 'app/types/Notification';

// @ts-ignore

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
      // addToast(action.payload.message, { appearance: 'info' });
      return state;
    }

    case NotificationActions.Type.SUCCESS: {
      // addToast(action.payload.message, { appearance: 'success' });
      return state;
    }

    case NotificationActions.Type.ERROR: {
      // addToast(action.payload.message, { appearance: 'error' });
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
