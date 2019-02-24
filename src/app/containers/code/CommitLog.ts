import { CodeActions, SubmissionActions } from 'app/actions';
import { CommitLog } from 'app/components/code/CommitLog';
import { RootState } from 'app/reducers';
import * as CommitLogInterfaces from 'app/types/code/CommitLog';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    commitLog: rootState.code.commitLog,
    currentCommitHash: rootState.code.currentCommitHash,
    maps: rootState.submission.maps,
  };
};

const commitLogContainer = connect<
  CommitLogInterfaces.StateProps,
  CommitLogInterfaces.DispatchProps,
  {}
>(
  mapStateToProps,
  {
    checkoutCode: CodeActions.checkoutCode,
    forkCode: CodeActions.forkCode,
    getCommitLog: CodeActions.getCommitLog,
    loadMaps: SubmissionActions.loadMaps,
    startPreviousCommitMatch: SubmissionActions.previousCommitMatch,
  },
)(CommitLog);

export default commitLogContainer;
