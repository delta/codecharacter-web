import { EditorSettingsActions } from 'app/actions';
import { EditorSettings } from 'app/components/code/EditorSettings';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    basicAutoCompletion: rootState.editor.editorOptions.basicAutoCompletion,
    fontSize: rootState.editor.editorOptions.fontSize,
    snippets: rootState.editor.editorOptions.snippets,
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
    enableAutoCompletion: EditorSettingsActions.enableAutoCompletion,
    enableSnippets: EditorSettingsActions.enableSnippets,
  },
)(EditorSettings);

export default editorSettingsContainer;
