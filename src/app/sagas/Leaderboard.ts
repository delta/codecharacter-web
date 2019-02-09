import { LeaderboardActions } from 'app/actions';
import * as LeaderboardFetch from 'app/apiFetch/Leaderboard';
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

    if (result.type === resType.ERROR) {
      yield put(
        LeaderboardActions.updateLeaderboard(
          result.searchData,
          LeaderboardActions.updateType.APPEND,
        ),
      );
    }

    yield put(LeaderboardActions.updateLoadingStatus(false));
  } catch (err) {
    throw err;
  }
}

export function* leaderboardSagas() {
  yield all([takeEvery(LeaderboardActions.Type.GET_LEADERBOARD, getLeaderboard)]);
}
