import { UserActions } from 'app/actions';
import { ActivateUser } from 'app/components/Authentication/ActivateUser';
import { RootState } from 'app/reducers';
import { DispatchProps, StateProps } from 'app/types/Authentication/ActivateUser';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = (rootState: RootState) => {
  return {
    message: rootState.user.errorMessage,
  };
};

const componentWithRoute = withRouter(ActivateUser);

const activateUserContainer = connect<StateProps, DispatchProps, {}>(mapStateToProps, {
  activateUser: UserActions.activateUser,
})(componentWithRoute);

export default activateUserContainer;
