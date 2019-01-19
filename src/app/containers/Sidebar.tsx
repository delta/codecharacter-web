import { DashboardActions } from 'app/actions';
import { Sidebar } from 'app/components/SideBar';
import { RootState } from 'app/reducers';
import { SidePanelTab } from 'app/reducers/Dashboard';
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
    openSidePanelTab: () =>
      dispatch(DashboardActions.setSidePanelTab(SidePanelTab.EDITOR_SETTINGS)),
  };
};
const sidebarContainer = connect<Sidebar.StateProps, Sidebar.DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

export default sidebarContainer;
