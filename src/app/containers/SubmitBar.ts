import { CodeActions, SubmissionActions } from 'app/actions';
import { SubmitBar } from 'app/components/SubmitBar';
import { RootState } from 'app/reducers';
import * as SubmitBarInterfaces from 'app/types/SubmitBar';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    aiIds: rootState.submission.aiIds,
    maps: rootState.submission.maps,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    aiMatch: (mapId: number, aiId: number) => dispatch(SubmissionActions.aiMatch(mapId, aiId)),
    commit: (commitMessage: string) => dispatch(CodeActions.commit(commitMessage)),
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
