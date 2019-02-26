/* tslint:disable:no-console*/
import {
  CodeActions,
  DashboardActions,
  EditorSettingsActions,
  GameLogActions,
  LeaderboardActions,
  MatchActions,
  NotificationActions,
  SubmissionActions,
  UserActions,
} from 'app/actions';
import * as UserFetch from 'app/apiFetch/User';
import { checkAuthentication } from 'app/sagas/utils';
import { resType } from 'app/types/sagas';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

export function* login(action: ActionType<typeof UserActions.login>) {
  try {
    const res = yield call(UserFetch.userLogin, {
      password: action.payload.password,
      username: action.payload.username,
    });

    // res.error is empty if res.type != 'Error'
    yield put(UserActions.updateErrorMessage(res.error));

    if (res.type !== resType.ERROR) {
      yield put(
        UserActions.updateUserDetails({
          country: '',
          email: '',
          isLoggedIn: true,
          username: action.payload.username,
        }),
      );
      yield put(CodeActions.getLastSaveTime());
    }
  } catch (err) {
    console.error(err);
  }
}

export function* logout(action: ActionType<typeof UserActions.logout>) {
  try {
    const res = yield call(UserFetch.userLogout);

    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    // res.error is empty if res.type != 'Error'
    yield put(UserActions.updateErrorMessage(res.error));

    if (res.type !== resType.ERROR) {
      yield put(
        UserActions.updateUserDetails({
          country: '',
          email: '',
          isLoggedIn: false,
          username: '',
        }),
      );
    }
  } catch (err) {
    console.error(err);
  }
}

export function* register(action: ActionType<typeof UserActions.register>) {
  try {
    const res = yield call(UserFetch.userRegister, action.payload.registerDetails);

    // res.error has error string if type = 'Error', else empty
    yield put(UserActions.updateErrorMessage(res.error));

    if (res.type !== resType.ERROR) {
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
    console.error(err);
  }
}

export function* getUserDetails(action: ActionType<typeof UserActions.getUserDetails>) {
  try {
    const res = yield call(UserFetch.userGetDetails);

    // res.error has error string if type = 'Error', else empty
    yield put(UserActions.updateErrorMessage(res.error));

    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;
    if (res.type !== resType.ERROR) {
      yield put(
        UserActions.updateUserDetails({
          avatar: res.userDetails.avatar,
          college: res.userDetails.college,
          country: res.userDetails.country,
          fullName: res.userDetails.fullName,
          isLoggedIn: true,
          type: res.userDetails.type,
          username: res.userDetails.username,
        }),
      );
    }
  } catch (err) {
    console.error(err);
  }
}

export function* editUserProfile(action: ActionType<typeof UserActions.editUserProfile>) {
  try {
    const res = yield call(UserFetch.userEditProfile, action.payload.editUserDetails);

    // res.error has error string if type = 'Error', else empty
    yield put(UserActions.updateErrorMessage(res.error));

    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type !== resType.ERROR) {
      yield put(
        UserActions.updateUserDetails({
          avatar: action.payload.editUserDetails.avatar,
          country: action.payload.editUserDetails.country,
          email: action.payload.editUserDetails.email,
          fullName: action.payload.editUserDetails.fullName,
          isLoggedIn: true,
          username: action.payload.editUserDetails.username,
        }),
      );
    }
  } catch (err) {
    console.error(err);
  }
}

export function* editUserPassword(action: ActionType<typeof UserActions.editUserPassword>) {
  try {
    const res = yield call(UserFetch.userEditPassword, action.payload.editUserPasswordDetails);

    // res.error has error string if type = 'Error', else empty
    yield put(UserActions.updateErrorMessage(res.error));

    const isAuthenticated = yield checkAuthentication(res);
    if (isAuthenticated === false) return;

    if (res.type !== resType.ERROR) {
      yield put(
        UserActions.updateUserDetails({
          errorMessage: '',
          isLoggedIn: true,
        }),
      );
    }
  } catch (err) {
    console.error(err);
  }
}

export function* checkUsernameExists(action: ActionType<typeof UserActions.checkUsernameExists>) {
  try {
    const res = yield call(UserFetch.checkUsernameExists, action.payload.username);

    // Call returns error if username already exists, else empty
    yield put(UserActions.updateErrorMessage(res.error));
  } catch (err) {
    console.error(err);
  }
}

export function* resetAppState(action: ActionType<typeof UserActions.resetAppState>) {
  try {
    yield put(CodeActions.resetCodeState());
    yield put(EditorSettingsActions.resetEditorState());
    yield put(SubmissionActions.resetSubmissionState());
    yield put(DashboardActions.resetDashboardState());
    yield put(GameLogActions.resetGameLogState());
    yield put(LeaderboardActions.resetLeaderboardState());
    yield put(NotificationActions.resetNotificationState());
    yield put(UserActions.resetUserState());
    yield put(MatchActions.resetMatchView());
  } catch (err) {
    console.error(err);
  }
}

export function* userSagas() {
  yield all([
    takeEvery(UserActions.Type.REGISTER, register),
    takeEvery(UserActions.Type.EDIT_USER_PROFILE, editUserProfile),
    takeEvery(UserActions.Type.EDIT_USER_PASSWORD, editUserPassword),
    takeEvery(UserActions.Type.LOGIN, login),
    takeEvery(UserActions.Type.LOGOUT, logout),
    takeEvery(UserActions.Type.CHECK_USERNAME_EXISTS, checkUsernameExists),
    takeEvery(UserActions.Type.GET_USER_DETAILS, getUserDetails),
    takeEvery(UserActions.Type.RESET_APP_STATE, resetAppState),
  ]);
}
