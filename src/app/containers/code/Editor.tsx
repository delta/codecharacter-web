import { CodeActions, NotificationActions } from 'app/actions';
import { Editor } from 'app/components/code/Editor';
import { RootState } from 'app/reducers';
import * as EditorInterfaces from 'app/types/code/Editor';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    code: rootState.code.code,
    enableBasicAutoCompletion: rootState.editor.editorOptions.enableBasicAutoCompletion,
    enableSnippets: rootState.editor.editorOptions.enableSnippets,
    fontSize: rootState.editor.editorOptions.fontSize,
    isLoggedIn: rootState.user.isLoggedIn,
    keyboardHandler: rootState.editor.editorOptions.keyboardHandler,
    theme: rootState.editor.editorOptions.theme,
    viewOnly: rootState.code.currentCommitHash !== 'latest',
  };
};

const editorContainer = connect<
  EditorInterfaces.StateProps,
  EditorInterfaces.DispatchProps,
  EditorInterfaces.OwnProps
>(mapStateToProps, {
  getLatestCode: CodeActions.getLatestCode,
  getUnreadGlobalNotifications: NotificationActions.getUnreadGlobalNotifications,
  save: CodeActions.save,
  updateCode: CodeActions.updateCode,
})(Editor);

export default editorContainer;
