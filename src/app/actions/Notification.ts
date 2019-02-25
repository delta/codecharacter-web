import { Notification, NotificationTabType, NotificationType } from 'app/types/Notification';
import { action } from 'typesafe-actions';

export namespace NotificationActions {
  export enum Type {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    ADD = 'ADD',
    DELETE_NOTIFICATION = 'DELETE_NOTIFICATION',
    DELETE_NOTIFICATION_TYPE = 'DELETE_NOTIFICATION_TYPE',
    RESET_NOTIFICATION_STATE = 'RESET_NOTIFICATION_STATE',
    GET_UNREAD_GLOBAL_NOTIFICATIONS = 'GET_GLOBAL_NOTIFICATIONS',
    GET_ALL_GLOBAL_NOTIFICATIONS = 'GET_ALL_GLOBAL_NOTIFICATIONS',
    UPDATE_GLOBAL_NOTIFICATIONS = 'UPDATE_GLOBAL_NOTIFICATIONS',
  }

  export const info = (message: string) =>
    action(Type.INFO, {
      message,
    });

  export const success = (message: string) =>
    action(Type.SUCCESS, {
      message,
    });

  export const error = (message: string) =>
    action(Type.ERROR, {
      message,
    });

  export const add = (type: NotificationType, title: string, text: string) =>
    action(Type.ADD, {
      text,
      title,
      type,
    });

  export const deleteNotificationType = (type: NotificationTabType) =>
    action(Type.DELETE_NOTIFICATION_TYPE, {
      type,
    });

  export const deleteNotification = (id: number) =>
    action(Type.DELETE_NOTIFICATION, {
      id,
    });

  export const resetNotificationState = () => action(Type.RESET_NOTIFICATION_STATE);

  export const getUnreadGlobalNotifications = () => action(Type.GET_UNREAD_GLOBAL_NOTIFICATIONS);

  export const getAllGlobalNotifications = () => action(Type.GET_ALL_GLOBAL_NOTIFICATIONS);

  export const updateGlobalNotifications = (notifications: Notification[]) =>
    action(Type.UPDATE_GLOBAL_NOTIFICATIONS, { notifications });
}
