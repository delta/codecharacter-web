import { DashboardActions } from 'app/actions';
import { Sidebar } from 'app/components/code/SideBar';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    sidePanelTab: rootState.dashboard.sidePanelTab,
  };
};

const sidebarContainer = connect<Sidebar.StateProps, Sidebar.DispatchProps, {}>(
  mapStateToProps,
  {
    setSidePanelTab: DashboardActions.setSidePanelTab,
  },
)(Sidebar);

export default sidebarContainer;
