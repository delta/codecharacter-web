import { EditorSettingsActions } from 'app/actions';
import { EditorSettings } from 'app/components/code/EditorSettings';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    enableBasicAutoCompletion: rootState.editor.editorOptions.enableBasicAutoCompletion,
    enableSnippets: rootState.editor.editorOptions.enableSnippets,
    fontSize: rootState.editor.editorOptions.fontSize,
    theme: rootState.editor.editorOptions.theme,
  };
};

const editorSettingsContainer = connect<
  EditorSettings.StateProps,
  EditorSettings.DispatchProps,
  {}
>(
  mapStateToProps,
  {
    changeFontSize: EditorSettingsActions.changeFontSize,
    changeTheme: EditorSettingsActions.changeTheme,
    toggleBasicAutoCompletion: EditorSettingsActions.toggleBasicAutoCompletion,
    toggleSnippets: EditorSettingsActions.toggleSnippets,
  },
)(EditorSettings);

export default editorSettingsContainer;
