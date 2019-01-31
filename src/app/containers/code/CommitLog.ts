import { CodeActions } from 'app/actions/code/Code';
import { CommitLog } from 'app/components/code/CommitLog';
import { RootState } from 'app/reducers';
import * as CommitLogInterfaces from 'app/types/code/CommitLog';
import { connect } from 'react-redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    commitLog: rootState.code.commitLog,
    currentCommitHash: rootState.code.currentCommitHash,
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
    getCommitLog: CodeActions.getCommitLog,
  },
)(CommitLog);

export default commitLogContainer;
