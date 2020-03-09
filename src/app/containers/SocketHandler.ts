import { NotificationActions, SubmissionActions } from 'app/actions';
import { SocketHandler } from 'app/components/SocketHandler';
import { RootState } from 'app/reducers';
import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (rootState: RootState) => {
  return {
    announcements: rootState.notification.announcements,
    commitHash: rootState.submission.commitHash,
    currentAiId: rootState.submission.currentAiId,
    isCodeLocked: rootState.submission.isCodeLocked,
    isNotificationPresent: rootState.user.isNotificationPresent,
    isSocketPresent: rootState.user.isSocketPresent,
    loading: rootState.notification.loading,
    mapId: rootState.submission.mapId,
    notifications: rootState.notification.notifications,
    playerId1: rootState.submission.playerId1,
    playerId2: rootState.submission.playerId2,
    request: rootState.submission.request,
    socketMessage: rootState.user.socketMessage,
    userId: rootState.user.userId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    clearAllLogs: () => GameLogActions.clearAllLogs(),
    clearDisplayDebugLog: () => GameLogActions.clearDisplayDebugLog(),
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
    success: (message: string) => dispatch(NotificationActions.success(message)),
    toggleLockCode: () => dispatch(SubmissionActions.toggleLockCode()),
    updateDisplayDebugLog: (log: string) => dispatch(GameLogActions.updateDisplayDebugLog(log)),
    updateGameLog: (player1DebugLog: string, player2DebugLog: string, gameLog: string) =>
      dispatch(GameLogActions.updateGameLog(player1DebugLog, player2DebugLog, gameLog)),
    updateGlobalAnnouncements: (announcements: NotificationInterfaces.Announcement[]) =>
      dispatch(NotificationActions.updateGlobalAnnouncements(announcements)),
    updateGlobalNotifications: (notifications: NotificationInterfaces.Notification[]) =>
      dispatch(NotificationActions.updateGlobalNotifications(notifications)),
    updateMatchPlayerId: (matchPlayerId: number) =>
      dispatch(GameLogActions.updateMatchPlayerId(matchPlayerId)),
    updateRequest: (request: SubmissionInterfaces.Request) =>
      dispatch(SubmissionActions.changeCurrentRequest(request)),
  };
};

const socketHandlerContainer = connect<{}, SocketHandlerInterfaces.DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(SocketHandler);

export default socketHandlerContainer;
