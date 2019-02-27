import { DashboardActions, UserActions } from 'app/actions';
import { Sidebar } from 'app/components/SideBar';
import { RootState } from 'app/reducers';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as SideBarInterfaces from 'app/types/SideBar';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    isLoggedIn: rootState.user.isLoggedIn,
    sidePanelTab: rootState.dashboard.sidePanelTab,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeSidePanelTab: () => dispatch(DashboardActions.setSidePanelTab(SidePanelTab.NONE)),
    logout: () => dispatch(UserActions.logout()),
    openSidePanelTab: (type: SidePanelTab) => dispatch(DashboardActions.setSidePanelTab(type)),
    resetAppState: () => dispatch(UserActions.resetAppState()),
    toggleUserProfileModal: (isUserProfileModalOpen: boolean) =>
      dispatch(UserActions.toggleUserProfileModal(isUserProfileModalOpen)),
  };
};
const sidebarContainer = connect<SideBarInterfaces.StateProps, SideBarInterfaces.DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

export default sidebarContainer;
