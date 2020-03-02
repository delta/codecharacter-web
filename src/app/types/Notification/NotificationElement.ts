import { NotificationTabType } from 'app/types/Notification';

export interface StateProps {
  type: NotificationTabType;
  id: number;
  createdAt: Date;
  content: string;
  title: string;
}

export interface OwnProps {
  deleteNotification: (id: number) => void;
}

export type Props = OwnProps & StateProps;
