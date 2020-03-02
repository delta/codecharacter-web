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
    const notifications = res.body;
    yield put(NotificationActions.updateGlobalNotifications(notifications));
  } catch (err) {
    throw err;
  }
}

export function* getAllGlobalAnnouncements(
  action: ActionType<typeof NotificationActions.getAllGlobalAnnouncements>,
) {
  try {
    const res = yield call(NotificationFetch.getAllGlobalAnnouncements);
    const announcements = res.body;
    yield put(NotificationActions.updateGlobalAnnouncements(announcements));
  } catch (err) {
    throw err;
  }
}

export function* deleteNotificationFromBackend(
  action: ActionType<typeof NotificationActions.deleteNotification>,
) {
  try {
    yield call(NotificationFetch.deleteGlobalNotifications, action.payload.id);
    yield put(NotificationActions.hideNotification(action.payload.id));
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
    takeEvery(NotificationActions.Type.DELETE_NOTIFICATION, deleteNotificationFromBackend),
    takeEvery(NotificationActions.Type.GET_ALL_GLOBAL_ANNOUNCEMENTS, getAllGlobalAnnouncements),
  ]);
}
