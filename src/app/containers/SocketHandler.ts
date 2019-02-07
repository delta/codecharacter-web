import { NotificationActions } from 'app/actions';
import { SocketHandler } from 'app/components/SocketHandler';
import { RootState } from 'app/reducers';
import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    sendError: (message: string) => dispatch(NotificationActions.error(message)),
    sendInfo: (message: string) => dispatch(NotificationActions.info(message)),
    sendSuccess: (message: string) => dispatch(NotificationActions.success(message)),
  };
};

const socketHandlerContainer = connect<{}, SocketHandlerInterfaces.DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(SocketHandler);

export default socketHandlerContainer;
