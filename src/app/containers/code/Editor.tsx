import { EditorActions } from 'app/actions';
import { Editor } from 'app/components/code/Editor';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    code: rootState.editor.code,
  };
};

const editorContainer = connect<Editor.StateProps, Editor.DispatchProps, Editor.OwnProps>(
  mapStateToProps,
  {
    updateCode: EditorActions.updateCode,
  },
)(Editor);

export default editorContainer;
