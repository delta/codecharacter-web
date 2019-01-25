import { DashboardActions } from 'app/actions';
import { Sidebar } from 'app/components/SideBar';
import { RootState } from 'app/reducers';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as SideBarInterfaces from 'app/types/SideBar';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    sidePanelTab: rootState.dashboard.sidePanelTab,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeSidePanelTab: () => dispatch(DashboardActions.setSidePanelTab(SidePanelTab.NONE)),
    openEditorSettings: () =>
      dispatch(DashboardActions.setSidePanelTab(SidePanelTab.EDITOR_SETTINGS)),
    openLeaderboard: () => dispatch(DashboardActions.setSidePanelTab(SidePanelTab.LEADERBOARD)),
  };
};
const sidebarContainer = connect<SideBarInterfaces.StateProps, SideBarInterfaces.DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

export default sidebarContainer;
