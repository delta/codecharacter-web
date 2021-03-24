import { UserActions } from 'app/actions';
import { Login } from 'app/components/Authentication/Login';
import { RootState } from 'app/reducers';
import * as LoginInterfaces from 'app/types/Authentication/Login';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    errorMessage: rootState.user.errorMessage,
    isLoggedIn: rootState.user.isLoggedIn,
    isLoginLoading: rootState.user.isLoginLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getUserDetails: () => dispatch(UserActions.getUserDetails()),
    login: (email: string, password: string) => dispatch(UserActions.login(email, password)),
    setIsLoginLoading: (isLoginLoading: boolean) =>
      dispatch(UserActions.setIsLoginLoading(isLoginLoading)),
    updateErrorMessage: (errorMessage: string) =>
      dispatch(UserActions.updateErrorMessage(errorMessage)),
  };
};

const loginContainer = connect<LoginInterfaces.StateProps, LoginInterfaces.DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default loginContainer;
