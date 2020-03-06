/* tslint:disable:no-console*/
import { GameLogActions, MatchActions, NotificationActions } from 'app/actions';
import * as MatchFetch from 'app/apiFetch/MatchView';
import { RootState } from 'app/reducers';
import { checkAuthentication, mapMatchResponse } from 'app/sagas/utils';
import { resType } from 'app/types/sagas';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { isArray } from 'util';

export function* getMatches(action: ActionType<typeof MatchActions.getMatches>) {
  try {
    yield put(MatchActions.updateMatches([]));
    yield put(MatchActions.updateLoadingStatus(true));
    const res = yield call(MatchFetch.getMatches, action.payload.pageNo, action.payload.pageSize);
    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (isArray(res)) {
      const username = yield select((state: RootState) => state.user.username);
      const matchData = mapMatchResponse(res, username);
      yield put(MatchActions.updateMatches(matchData));
    } else yield put(NotificationActions.error(res.message));
  } catch (err) {
    console.error(err);
  }
}

export function* getTopMatches(action: ActionType<typeof MatchActions.getTopMatches>) {
  try {
    yield put(MatchActions.updateTopMatches([]));
    yield put(MatchActions.updateLoadingStatus(true));
    const res = yield call(
      MatchFetch.getTopMatches,
      action.payload.pageNo,
      action.payload.pageSize,
    );

    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (isArray(res)) {
      const username = yield select((state: RootState) => state.user.username);
      const matchData = mapMatchResponse(res, username);
      yield put(MatchActions.updateTopMatches(matchData));
    } else yield put(NotificationActions.error(res.message));
  } catch (err) {
    console.error(err);
  }
}

export function* getGameLogs(action: ActionType<typeof MatchActions.getGameLogs>) {
  try {
    const res = yield call(MatchFetch.getGameLogs, action.payload.gameId);

    if (res.type === resType.ERROR) {
      yield put(MatchActions.updateError(res.error));
    } else {
      yield put(GameLogActions.setHideDebugLog(true));
      yield put(GameLogActions.clearDisplayDebugLog());

      const userId = yield select((state: RootState) => state.user.userId);

      const logs = res.body;
      const debugLog1 = Buffer.from(logs.player1Log, 'base64');
      const debugLog2 = Buffer.from(logs.player2Log, 'base64');
      const gameLog = Buffer.from(logs.gameLog, 'base64');
      const playerId1 = logs.playerId1;
      yield put(GameLogActions.clearAllLogs());
      yield put(GameLogActions.updateGameLog('', '', ''));
      // @ts-ignore
      yield put(GameLogActions.updateGameLog(debugLog1, debugLog2, gameLog));
      yield put(GameLogActions.updateMatchPlayerId(userId === playerId1 ? 1 : 2));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* matchSagas() {
  yield all([
    takeEvery(MatchActions.Type.GET_MATCHES, getMatches),
    takeEvery(MatchActions.Type.GET_TOP_MATCHES, getTopMatches),
    takeEvery(MatchActions.Type.GET_GAME_LOGS, getGameLogs),
  ]);
}
