import { UserActions } from 'app/actions';
import { ChangePassword } from 'app/components/Authentication/ChangePassword';
import { RootState } from 'app/reducers';
import { DispatchProps, StateProps } from 'app/types/Authentication/ChangePassword';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = (rootState: RootState) => {
  return {
    errorMessage: rootState.user.errorMessage,
  };
};

const componentWithRouter = withRouter(ChangePassword);

const changePasswordContainer = connect<StateProps, DispatchProps, {}>(mapStateToProps, {
  changePassword: UserActions.changeUserPassword,
})(componentWithRouter);

export default changePasswordContainer;
