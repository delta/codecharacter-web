import { NotificationActions } from 'app/actions';
import * as NotificationFetch from 'app/apiFetch/Notification';
import { checkAuthentication } from 'app/sagas/utils';
import { Notification } from 'app/types/Notification';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

export function* getUnreadGlobalNotifications(
  action: ActionType<typeof NotificationActions.getUnreadGlobalNotifications>,
) {
  try {
    const res = yield call(NotificationFetch.getUnreadNotifications);

    const isAuthenticated = yield checkAuthentication(res);

    if (isAuthenticated === false) {
      return;
    }

    const notifications = res.notifications;

    notifications.forEach((notification: Notification) => {
      NotificationActions.info(notification.message);
    });

    for (const notification of notifications) {
      yield call(NotificationFetch.deleteGlobalNotifications, notification.id);
    }
  } catch (err) {
    throw err;
  }
}

export function* getAllGlobalNotifications(
  action: ActionType<typeof NotificationActions.getAllGlobalNotifications>,
) {
  try {
    const res = yield call(NotificationFetch.getAllGlobalNotifications);

    const isAuthenticated = yield checkAuthentication(res);

    if (isAuthenticated === false) {
      return;
    }

    const notifications = res.notifications;

    yield put(NotificationActions.updateGlobalNotifications(notifications));
  } catch (err) {
    throw err;
  }
}

export function* notificationSagas() {
  yield all([
    takeEvery(
      NotificationActions.Type.GET_UNREAD_GLOBAL_NOTIFICATIONS,
      getUnreadGlobalNotifications,
    ),
    takeEvery(NotificationActions.Type.GET_ALL_GLOBAL_NOTIFICATIONS, getAllGlobalNotifications),
  ]);
}
