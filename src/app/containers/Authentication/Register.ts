import { UserActions } from 'app/actions';
import { Register } from 'app/components/Authentication/Register';
import { RootState } from 'app/reducers';
import * as RegisterInterfaces from 'app/types/Authentication/Register';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    errorMessage: rootState.user.errorMessage,
  };
};

const registerContainer = connect<
  RegisterInterfaces.StateProps,
  RegisterInterfaces.DispatchProps,
  {}
>(mapStateToProps, {
  checkUsernameExists: UserActions.checkUsernameExists,
  register: UserActions.register,
  updateErrorMessage: UserActions.updateErrorMessage,
})(Register);

export default registerContainer;
