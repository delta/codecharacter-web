import { CodeActions, GameLogActions, SubmissionActions } from 'app/actions';
import { SubmitBar } from 'app/components/SubmitBar';
import { RootState } from 'app/reducers';
import { Request } from 'app/types/code/Submission';
import * as SubmitBarInterfaces from 'app/types/SubmitBar';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    aiIds: rootState.submission.aiIds,
    debugRunAvailable: rootState.submission.debugRunRequest !== Request.NONE,
    maps: rootState.submission.maps,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    aiMatch: (mapId: number, aiId: number) => dispatch(SubmissionActions.aiMatch(mapId, aiId)),
    clearLogs: () => {
      dispatch(GameLogActions.updateGameLog('', '', ''));
      dispatch(GameLogActions.clearDisplayDebugLog());
    },
    commit: (commitMessage: string) => dispatch(CodeActions.commit(commitMessage)),
    debugRun: () => dispatch(SubmissionActions.debugRun()),
    getAiIds: () => dispatch(SubmissionActions.getAiIds()),
    getCommitLog: () => dispatch(CodeActions.getCommitLog()),
    loadMaps: () => dispatch(SubmissionActions.loadMaps()),
    lockCode: () => dispatch(SubmissionActions.lockCode()),
    saveCode: () => dispatch(CodeActions.save()),
    selfMatch: (mapId: number) => dispatch(SubmissionActions.selfMatch(mapId)),
  };
};

const submitBarContainer = connect<
  SubmitBarInterfaces.StateProps,
  SubmitBarInterfaces.DispatchProps,
  {}
>(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitBar);

export default submitBarContainer;
