import { EditorActions } from 'app/actions';
import { EditorSettings } from 'app/components/code/EditorSettings';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    basicAutoCompletion: rootState.editor.editorOptions.basicAutoCompletion,
    fontSize: rootState.editor.editorOptions.fontSize,
    sidePanelTab: rootState.dashboard.sidePanelTab,
    snippets: rootState.editor.editorOptions.snippets,
    theme: rootState.editor.editorOptions.theme,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeFontSize: (fontSize: number) => dispatch(EditorActions.changeFontSize(fontSize)),
    changeTheme: (theme: string) => dispatch(EditorActions.changeTheme(theme)),
    enableAutoCompletion: (basicAutoCompletion: boolean) => dispatch(EditorActions.enableAutoCompletion(basicAutoCompletion)),
    enableSnippets: (snippets: boolean) => dispatch(EditorActions.enableSnippets(snippets)),
  }
}

const editorSettingsContainer = connect<
  EditorSettings.StateProps,
  EditorSettings.DispatchProps,
  EditorSettings.OwnProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(EditorSettings);

export default editorSettingsContainer;
