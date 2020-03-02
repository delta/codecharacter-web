import { UserActions } from 'app/actions';
import { ActivateUser } from 'app/components/Authentication/ActivateUser';
import { RootState } from 'app/reducers';
import { DispatchProps, StateProps } from 'app/types/Authentication/ActivateUser';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    message: rootState.user.errorMessage,
  };
};

const activateUserContainer = connect<StateProps, DispatchProps, {}>(mapStateToProps, {
  activateUser: UserActions.activateUser,
})(ActivateUser);

export default activateUserContainer;
