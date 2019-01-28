import { Authentication } from 'app/components/Authentication';
import { RootState } from 'app/reducers';
import * as AuthenticationInterfaces from 'app/types/Authentication/';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    isLoggedIn: rootState.user.isLoggedIn,
  };
};

const authenticationContainer = connect<AuthenticationInterfaces.Props, {}, {}>(mapStateToProps)(
  Authentication,
);

export default authenticationContainer;
