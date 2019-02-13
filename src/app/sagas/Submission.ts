import { CodeActions, SubmissionActions } from 'app/actions';
import * as SubmissionFetch from 'app/apiFetch/Submission';
import { RootState } from 'app/reducers';
import { Request, RequestState } from 'app/types/code/Submission';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import * as zlib from 'zlib';

export const getSubmissionState = (state: RootState) => state.submission;

export function* lockCode(action: ActionType<typeof SubmissionActions.lockCode>) {
  try {
    const submissionState = yield select(getSubmissionState);

    if (submissionState.request !== Request.NONE) return;

    yield put(
      SubmissionActions.changeStateCurrentRequest(
        RequestState.COMPILE_CURRENT_CODE,
        Request.LOCK_CODE,
      ),
    );
  } catch (err) {
    throw err;
  }
}

export function* previousCommitMatch(
  action: ActionType<typeof SubmissionActions.previousCommitMatch>,
) {
  try {
    const submissionState = yield select(getSubmissionState);

    if (submissionState.request !== Request.NONE) return;

    yield put(
      SubmissionActions.changeStateCurrentRequest(
        RequestState.COMPILE_PREVIOUS_COMMIT_CODE,
        Request.LOCK_CODE,
        action.payload.commitHash,
        action.payload.mapId,
      ),
    );
  } catch (err) {
    throw err;
  }
}

export function* selfMatch(action: ActionType<typeof SubmissionActions.selfMatch>) {
  try {
    const submissionState = yield select(getSubmissionState);

    if (submissionState.request !== Request.NONE) return;

    yield put(
      SubmissionActions.changeStateCurrentRequest(
        RequestState.COMPILE_CURRENT_CODE,
        Request.SELF_MATCH,
        'latest',
        action.payload.mapId,
      ),
    );
  } catch (err) {
    throw err;
  }
}

export function* changeStateCurrentRequest(
  action: ActionType<typeof SubmissionActions.changeStateCurrentRequest>,
) {
  try {
    const submissionState = yield select(getSubmissionState);
    const currentState = action.payload.state;
    const currentRequest = action.payload.currentRequest;

    yield put(SubmissionActions.changeCurrentRequest(currentRequest));
    yield put(SubmissionActions.changeState(currentState));

    if (
      (currentRequest === Request.PREVIOUS_COMMIT_MATCH &&
        currentState === RequestState.COMPILE_PREVIOUS_COMMIT_CODE) ||
      (currentRequest === Request.SELF_MATCH && currentState === RequestState.COMPILE_CURRENT_CODE)
    ) {
      yield put(SubmissionActions.updateMapId(action.payload.mapId));
    }

    switch (currentState) {
      case RequestState.COMPILE_CURRENT_CODE: {
        yield call(SubmissionFetch.codeCompile);
        break;
      }
      case RequestState.COMPILE_PREVIOUS_COMMIT_CODE: {
        yield call(SubmissionFetch.codeCompile, action.payload.commitHash);
        break;
      }
      case RequestState.EXECUTE_SELF_MATCH: {
        yield call(SubmissionFetch.executeSelfMatch, submissionState.mapId);
        break;
      }
      case RequestState.EXECUTE_PREVIOUS_COMMIT_MATCH: {
        yield call(SubmissionFetch.executePreviousCommitMatch, submissionState.mapId);
        break;
      }
    }
  } catch (err) {
    throw err;
  }
}

export function* handleCompileSuccess(
  action: ActionType<typeof SubmissionActions.handleCompileSuccess>,
) {
  try {
    const submissionState = yield select(getSubmissionState);
    const currentRequest = submissionState.request;
    const currentState = submissionState.state;

    if (
      currentRequest === Request.NONE ||
      (currentRequest === Request.LOCK_CODE &&
        currentState !== RequestState.COMPILE_CURRENT_CODE) ||
      (currentRequest === Request.PREVIOUS_COMMIT_MATCH &&
        (currentState !== RequestState.COMPILE_CURRENT_CODE ||
          currentState !== RequestState.COMPILE_PREVIOUS_COMMIT_CODE)) ||
      (currentRequest === Request.SELF_MATCH && currentState !== RequestState.COMPILE_CURRENT_CODE)
    ) {
      return;
    }

    switch (currentState) {
      case RequestState.COMPILE_PREVIOUS_COMMIT_CODE: {
        yield put(
          SubmissionActions.changeStateCurrentRequest(
            RequestState.COMPILE_CURRENT_CODE,
            currentRequest,
          ),
        );
        break;
      }

      case RequestState.COMPILE_CURRENT_CODE: {
        switch (currentRequest) {
          case Request.SELF_MATCH: {
            yield put(
              SubmissionActions.changeStateCurrentRequest(
                RequestState.EXECUTE_SELF_MATCH,
                currentRequest,
              ),
            );
            break;
          }
          case Request.PREVIOUS_COMMIT_MATCH: {
            yield put(
              SubmissionActions.changeStateCurrentRequest(
                RequestState.EXECUTE_PREVIOUS_COMMIT_MATCH,
                currentRequest,
              ),
            );
            break;
          }
          case Request.LOCK_CODE: {
            yield call(SubmissionFetch.lockCode);
            yield put(SubmissionActions.changeStateCurrentRequest(RequestState.IDLE, Request.NONE));
            break;
          }
        }
        break;
      }
    }
  } catch (err) {
    throw err;
  }
}

