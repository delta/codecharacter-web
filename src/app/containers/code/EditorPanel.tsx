import { DashboardActions } from 'app/actions';
import { EditorPanel } from 'app/components/code/EditorPanel';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    sidePanelTab: rootState.dashboard.sidePanelTab,
  };
};

const editorPanelContainer = connect<EditorPanel.StateProps, EditorPanel.DispatchProps, {}>(
  mapStateToProps,
  {
    setSidePanelTab: DashboardActions.setSidePanelTab,
  },
)(EditorPanel);

export default editorPanelContainer;
