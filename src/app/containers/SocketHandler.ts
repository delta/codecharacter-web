import { GameLogActions, NotificationActions, SubmissionActions, UserActions } from 'app/actions';
import { SocketHandler } from 'app/components/SocketHandler';
import { RootState } from 'app/reducers';
import * as SubmissionInterfaces from 'app/types/code/Submission';
import * as NotificationInterfaces from 'app/types/Notification';
import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import { UserDetails } from 'app/types/User';
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
    add: (type: NotificationInterfaces.NotificationType, title: string, text: string) =>
      dispatch(NotificationActions.add(type, title, text)),
    clearAllLogs: () => GameLogActions.clearAllLogs(),
    clearDisplayDebugLog: () => GameLogActions.clearDisplayDebugLog(),
    deleteNotification: (id: number) => dispatch(NotificationActions.deleteNotification(id)),
    deleteNotificationType: (type: NotificationInterfaces.NotificationTabType) =>
      dispatch(NotificationActions.deleteNotificationType(type)),
    error: (message: string) => dispatch(NotificationActions.error(message)),
    getAllGlobalAnnouncements: () => dispatch(NotificationActions.getAllGlobalAnnouncements()),
    getAllGlobalNotifications: () => dispatch(NotificationActions.getAllGlobalNotifications()),
    getUnreadGlobalNotifications: () =>
      dispatch(NotificationActions.getUnreadGlobalNotifications()),
    hideNotification: (id: number) => dispatch(NotificationActions.hideNotification(id)),
    hideNotificationType: (type: NotificationInterfaces.NotificationTabType) =>
      dispatch(NotificationActions.hideNotificationType(type)),
    info: (message: string) => dispatch(NotificationActions.info(message)),
    logout: () => dispatch(UserActions.logout()),
    resetNotificationState: () => dispatch(NotificationActions.resetNotificationState()),
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
    updateUserDetails: (details: UserDetails) => dispatch(UserActions.updateUserDetails(details)),
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
