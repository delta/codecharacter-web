import { NotificationTabType, NotificationType } from 'app/types/Notification';
import { action } from 'typesafe-actions';

export namespace NotificationActions {
  export enum Type {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    ADD = 'ADD',
    DELETE_NOTIFICATION = 'DELETE_NOTIFICATION',
    DELETE_NOTIFICATION_TYPE = 'DELETE_NOTIFICATION_TYPE',
  }

  export const info = (title: string, text: string) =>
    action(Type.INFO, {
      text,
      title,
    });

  export const success = (title: string, text: string) =>
    action(Type.SUCCESS, {
      text,
      title,
    });

  export const error = (title: string, text: string) =>
    action(Type.ERROR, {
      text,
      title,
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
}
