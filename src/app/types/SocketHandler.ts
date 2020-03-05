import * as SubmissionInterfaces from 'app/types/code/Submission';
import * as NotificationInterfaces from 'app/types/Notification';

export interface DispatchProps {
  add: (type: NotificationInterfaces.NotificationType, title: string, text: string) => void;
  clearDisplayDebugLog: () => void;
  clearAllLogs: () => void;
  deleteNotification: (id: number) => void;
  deleteNotificationType: (type: NotificationInterfaces.NotificationTabType) => void;
  error: (message: string) => void;
  getAllGlobalAnnouncements: () => void;
  getAllGlobalNotifications: () => void;
  getUnreadGlobalNotifications: () => void;
  hideNotification: (id: number) => void;
  hideNotificationType: (type: NotificationInterfaces.NotificationTabType) => void;
  info: (message: string) => void;
  logout: () => void;
  resetNotificationState: () => void;
  sendExecuteError: (error: string) => void;
  sendExecuteSuccess: (logs: string) => void;
  sendCompileError: (error: string) => void;
  sendCompileSuccess: () => void;
  sendDebugRunError: () => void;
  sendDebugRunSuccess: (stackTrace: string) => void;
  sendError: (message: string) => void;
  sendInfo: (message: string) => void;
  sendSuccess: (message: string) => void;
  success: (message: string) => void;
  updateGameLog: (player1DebugLog: string, player2DebugLog: string, gameLog: string) => void;
  updateGlobalAnnouncements: (announcements: NotificationInterfaces.Announcement[]) => void;
  updateGlobalNotifications: (notifications: NotificationInterfaces.Notification[]) => void;
  updateMatchPlayerId: (matchPlayerId: number) => void;
  updateRequest: (request: SubmissionInterfaces.Request) => void;
}

export enum MatchMode {
  AUTO = 'AUTO',
  SELF = 'SELF',
  AI = 'AI',
  PREV_COMMIT = 'PREV_COMMIT',
  MANUAL = 'MANUAL',
}

export interface MatchDetails {
  mapId: number;
  matchMode: MatchMode;
  playerId1: number;
  playerId2: number;
}

export interface StateProps {
  announcements: NotificationInterfaces.Announcement[];
  commitHash: string;
  currentAiId: number;
  loading: boolean;
  notifications: NotificationInterfaces.Notification[];
  isNotificationPresent: boolean;
  isSocketPresent: boolean;
  mapId: number;
  playerId1: number;
  playerId2: number;
  request: SubmissionInterfaces.Request;
  socketMessage: string;
  userId: number;
}

export type Props = DispatchProps & StateProps;
