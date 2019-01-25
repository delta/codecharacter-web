import { UserActions } from 'app/actions';
import * as UserFetch from 'app/apiFetch/User';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

export function* login(action: ActionType<typeof UserActions.login>) {
  try {
    const result = yield call(UserFetch.userLogin, {
      password: action.payload.password,
      username: action.payload.username,
    });

    // result.error is empty if result.type != 'Error'
    yield put(UserActions.updateErrorMessage(result.error));

    if (result.type !== 'Error') {
      yield put(
        UserActions.updateUserDetails({
          country: '',
          email: '',
          isLoggedIn: true,
          username: action.payload.username,
        }),
      );
    }
  } catch (err) {
    throw err;
  }
}

export function* register(action: ActionType<typeof UserActions.register>) {
  try {
    const result = yield call(UserFetch.userRegister, action.payload.registerDetails);

    // result.error has error string if type = 'Error', else empty
    yield put(UserActions.updateErrorMessage(result.error));

    if (result.type !== 'Error') {
      yield put(
        UserActions.updateUserDetails({
          country: action.payload.registerDetails.country,
          email: action.payload.registerDetails.email,
          isLoggedIn: false,
          username: action.payload.registerDetails.username,
        }),
      );
    }
  } catch (err) {
    throw err;
  }
}

export function* checkUsernameExists(action: ActionType<typeof UserActions.checkUsernameExists>) {
  try {
    const result = yield call(UserFetch.checkUsernameExists, action.payload.username);

    // Call returns error if username already exists, else empty
    yield put(UserActions.updateErrorMessage(result.error));
  } catch (err) {
    throw err;
  }
}

export function* userSagas() {
  yield all([
    takeEvery(UserActions.Type.REGISTER, register),
    takeEvery(UserActions.Type.LOGIN, login),
    takeEvery(UserActions.Type.CHECK_USERNAME_EXISTS, checkUsernameExists),
  ]);
}
