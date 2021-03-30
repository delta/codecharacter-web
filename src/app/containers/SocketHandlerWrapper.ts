import { SocketHandlerWrapper } from 'app/components/SocketHandlerWrapper';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    isLoggedIn: rootState.user.isLoggedIn,
  };
};

const socketHandlerWrapperContainer = connect(mapStateToProps)(SocketHandlerWrapper);

export default socketHandlerWrapperContainer;
