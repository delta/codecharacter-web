import { Dashboard } from 'app/components/Dashboard';
import { RootState } from 'app/reducers';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as DashboardInterfaces from 'app/types/Dashboard';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    isLoggedIn: rootState.user.isLoggedIn,
    isUserProfileModalOpen: rootState.user.isUserProfileModalOpen,
    logFile: rootState.gameLog.gameLog,
    player1DebugLog: rootState.gameLog.player1DebugLog,
    player2DebugLog: rootState.gameLog.player2DebugLog,
    sidePanelOpen: rootState.dashboard.sidePanelTab !== SidePanelTab.NONE,
  };
};

const dashboardContainer = connect<DashboardInterfaces.StateProps, {}, {}>(mapStateToProps)(
  Dashboard,
);

export default dashboardContainer;
