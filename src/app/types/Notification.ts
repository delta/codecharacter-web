import { NotificationActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  error: NotificationActions.error,
  info: NotificationActions.info,
  success: NotificationActions.success,
};

export type NotificationStoreAction = ActionType<typeof actions>;
