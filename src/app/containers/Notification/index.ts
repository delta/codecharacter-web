import { NotificationActions } from 'app/actions';
import { Notification } from 'app/components/Notification';
import { RootState } from 'app/reducers';
import * as NotificationInterfaces from 'app/types/Notification';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    announcements: rootState.notification.announcements,
    loading: rootState.notification.loading,
    notifications: rootState.notification.notifications,
  };
};

const notificationContainer = connect<
  NotificationInterfaces.StateProps,
  NotificationInterfaces.DispatchProps,
  {}
>(mapStateToProps, {
  deleteNotification: NotificationActions.deleteNotification,
  deleteNotificationType: NotificationActions.deleteNotificationType,
  getAllGlobalAnnouncements: NotificationActions.getAllGlobalAnnouncements,
  getAllGlobalNotifications: NotificationActions.getAllGlobalNotifications,
  setIsRead: NotificationActions.setIsRead,
})(Notification);

export default notificationContainer;
