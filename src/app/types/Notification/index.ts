import { NotificationActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  add: NotificationActions.add,
  deleteNotification: NotificationActions.deleteNotification,
  deleteNotificationType: NotificationActions.deleteNotificationType,
  error: NotificationActions.error,
  info: NotificationActions.info,
  resetNotificationState: NotificationActions.resetNotificationState,
  success: NotificationActions.success,
  updateGlobalNotifications: NotificationActions.updateGlobalNotifications,
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

export enum TabType {
  NOTIFICATIONS = 0,
  ANNOUNCEMENTS = 1,
}

export interface Notification {
  id: number;
  isRead: boolean;
  content: string;
  createdAt: Date;
  message: string;
  userId: number;
  type: NotificationTabType;
  title: string;
}

export interface NotificationStoreState {
  notifications: Notification[];
  loading: boolean;
}

export interface State {
  activeNotificationTab: NotificationTabType;
  tabType: TabType;
}

export interface StateProps {
  loading: boolean;
  notifications: Notification[];
}

export interface DispatchProps {
  deleteNotificationType: (type: NotificationTabType) => void;
  getAllGlobalNotifications: () => void;
}

export type Props = StateProps & DispatchProps;

export type NotificationStoreAction = ActionType<typeof actions>;
