import { EditorActions } from 'app/actions';
import { Editor } from 'app/components/code/Editor';
import { RootState } from 'app/reducers';
import * as EditorInterfaces from 'app/types/code/Editor';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    code: rootState.editor.code,
    enableBasicAutoCompletion: rootState.editor.editorOptions.enableBasicAutoCompletion,
    enableSnippets: rootState.editor.editorOptions.enableSnippets,
    fontSize: rootState.editor.editorOptions.fontSize,
    theme: rootState.editor.editorOptions.theme,
  };
};

const editorContainer = connect<
  EditorInterfaces.StateProps,
  EditorInterfaces.DispatchProps,
  EditorInterfaces.OwnProps
>(
  mapStateToProps,
  {
    updateCode: EditorActions.updateCode,
  },
)(Editor);

export default editorContainer;
