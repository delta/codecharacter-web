import { GameLogActions, NotificationActions, SubmissionActions } from 'app/actions';
import { SocketHandler } from 'app/components/SocketHandler';
import { RootState } from 'app/reducers';
import * as SubmissionInterfaces from 'app/types/code/Submission';
import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    commitHash: rootState.submission.commitHash,
    currentAiId: rootState.submission.currentAiId,
    mapId: rootState.submission.mapId,
    playerId1: rootState.submission.playerId1,
    playerId2: rootState.submission.playerId2,
    request: rootState.submission.request,
    userId: rootState.user.userId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    sendCompileError: (error: string) => dispatch(SubmissionActions.handleCompileError(error)),
    sendCompileSuccess: () => dispatch(SubmissionActions.handleCompileSuccess()),
    sendDebugRunError: () => dispatch(SubmissionActions.handleDebugRunError()),
    sendDebugRunSuccess: (stackTrace: string) =>
      dispatch(SubmissionActions.handleDebugRunSuccess(stackTrace)),
    sendError: (message: string) => dispatch(NotificationActions.error(message)),
    sendExecuteError: (error: string) => dispatch(SubmissionActions.handleExecuteError(error)),
    sendExecuteSuccess: (logs: string) => dispatch(SubmissionActions.handleExecuteSuccess(logs)),
    sendInfo: (message: string) => dispatch(NotificationActions.info(message)),
    sendSuccess: (message: string) => dispatch(NotificationActions.success(message)),
    updateGameLog: (player1DebugLog: string, player2DebugLog: string, gameLog: string) =>
      dispatch(GameLogActions.updateGameLog(player1DebugLog, player2DebugLog, gameLog)),
    updateMatchPlayerId: (matchPlayerId: number) =>
      dispatch(GameLogActions.updateMatchPlayerId(matchPlayerId)),
    updateRequest: (request: SubmissionInterfaces.Request) =>
      dispatch(SubmissionActions.changeCurrentRequest(request)),
  };
};

const socketHandlerContainer = connect<
  SocketHandlerInterfaces.StateProps,
  SocketHandlerInterfaces.DispatchProps,
  {}
>(
  mapStateToProps,
  mapDispatchToProps,
)(SocketHandler);

export default socketHandlerContainer;
