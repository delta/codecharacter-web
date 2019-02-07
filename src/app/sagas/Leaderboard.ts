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

    // rank: number;
    // country: string;
    // username: string;
    // rating: number;
    // fullName: string;

    if (result.type === resType.ERROR) {
      yield put(
        LeaderboardActions.updateLeaderboard(
          // result.searchData,
          [
            {
              country: 'IN',
              fullName: 'FullName1',
              rank: 1,
              rating: 1,
              username: 'Username1',
            },
            {
              country: 'KE',
              fullName: 'FullName2',
              rank: 2,
              rating: 2,
              username: 'kenya',
            },
            {
              country: 'IN',
              fullName: 'FullName3',
              rank: 3,
              rating: 3,
              username: 'person2',
            },
          ],
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
