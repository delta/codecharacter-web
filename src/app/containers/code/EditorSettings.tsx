import { EditorSettingsActions } from 'app/actions';
import { EditorSettings } from 'app/components/code/EditorSettings';
import { RootState } from 'app/reducers';
import * as EditorSettingsInterfaces from 'app/types/code/EditorSettings';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    enableBasicAutoCompletion: rootState.editor.editorOptions.enableBasicAutoCompletion,
    enableSnippets: rootState.editor.editorOptions.enableSnippets,
    fontSize: rootState.editor.editorOptions.fontSize,
    keyboardHandler: rootState.editor.editorOptions.keyboardHandler,
    theme: rootState.editor.editorOptions.theme,
  };
};

const editorSettingsContainer = connect<
  EditorSettingsInterfaces.StateProps,
  EditorSettingsInterfaces.DispatchProps,
  {}
>(
  mapStateToProps,
  {
    changeFontSize: EditorSettingsActions.changeFontSize,
    changeKeyboardHandler: EditorSettingsActions.changeKeyboardHandler,
    changeTheme: EditorSettingsActions.changeTheme,
    toggleBasicAutoCompletion: EditorSettingsActions.toggleBasicAutoCompletion,
    toggleSnippets: EditorSettingsActions.toggleSnippets,
  },
)(EditorSettings);

export default editorSettingsContainer;
