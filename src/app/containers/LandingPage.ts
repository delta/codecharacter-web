import { LandingPage } from 'app/components/LandingPage';
import { RootState } from 'app/reducers';
import * as LandingPageInterfaces from 'app/types/LandingPage';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    isLoggedIn: rootState.user.isLoggedIn,
  };
};

const landingPageContainer = connect<LandingPageInterfaces.StateProps, {}, {}>(
  mapStateToProps,
  {},
)(LandingPage);

export default landingPageContainer;
