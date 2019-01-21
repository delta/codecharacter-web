import { UserActions } from 'app/actions';
import * as UserFetch from 'app/apiFetch/User';
import { all, call, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

export namespace BodyInterfaces {
  export interface Login {
    username: string;
    password: string;
  }
}

export function* login(action: ActionType<typeof UserActions.login>) {
  try {
    yield call(UserFetch.userLogin, {
      password: action.payload.password,
      username: action.payload.username,
    });
  } catch (err) {
    throw err;
  }
}

export function* userSagas() {
  yield all([takeEvery(UserActions.Type.LOGIN, login)]);
}
