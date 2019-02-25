import { NotificationTabType } from 'app/types/Notification';

export interface DispatchProps {
  message: string;
  type: NotificationTabType;
  createdAt: Date;
}

export type Props = DispatchProps;
