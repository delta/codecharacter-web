import { DashboardActions, UserActions } from 'app/actions';
import { Dashboard } from 'app/components/Dashboard';
import { RootState } from 'app/reducers';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as DashboardInterfaces from 'app/types/Dashboard';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    isAuthenticationOpen: rootState.user.isAuthenticationOpen,
    isLoggedIn: rootState.user.isLoggedIn,
    isUserProfileModalOpen: rootState.user.isUserProfileModalOpen,
    isWelcomeModalOpen: rootState.dashboard.isWelcomeModalOpen,
    logFile: rootState.gameLog.gameLog,
    player1DebugLog: rootState.gameLog.player1DebugLog,
    player2DebugLog: rootState.gameLog.player2DebugLog,
    sidePanelOpen: rootState.dashboard.sidePanelTab !== SidePanelTab.NONE,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeWelcomeModal: () => dispatch(DashboardActions.setIsWelcomeModalOpen(false)),
    setIsAuthenticationOpen: (isAuthenticationOpen: boolean) =>
      dispatch(UserActions.setIsAuthenticationOpen(isAuthenticationOpen)),
  };
};

const dashboardContainer = connect<
  DashboardInterfaces.StateProps,
  DashboardInterfaces.DispatchProps,
  {}
>(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default dashboardContainer;