export function* handleCompileError(
  action: ActionType<typeof SubmissionActions.handleCompileError>,
) {
  try {
    const submissionState = yield select(getSubmissionState);
    const currentRequest = submissionState.request;
    const currentState = submissionState.state;

    if (
      currentRequest === Request.NONE ||
      (currentRequest === Request.LOCK_CODE &&
        currentState !== RequestState.COMPILE_CURRENT_CODE) ||
      (currentRequest === Request.PREVIOUS_COMMIT_MATCH &&
        (currentState !== RequestState.COMPILE_CURRENT_CODE ||
          currentState !== RequestState.COMPILE_PREVIOUS_COMMIT_CODE)) ||
      (currentRequest === Request.SELF_MATCH && currentState !== RequestState.COMPILE_CURRENT_CODE)
    ) {
      return;
    }

    yield put(SubmissionActions.changeStateCurrentRequest(RequestState.IDLE, Request.NONE));
  } catch (err) {
    throw err;
  }
}

export function* handleExecuteSuccess(
  action: ActionType<typeof SubmissionActions.handleExecuteSuccess>,
) {
  try {
    const submissionState = yield select(getSubmissionState);
    const currentRequest = submissionState.request;
    const currentState = submissionState.state;

    if (
      currentRequest === Request.NONE ||
      currentRequest === Request.LOCK_CODE ||
      (currentRequest === Request.PREVIOUS_COMMIT_MATCH &&
        currentState !== RequestState.EXECUTE_PREVIOUS_COMMIT_MATCH) ||
      (currentRequest === Request.SELF_MATCH && currentState !== RequestState.EXECUTE_SELF_MATCH)
    ) {
      return;
    }

    const logs = JSON.parse(action.payload.logs);

    // @ts-ignore
    let debugLog1 = new Buffer.from(logs.player1Log);
    // @ts-ignore
    let debugLog2 = new Buffer.from(logs.player2Log);
    // @ts-ignore
    let gameLog = new Buffer.from(logs.gameLog);

    debugLog1 = zlib.gunzipSync(debugLog1);
    debugLog2 = zlib.gunzipSync(debugLog2);
    gameLog = zlib.gunzipSync(gameLog);

    yield put(CodeActions.updateLogs(debugLog1, debugLog2, gameLog));
    yield put(SubmissionActions.changeStateCurrentRequest(RequestState.IDLE, Request.NONE));
  } catch (err) {
    throw err;
  }
}

export function* handleExecuteError(
  action: ActionType<typeof SubmissionActions.handleExecuteError>,
) {
  try {
    const submissionState = yield select(getSubmissionState);
    const currentRequest = submissionState.request;
    const currentState = submissionState.state;

    if (
      currentRequest === Request.NONE ||
      currentRequest === Request.LOCK_CODE ||
      (currentRequest === Request.PREVIOUS_COMMIT_MATCH &&
        currentState !== RequestState.EXECUTE_PREVIOUS_COMMIT_MATCH) ||
      (currentRequest === Request.SELF_MATCH && currentState !== RequestState.EXECUTE_SELF_MATCH)
    ) {
      return;
    }

    yield put(SubmissionActions.changeStateCurrentRequest(RequestState.IDLE, Request.NONE));
  } catch (err) {
    throw err;
  }
}

export function* submissionSagas() {
  yield all([
    takeEvery(SubmissionActions.Type.HANDLE_COMPILE_SUCCESS, handleCompileSuccess),
    takeEvery(SubmissionActions.Type.HANDLE_COMPILE_ERROR, handleCompileError),
    takeEvery(SubmissionActions.Type.HANDLE_EXECUTE_SUCCESS, handleExecuteSuccess),
    takeEvery(SubmissionActions.Type.HANDLE_EXECUTE_ERROR, handleExecuteError),
    takeEvery(SubmissionActions.Type.CHANGE_STATE_CURRENT_REQUEST, changeStateCurrentRequest),
    takeEvery(SubmissionActions.Type.LOCK_CODE, lockCode),
    takeEvery(SubmissionActions.Type.PREVIOUS_COMMIT_MATCH, previousCommitMatch),
    takeEvery(SubmissionActions.Type.SELF_MATCH, selfMatch),
  ]);
}
