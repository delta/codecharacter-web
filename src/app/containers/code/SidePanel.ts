import { DashboardActions } from 'app/actions';
import { SidePanel } from 'app/components/code/SidePanel';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    sidePanelTab: rootState.dashboard.sidePanelTab,
  };
};

const sidePanelContainer = connect<SidePanel.StateProps, {}, SidePanel.OwnProps>(
  mapStateToProps,
  {
    setSidePanelTab: DashboardActions.setSidePanelTab,
  },
)(SidePanel);

export default sidePanelContainer;
