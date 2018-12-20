import { EditorActions } from 'app/actions';
import { Editor } from 'app/components/code/Editor';
import { EditorStoreState } from 'app/reducers/code/Editor';
import { connect } from 'react-redux';

const mapStateToProps = (editorState: EditorStoreState) => {
  return {
    code: editorState.code,
  };
};

const editorContainer = connect<Editor.StateProps, Editor.DispatchProps, Editor.OwnProps>(
  mapStateToProps,
  {
    updateCode: EditorActions.updateCode,
  },
)(Editor);

export default editorContainer;
