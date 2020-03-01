import { ProfileUserActions } from 'app/actions';
import ProfileUserStats from 'app/components/ProfileUserStats';
import { RootState } from 'app/reducers';
import * as ProfileUserInterfaces from 'app/types/ProfileUser';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    profileUserDetails: rootState.profileUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getMatchStats: (username: string) => dispatch(ProfileUserActions.getMatchStats(username)),
    getUserDetails: () => dispatch(ProfileUserActions.getUserDetails()),
    updateProfileUserDetails: (
      updateProfileUserDetails: ProfileUserInterfaces.EditProfileUserDetails,
    ) => dispatch(ProfileUserActions.updateProfileUserDetails(updateProfileUserDetails)),
  };
};

const profileUserContainer = connect<
  ProfileUserInterfaces.StateProps,
  ProfileUserInterfaces.DispatchProps,
  {}
>(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileUserStats);

export default profileUserContainer;
