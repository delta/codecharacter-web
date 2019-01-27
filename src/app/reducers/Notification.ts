import { NotificationActions } from 'app/actions';
import * as NotificationInterfaces from 'app/types/Notification';

// @ts-ignore
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/PNotifyBrightTheme.css';

const notificationInitialState: {} = {};

export const notificationReducer = (
  state = notificationInitialState,
  action: NotificationInterfaces.NotificationStoreAction,
) => {
  switch (action.type) {
    case NotificationActions.Type.INFO: {
      PNotify.info({
        text: action.payload.text,
        title: action.payload.title,
      });
      return state;
    }
    case NotificationActions.Type.SUCCESS: {
      PNotify.success({
        text: action.payload.text,
        title: action.payload.title,
      });
      return state;
    }
    case NotificationActions.Type.ERROR: {
      PNotify.error({
        text: action.payload.text,
        title: action.payload.title,
      });
      return state;
    }
    default:
      return state;
  }
};
