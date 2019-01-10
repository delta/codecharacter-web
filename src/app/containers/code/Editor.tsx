import { EditorActions } from 'app/actions';
import { Editor } from 'app/components/code/Editor';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    basicAutoCompletion: rootState.editor.editorOptions.basicAutoCompletion,
    code: rootState.editor.code,
    fontSize: rootState.editor.editorOptions.fontSize,
    snippets: rootState.editor.editorOptions.snippets,
    theme: rootState.editor.editorOptions.theme,
  };
};

const editorContainer = connect<Editor.StateProps, Editor.DispatchProps, Editor.OwnProps>(
  mapStateToProps,
  {
    updateCode: EditorActions.updateCode,
  },
)(Editor);

export default editorContainer;
