import { action } from 'typesafe-actions';

export namespace NotificationActions {
  export enum Type {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
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
}
