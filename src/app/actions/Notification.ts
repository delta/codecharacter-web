import * as NotificationInterfaces from 'app/types/Notification';
import { action } from 'typesafe-actions';

export namespace NotificationActions {
  export enum Type {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    ADD = 'ADD',
    HIDE_NOTIFICATION = 'HIDE_NOTIFICATION',
    HIDE_NOTIFICATION_TYPE = 'HIDE_NOTIFICATION_TYPE',
    DELETE_NOTIFICATION = 'DELETE_NOTIFICATION',
    DELETE_NOTIFICATION_TYPE = 'DELETE_NOTIFICATION_TYPE',
    RESET_NOTIFICATION_STATE = 'RESET_NOTIFICATION_STATE',
    UPDATE_GLOBAL_NOTIFICATIONS = 'UPDATE_GLOBAL_NOTIFICATIONS',
    GET_ALL_GLOBAL_NOTIFICATIONS = 'GET_ALL_GLOBAL_NOTIFICATIONS',
    GET_UNREAD_GLOBAL_NOTIFICATIONS = 'GET_GLOBAL_NOTIFICATIONS',
    GET_ALL_GLOBAL_ANNOUNCEMENTS = 'GET_ALL_GLOBAL_ANNOUNCEMENTS',
    UPDATE_GLOBAL_ANNOUNCEMENTS = 'UPDATE_GLOBAL_ANNOUNCEMENTS',
    SET_IS_READ = 'SET_IS_READ',
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

  export const add = (type: NotificationInterfaces.NotificationType, title: string, text: string) =>
    action(Type.ADD, {
      text,
      title,
      type,
    });

  export const deleteNotificationType = (type: NotificationInterfaces.NotificationTabType) =>
    action(Type.DELETE_NOTIFICATION_TYPE, {
      type,
    });

  export const hideNotification = (id: number) =>
    action(Type.HIDE_NOTIFICATION, {
      id,
    });

  export const hideNotificationType = (type: NotificationInterfaces.NotificationTabType) =>
    action(Type.HIDE_NOTIFICATION_TYPE, {
      type,
    });

  export const resetNotificationState = () => action(Type.RESET_NOTIFICATION_STATE);

  export const getUnreadGlobalNotifications = () => action(Type.GET_UNREAD_GLOBAL_NOTIFICATIONS);

  export const getAllGlobalNotifications = () => action(Type.GET_ALL_GLOBAL_NOTIFICATIONS);

  export const updateGlobalNotifications = (notifications: NotificationInterfaces.Notification[]) =>
    action(Type.UPDATE_GLOBAL_NOTIFICATIONS, { notifications });

  export const setIsRead = (notifications: NotificationInterfaces.Notification[]) =>
    action(Type.SET_IS_READ, { notifications });

  export const deleteNotification = (id: number) => {
    return action(Type.DELETE_NOTIFICATION, { id });
  };

  export const getAllGlobalAnnouncements = () => action(Type.GET_ALL_GLOBAL_ANNOUNCEMENTS);

  export const updateGlobalAnnouncements = (announcements: NotificationInterfaces.Announcement[]) =>
    action(Type.UPDATE_GLOBAL_ANNOUNCEMENTS, { announcements });
}
