import { CodeActions } from 'app/actions';
import * as codeFetch from 'app/apiFetch/Code';
import { RootState } from 'app/reducers';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

enum resType {
  ERROR = 'Error',
  SUCCESS = 'Success',
}

export function* save(action: ActionType<typeof CodeActions.save>) {
  try {
    const code = yield select((state: RootState) => state.code.code);
    const res = yield call(codeFetch.saveCode, code);

    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.updateStatusMessage('Saved!'));
    }
  } catch (err) {
    throw err;
  }
}

export function* commit(action: ActionType<typeof CodeActions.commit>) {
  try {
    const res = yield call(codeFetch.commitCode, action.payload.commitMessage);

    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.updateStatusMessage('Commit Saved!'));
    }
  } catch (err) {
    throw err;
  }
}

export function* getLatestCode(action: ActionType<typeof CodeActions.getLatestCode>) {
  try {
    const res = yield call(codeFetch.getLatestCode);
    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.updateCode(res.code));
    }
  } catch (err) {
    throw err;
  }
}

export function* getCommitLog(action: ActionType<typeof CodeActions.getCommitLog>) {
  try {
    const res = yield call(codeFetch.getCommitLog);
    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.updateCommitLog(res.log));
    }
  } catch (err) {
    throw err;
  }
}

export function* checkoutCode(action: ActionType<typeof CodeActions.checkoutCode>) {
  try {
    const res = yield call(codeFetch.getCommitCode, action.payload.commitHash);
    if (res.type === resType.ERROR) {
      yield put(CodeActions.updateStatusMessage(res.error));
    } else {
      yield put(CodeActions.updateCode(res.code));
      yield put(CodeActions.setCurrentCommitHash(action.payload.commitHash));
    }
  } catch (err) {
    throw err;
  }
}

export function* codeSagas() {
  yield all([
    takeEvery(CodeActions.Type.SAVE, save),
    takeEvery(CodeActions.Type.COMMIT, commit),
    takeEvery(CodeActions.Type.GET_LATEST_CODE, getLatestCode),
    takeEvery(CodeActions.Type.GET_COMMIT_LOG, getCommitLog),
    takeEvery(CodeActions.Type.CHECKOUT_CODE, checkoutCode),
  ]);
}
