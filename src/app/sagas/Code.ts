/* tslint:disable:no-console*/
import { CodeActions } from 'app/actions';
import * as codeFetch from 'app/apiFetch/Code';
import { RootState } from 'app/reducers';
import { checkAuthentication } from 'app/sagas/utils';
import { resType } from 'app/types/sagas';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

export function* save(action: ActionType<typeof CodeActions.save>) {
  try {
    const code = yield select((state: RootState) => state.code.code);
    const res = yield call(codeFetch.saveCode, code);
    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.updateIsCodeSaved(true));
      yield put(CodeActions.getLastSaveTime());
    }
  } catch (err) {
    console.error(err);
  }
}

export function* commit(action: ActionType<typeof CodeActions.commit>) {
  try {
    const res = yield call(codeFetch.commitCode, action.payload.commitMessage);
    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.updateStatusMessage('Commit Saved!'));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* getLatestCode(action: ActionType<typeof CodeActions.getLatestCode>) {
  try {
    const res = yield call(codeFetch.getLatestCode);
    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.updateCode(res.code));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* getCommitLog(action: ActionType<typeof CodeActions.getCommitLog>) {
  try {
    const res = yield call(codeFetch.getCommitLog);
    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.updateCommitLog(res.log));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* checkoutCode(action: ActionType<typeof CodeActions.checkoutCode>) {
  try {
    const res = yield call(codeFetch.getCommitCode, action.payload.commitHash);
    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.updateCode(res.code));
      yield put(CodeActions.setCurrentCommitHash(action.payload.commitHash));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* forkCode(action: ActionType<typeof CodeActions.forkCode>) {
  try {
    const res = yield call(codeFetch.forkCode, action.payload.commitHash);
    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.setCurrentCommitHash('latest'));
      yield put(CodeActions.getLatestCode());
    }
  } catch (err) {
    console.error(err);
  }
}

export function* getLastSaveTime(action: ActionType<typeof CodeActions.getLastSaveTime>) {
  try {
    const res = yield call(codeFetch.getLastSaveTime);
    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.updateLastSaveTime(new Date(res.lastSavedAt)));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* codeSagas() {
  yield all([
    takeEvery(CodeActions.Type.SAVE, save),
    takeEvery(CodeActions.Type.COMMIT, commit),
    takeEvery(CodeActions.Type.GET_LATEST_CODE, getLatestCode),
    takeEvery(CodeActions.Type.GET_COMMIT_LOG, getCommitLog),
    takeEvery(CodeActions.Type.CHECKOUT_CODE, checkoutCode),
    takeEvery(CodeActions.Type.FORK_CODE, forkCode),
    takeEvery(CodeActions.Type.GET_LAST_SAVE_TIME, getLastSaveTime),
  ]);
}
