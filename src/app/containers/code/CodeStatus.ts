import { CodeStatus } from 'app/components/code/CodeStatus';
import { RootState } from 'app/reducers';
import * as CodeStatusInterfaces from 'app/types/code/CodeStatus';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    currentCommitHash: rootState.code.currentCommitHash,
    isCodeSaved: rootState.code.isCodeSaved,
    lastSaveTime: rootState.code.lastSaveTime,
  };
};

const codeStatusContainer = connect<
  CodeStatusInterfaces.StateProps,
  {},
  CodeStatusInterfaces.OwnProps
>(
  mapStateToProps,
  {},
)(CodeStatus);

export default codeStatusContainer;
