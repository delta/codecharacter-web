import { NotificationActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  add: NotificationActions.add,
  deleteNotification: NotificationActions.deleteNotification,
  deleteNotificationType: NotificationActions.deleteNotificationType,
  error: NotificationActions.error,
  info: NotificationActions.info,
  success: NotificationActions.success,
};

export enum NotificationType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum NotificationTabType {
  ALL = 'ALL',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface Notification {
  id: number;
  title: string;
  text: string;
  type: NotificationType;
}

export interface NotificationStoreState {
  loading: boolean;
  notifications: Notification[];
}

export interface State {
  activeNotificationTab: NotificationTabType;
}

export interface StateProps {
  loading: boolean;
  notifications: Notification[];
}

export interface DispatchProps {
  deleteNotificationType: (type: NotificationTabType) => void;
}

export type Props = StateProps & DispatchProps;

export type NotificationStoreAction = ActionType<typeof actions>;
