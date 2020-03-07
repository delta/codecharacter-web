import { NotificationActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  add: NotificationActions.add,
  deleteNotification: NotificationActions.deleteNotification,
  deleteNotificationType: NotificationActions.deleteNotificationType,
  error: NotificationActions.error,
  hideNotification: NotificationActions.hideNotification,
  hideNotificationType: NotificationActions.hideNotificationType,
  info: NotificationActions.info,
  resetNotificationState: NotificationActions.resetNotificationState,
  success: NotificationActions.success,
  updateGlobalAnnouncements: NotificationActions.updateGlobalAnnouncements,
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
  NOTIFICATIONS,
  ANNOUNCEMENTS,
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

export interface Announcement {
  adminUserId: number;
  date: Date;
  id: number;
  message: string;
}

export interface NotificationStoreState {
  announcements: Announcement[];
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
  announcements: Announcement[];
}

export interface DispatchProps {
  deleteNotification: (id: number) => void;
  deleteNotificationType: (type: NotificationTabType) => void;
  getAllGlobalNotifications: () => void;
  getAllGlobalAnnouncements: () => void;
  setIsRead: (notifications: Notification[]) => void;
}

export type Props = StateProps & DispatchProps;

export type NotificationStoreAction = ActionType<typeof actions>;
