import { UserActions } from 'app/actions';
import { UserProfileModal } from 'app/components/UserProfileModal';
import { RootState } from 'app/reducers';
import * as UserProfileInterfaces from 'app/types/UserProfileModal';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    isLoggedIn: rootState.user.isLoggedIn,
    isUserProfileModalOpen: rootState.user.isUserProfileModalOpen,
    userDetails: { ...rootState.user },
  };
};

const userProfileModalContainer = connect<
  UserProfileInterfaces.StateProps,
  UserProfileInterfaces.DispatchProps,
  {}
>(mapStateToProps, {
  checkEmailExists: UserActions.checkEmailExists,
  checkUsernameExists: UserActions.checkUsernameExists,
  editUserPassword: UserActions.editUserPassword,
  editUserProfile: UserActions.editUserProfile,
  getUserDetails: UserActions.getUserDetails,
  toggleUserProfileModal: UserActions.toggleUserProfileModal,
})(UserProfileModal);

export default userProfileModalContainer;
