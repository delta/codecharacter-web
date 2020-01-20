import { UserActions } from 'app/actions';
/* tslint:disable-next-line:import-name */
import Login from 'app/components/Authentication/Log';
import { RootState } from 'app/reducers';
import * as LoginInterfaces from 'app/types/Authentication/Login';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    errorMessage: rootState.user.errorMessage,
    isLoggedIn: rootState.user.isLoggedIn,
    isLoginLoading: rootState.user.isLoginLoading,
  };
};

const loginContainer = connect<LoginInterfaces.StateProps, LoginInterfaces.DispatchProps, {}>(
  mapStateToProps,
  {
    login: UserActions.login,
    updateErrorMessage: UserActions.updateErrorMessage,
  },
)(Login);

export default loginContainer;
