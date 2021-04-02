import { NotFound } from 'app/components/NotFound';
import { RootState } from 'app/reducers';
import * as NotFoundPageInterfaces from 'app/types/NotFound';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    isLoggedIn: rootState.user.isLoggedIn,
  };
};

const notFoundContainer = connect<NotFoundPageInterfaces.StateProps, {}, {}>(
  mapStateToProps,
  {},
)(NotFound);

export default notFoundContainer;
