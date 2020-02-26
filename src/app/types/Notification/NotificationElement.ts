import { NotificationTabType } from 'app/types/Notification';

export interface StateProps {
  type: NotificationTabType;
  id: number;
  createdAt: Date;
  text: string;
  title: string;
}

export interface DispatchProps {
  deleteNotification: (id: number) => void;
}

export type Props = DispatchProps & StateProps;
