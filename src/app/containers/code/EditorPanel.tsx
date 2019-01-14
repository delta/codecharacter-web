import { DashboardActions } from 'app/actions';
import { EditorPanel } from 'app/components/code/EditorPanel';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    showEditorSettingsPanel: rootState.dashboard.showEditorSettingsPanel,
  };
};

const editorPanelContainer = connect<EditorPanel.StateProps, EditorPanel.DispatchProps, {}>(
  mapStateToProps,
  {
    toggleEditorSettingsPanel: DashboardActions.toggleEditorSettingsPanel,
  },
)(EditorPanel);

export default editorPanelContainer;
