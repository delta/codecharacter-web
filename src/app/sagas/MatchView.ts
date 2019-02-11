import { MatchActions } from 'app/actions';
import * as MatchFetch from 'app/apiFetch/MatchView';
import { checkAuthentication } from 'app/sagas/utils';
import { resType } from 'app/types/sagas';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

export function* getMatches(action: ActionType<typeof MatchActions.getMatches>) {
  try {
    yield put(MatchActions.updateLoadingStatus(true));
    const res = yield call(MatchFetch.getMatches);
    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type === resType.ERROR) {
      yield put(MatchActions.updateError(res.error));
    } else {
      yield put(MatchActions.updateMatches(res.matches));
    }
  } catch (err) {
    throw err;
  }
}

export function* getTopMatches(action: ActionType<typeof MatchActions.getTopMatches>) {
  try {
    yield put(MatchActions.updateLoadingStatus(true));
    const res = yield call(MatchFetch.getTopMatches);

    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type === resType.ERROR) {
      yield put(MatchActions.updateError(res.error));
    } else {
      yield put(MatchActions.updateTopMatches(res.matches));
    }
  } catch (err) {
    throw err;
  }
}

export function* matchSagas() {
  yield all([
    takeEvery(MatchActions.Type.GET_MATCHES, getMatches),
    takeEvery(MatchActions.Type.GET_TOP_MATCHES, getTopMatches),
  ]);
}
