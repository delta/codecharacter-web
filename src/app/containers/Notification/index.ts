import { NotificationActions } from 'app/actions';
import { Notification } from 'app/components/Notification';
import { RootState } from 'app/reducers';
import * as NotificationInterfaces from 'app/types/Notification';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    loading: rootState.notification.loading,
    notifications: rootState.notification.notifications,
  };
};

const notificationContainer = connect<
  NotificationInterfaces.StateProps,
  NotificationInterfaces.DispatchProps,
  {}
>(
  mapStateToProps,
  {
    deleteNotificationType: NotificationActions.deleteNotificationType,
    getAllGlobalNotifications: NotificationActions.getAllGlobalNotifications,
  },
)(Notification);

export default notificationContainer;
