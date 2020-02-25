import { NotificationActions } from 'app/actions';
import { NotificationElement } from 'app/components/Notification/NotificationElement';
import { RootState } from 'app/reducers';
import * as NotificationElementInterfaces from 'app/types/Notification/NotificationElement';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {};
};

const notificationElementContainer = connect<{}, NotificationElementInterfaces.DispatchProps, {}>(
  mapStateToProps,
  {
    deleteNotification: NotificationActions.deleteNotification,
  },
)(NotificationElement);

export default notificationElementContainer;
