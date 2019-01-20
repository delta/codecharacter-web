import { Dashboard } from 'app/components/Dashboard';
import { RootState } from 'app/reducers';
import { SidePanelTab } from 'app/reducers/Dashboard';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    sidePanelOpen: rootState.dashboard.sidePanelTab !== SidePanelTab.NONE,
  };
};

const dashboardContainer = connect<Dashboard.StateProps, {}, {}>(mapStateToProps)(Dashboard);

export default dashboardContainer;
