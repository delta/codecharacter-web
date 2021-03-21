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
    currentLevel: rootState.user.currentLevel,
    currentStars: rootState.user.currentStars,
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
    commit: (commitMessage: string) => dispatch(CodeActions.commit(commitMessage)),
    debugRun: () => dispatch(SubmissionActions.debugRun()),
    getAiIds: () => dispatch(SubmissionActions.getAiIds()),
    getCommitLog: () => dispatch(CodeActions.getCommitLog()),
    getQuestStatus: () => dispatch(UserActions.getQuestStatus()),
    loadMaps: () => dispatch(SubmissionActions.loadMaps()),
    lockCode: () => dispatch(SubmissionActions.lockCode()),
    saveCode: () => dispatch(CodeActions.save()),
    selfMatch: (mapId: number) => dispatch(SubmissionActions.selfMatch(mapId)),
    setCurrentLevel: (level: number, stars: number) =>
      dispatch(UserActions.setCurrentLevel(level, stars)),
    toggleStoryModeModal: (level: number) => dispatch(UserActions.toggleStoryModeModal(level)),
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
