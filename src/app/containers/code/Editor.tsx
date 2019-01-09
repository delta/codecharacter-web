import { EditorActions } from 'app/actions';
import { Editor } from 'app/components/code/Editor';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    code: rootState.editor.code,
    fontSize: rootState.editor.editorOptions.fontSize,
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
