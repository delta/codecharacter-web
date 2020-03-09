import { UserActions } from 'app/actions';
import { SocketNotification } from 'app/components/SocketNotification';
import { RootState } from 'app/reducers';
import * as SocketNotificationInterfaces from 'app/types/SocketNotification';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    isNotificationPresent: rootState.user.isNotificationPresent,
    isSocketPresent: rootState.user.isSocketPresent,
    notification: rootState.user.notification,
    socketMessage: rootState.user.socketMessage,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggleIsNotificationPresent: () => dispatch(UserActions.toggleIsNotificationPresent()),
    toggleIsSocketPresent: () => dispatch(UserActions.toggleIsSocketPresent()),
    updateNotification: (notification: string) =>
      dispatch(UserActions.updateNotification(notification)),
    updateSocketMessage: (message: string) => dispatch(UserActions.updateSocketMessage(message)),
  };
};

const socketNotificationContainer = connect<
  SocketNotificationInterfaces.StateProps,
  SocketNotificationInterfaces.DispatchProps,
  {}
>(
  mapStateToProps,
  mapDispatchToProps,
)(SocketNotification);

export default socketNotificationContainer;
