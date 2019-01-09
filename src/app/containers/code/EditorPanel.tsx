import { EditorActions } from 'app/actions';
import { EditorPanel } from 'app/components/code/EditorPanel';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    showCustomizationPanel: rootState.editor.showCustomizationPanel,
  };
};

const editorPanelContainer = connect<EditorPanel.StateProps, EditorPanel.DispatchProps, {}>(
  mapStateToProps,
  {
    toggleCustomizationPanel: EditorActions.toggleCustomizationPanel,
  },
)(EditorPanel);

export default editorPanelContainer;
