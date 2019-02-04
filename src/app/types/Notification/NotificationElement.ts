import { Notification } from 'app/types/Notification';

export interface DispatchProps {
  deleteNotification: (id: number) => void;
}

export type Props = Notification & DispatchProps;
