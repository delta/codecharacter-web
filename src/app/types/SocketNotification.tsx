export interface DispatchProps {
  toggleIsNotificationPresent: () => void;
  toggleIsSocketPresent: () => void;
  updateNotification: (notification: string) => void;
  updateSocketMessage: (message: string) => void;
}

export interface StateProps {
  isNotificationPresent: boolean;
  isSocketPresent: boolean;
  notification: string;
  socketMessage: string;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Props = DispatchProps & StateProps;
