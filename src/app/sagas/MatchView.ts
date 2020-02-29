/* tslint:disable:no-console*/
import { GameLogActions, MatchActions, NotificationActions } from 'app/actions';
import * as MatchFetch from 'app/apiFetch/MatchView';
import { checkAuthentication, mapMatchResponse } from 'app/sagas/utils';
import { resType } from 'app/types/sagas';
import { all, call, put, takeEvery } from 'redux-saga/effects';
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
      const matchData = mapMatchResponse(res);

      yield put(MatchActions.updateMatches(matchData));
    } else yield put(NotificationActions.error(res.message));
  } catch (err) {
    console.error('get matches err');
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
      const matchData = mapMatchResponse(res);

      yield put(MatchActions.updateTopMatches(matchData));
    } else yield put(NotificationActions.error(res.message));
  } catch (err) {
    console.error('top mat err');
    console.error(err);
  }
}

export function* getGameLogs(action: ActionType<typeof MatchActions.getGameLogs>) {
  try {
    const res = yield call(MatchFetch.getGameLogs, action.payload.gameId);

    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type === resType.ERROR) {
      yield put(MatchActions.updateError(res.error));
    } else {
      yield put(GameLogActions.setHideDebugLog(true));
      yield put(GameLogActions.clearDisplayDebugLog());

      const logs = res.logs;
      const debugLog1 = logs.player1Log;
      const debugLog2 = logs.player2Log;
      const gameLog = logs.gameLog;
      const matchPlayerId = logs.matchPlayerId;

      yield put(GameLogActions.updateGameLog('', '', ''));
      yield put(GameLogActions.updateGameLog(debugLog1, debugLog2, gameLog));
      yield put(GameLogActions.updateMatchPlayerId(matchPlayerId));
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
