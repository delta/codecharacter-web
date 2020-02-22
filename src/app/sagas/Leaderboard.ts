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
      pageNo: action.payload.pageNo,
      pageSize: action.payload.pageSize,
    });
    yield put(LeaderboardActions.updateError(result.error));
    if (result.type !== resType.ERROR) {
      yield put(
        LeaderboardActions.updateLeaderboard(result.body, LeaderboardActions.updateType.REPLACE),
      );
    }

    yield put(LeaderboardActions.updateLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
}

export function* getLeaderboardByDiv(
  action: ActionType<typeof LeaderboardActions.getLeaderboardByDiv>,
) {
  try {
    yield put(LeaderboardActions.updateLoadingStatus(true));
    const result = yield call(LeaderboardFetch.getLeaderboardByDiv, {
      div: action.payload.div,
      pageNo: action.payload.pageNo,
      pageSize: action.payload.pageSize,
    });
    yield put(LeaderboardActions.updateError(result.error));
    if (result.type !== resType.ERROR) {
      yield put(
        LeaderboardActions.updateLeaderboard(result.body, LeaderboardActions.updateType.REPLACE),
      );
    }

    yield put(LeaderboardActions.updateLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
}

export function* getLeaderboardByUserType(
  action: ActionType<typeof LeaderboardActions.getLeaderboardByUserType>,
) {
  try {
    yield put(LeaderboardActions.updateLoadingStatus(true));
    const result = yield call(LeaderboardFetch.getLeaderboardByUserType, {
      UserType: action.payload.userType,
      pageNo: action.payload.pageNo,
      pageSize: action.payload.pageSize,
    });
    yield put(LeaderboardActions.updateError(result.error));
    if (result.type !== resType.ERROR) {
      yield put(
        LeaderboardActions.updateLeaderboard(result.body, LeaderboardActions.updateType.REPLACE),
      );
    }

    yield put(LeaderboardActions.updateLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
}

export function* getLeaderboardLeaderboardByDivAndType(
  action: ActionType<typeof LeaderboardActions.getLeaderboardByDivAndType>,
) {
  try {
    yield put(LeaderboardActions.updateLoadingStatus(true));
    const result = yield call(LeaderboardFetch.getLeaderboardByDivAndType, {
      UserType: action.payload.userType,
      div: action.payload.div,
      pageNo: action.payload.pageNo,
      pageSize: action.payload.pageSize,
    });
    yield put(LeaderboardActions.updateError(result.error));
    if (result.type !== resType.ERROR) {
      yield put(
        LeaderboardActions.updateLeaderboard(result.body, LeaderboardActions.updateType.REPLACE),
      );
    }

    yield put(LeaderboardActions.updateLoadingStatus(false));
  } catch (err) {
    console.error(err);
  }
}

export function* getLeaderboardSearch(
  action: ActionType<typeof LeaderboardActions.getLeaderboardByUserName>,
) {
  try {
    yield put(LeaderboardActions.updateLoadingStatus(true));

    const result = yield call(LeaderboardFetch.getLeaderboardByUsername, {
      pageNo: action.payload.pageNo,
      pageSize: action.payload.pageSize,
      username: action.payload.username,
    });
    yield put(LeaderboardActions.updateError(result.okay));

    if (result.type !== resType.ERROR) {
      yield put(
        LeaderboardActions.updateLeaderboard(result.body, LeaderboardActions.updateType.REPLACE),
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
    takeEvery(LeaderboardActions.Type.GET_LEADERBOARD_BY_DIV, getLeaderboardByDiv),
    takeEvery(
      LeaderboardActions.Type.GET_LEADERBOARD_BY_DIV_AND_TYPE,
      getLeaderboardLeaderboardByDivAndType,
    ),
    takeEvery(LeaderboardActions.Type.GET_LEADERBOARD_BY_USERNAME, getLeaderboardSearch),
    takeEvery(LeaderboardActions.Type.GET_LEADERBOARD_BY_USER_TYPE, getLeaderboardByUserType),
    takeEvery(LeaderboardActions.Type.GET_TIMER, getTimerSaga),
    takeEvery(LeaderboardActions.Type.START_MATCH, runMatch),
  ]);
}
