import { UserActions } from 'app/actions';
import { Login } from 'app/components/Authentication/Login';
import * as LoginInterfaces from 'app/types/Authentication/Login';
import { connect } from 'react-redux';

const loginContainer = connect<LoginInterfaces.Props, LoginInterfaces.DispatchProps, {}>(
  null,
  {
    login: UserActions.login,
  },
)(Login);

export default loginContainer;
