import LandingPage from 'app/components/LandingPage';
import { RootState } from 'app/reducers';
import * as LandingPageInterfaces from 'app/types/LandingPage';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

const landingPageContainer = connect<
  LandingPageInterfaces.StateProps,
  LandingPageInterfaces.DispatchProps,
  {}
>(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);

export default landingPageContainer;
