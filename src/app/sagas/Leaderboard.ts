/* tslint:disable:no-console*/
import { LeaderboardActions } from 'app/actions';
import * as LeaderboardFetch from 'app/apiFetch/Leaderboard';
import * as SimulationFetch from 'app/apiFetch/Simulation';
import { checkAuthentication } from 'app/sagas/utils';
import { resType } from 'app/types/sagas';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

export function* getLeaderboard(action: ActionType<typeof LeaderboardActions.getLeaderboard>) {
  try {
    yield put(LeaderboardActions.updateLoadingStatus(true));

    const result = yield call(LeaderboardFetch.getLeaderboard, {
      end: action.payload.end,
      pattern: action.payload.pattern === '' ? '*' : action.payload.pattern,
      start: action.payload.start,
    });
    yield put(LeaderboardActions.updateError(result.error));

    if (result.type !== resType.ERROR) {
      yield put(
        LeaderboardActions.updateLeaderboard(
          result.searchData,
          LeaderboardActions.updateType.APPEND,
        ),
      );
    }

    yield put(LeaderboardActions.updateLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
}

export function* getTimerSaga(action: ActionType<typeof LeaderboardActions.getTimer>) {
  try {
    const result = yield call(LeaderboardFetch.getTimer);

    if (result.type === resType.ERROR) {
      yield put(LeaderboardActions.setTimer(0));
    } else {
      yield put(LeaderboardActions.setTimer(result.timer));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* runMatch(action: ActionType<typeof LeaderboardActions.runMatch>) {
  try {
    const result = yield call(SimulationFetch.runMatch, {
      opponentId: action.payload.opponentId,
    });
    const isAuthenticated = yield checkAuthentication(result);
    if (isAuthenticated === false) return;

    if (result.type === resType.ERROR) {
      return;
    }

    yield put(LeaderboardActions.getTimer());
  } catch (err) {
    console.error(err);
  }
}

export function* leaderboardSagas() {
  yield all([
    takeEvery(LeaderboardActions.Type.GET_LEADERBOARD, getLeaderboard),
    takeEvery(LeaderboardActions.Type.GET_TIMER, getTimerSaga),
    takeEvery(LeaderboardActions.Type.START_MATCH, runMatch),
  ]);
}
