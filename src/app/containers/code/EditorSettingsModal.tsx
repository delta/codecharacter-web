import { EditorActions } from 'app/actions';
import { EditorSettingsModal } from 'app/components/code/EditorSettingsModal';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    fontSize: rootState.editor.editorOptions.fontSize,
    showCustomizationModal: rootState.editor.showCustomizationPanel,
    theme: rootState.editor.editorOptions.theme,
  };
};

const editorSettingsModalContainer = connect<
  EditorSettingsModal.StateProps,
  EditorSettingsModal.DispatchProps,
  {}
>(
  mapStateToProps,
  {
    changeFontSize: EditorActions.changeFontSize,
    changeTheme: EditorActions.changeTheme,
    toggleCustomizationPanel: EditorActions.toggleCustomizationPanel,
  },
)(EditorSettingsModal);

export default editorSettingsModalContainer;
