import { CodeActions, GameLogActions, SubmissionActions, UserActions } from 'app/actions';
import { SubmitBar } from 'app/components/SubmitBar';
import { RootState } from 'app/reducers';
import * as SubmissionInterfaces from 'app/types/code/Submission';
import * as SubmitBarInterfaces from 'app/types/SubmitBar';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    aiIds: rootState.submission.aiIds,
    current_level: rootState.user.current_level,
    current_stars: rootState.user.current_stars,
    debugRunAvailable: rootState.submission.debugRunRequest !== SubmissionInterfaces.Request.NONE,
    isStoryModeModalOpen: rootState.user.isStoryModeModalOpen,
    maps: rootState.submission.maps,
    ratings: rootState.user.ratings,
    storyModeModalLevel: rootState.user.storyModeModalLevel,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    aiMatch: (mapId: number, aiId: number) => dispatch(SubmissionActions.aiMatch(mapId, aiId)),
    changeCurrentRequest: (currentRequest: SubmissionInterfaces.Request) =>
      dispatch(SubmissionActions.changeCurrentRequest(currentRequest)),
    clearLogs: () => {
      dispatch(GameLogActions.updateGameLog('', '', ''));
      dispatch(GameLogActions.clearDisplayDebugLog());
    },
    closeStoryModeModal: () => dispatch(UserActions.closeStoryModeModal()),
    commit: (commitMessage: string) => dispatch(CodeActions.commit(commitMessage)),
    debugRun: () => dispatch(SubmissionActions.debugRun()),
    getAiIds: () => dispatch(SubmissionActions.getAiIds()),
    getCommitLog: () => dispatch(CodeActions.getCommitLog()),
    getQuestStatus: () => dispatch(UserActions.getQuestStatus()),
    loadMaps: () => dispatch(SubmissionActions.loadMaps()),
    lockCode: () => dispatch(SubmissionActions.lockCode()),
    openStoryModeModal: (level: number) => dispatch(UserActions.openStoryModeModal(level)),
    saveCode: () => dispatch(CodeActions.save()),
    selfMatch: (mapId: number) => dispatch(SubmissionActions.selfMatch(mapId)),
    setCurrentLevel: (level: number, stars: number) =>
      dispatch(UserActions.setCurrentLevel(level, stars)),
    updateCurrentAiId: (aiId: number) => dispatch(SubmissionActions.updateCurrentAiId(aiId)),
    updateMapId: (mapId: number) => dispatch(SubmissionActions.updateMapId(mapId)),
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
