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
import { avatarName } from 'app/types/Authentication/Register';
import { resType } from 'app/types/sagas';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

export function* activateUser(action: ActionType<typeof UserActions.activateUser>) {
  try {
    yield put(UserActions.updateErrorMessage(''));
    const res = yield call(UserFetch.activateUser, {
      authToken: action.payload.authToken,
      userId: action.payload.userId,
    });

    yield put(UserActions.updateErrorMessage(res.error ? res.body.message : ''));

    if (res.type !== resType.ERROR) {
      // FIXME : use declarative packages to manipulate browser urls
      window.location.assign('/login');
      yield put(NotificationActions.success('Account activated sucessfully'));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* login(action: ActionType<typeof UserActions.login>) {
  try {
    yield put(UserActions.setIsLoginLoading(true));
    const res = yield call(UserFetch.userLogin, {
      email: action.payload.email,
      password: action.payload.password,
    });
    // res.error is empty if res.type != 'Error'
    const { body: responseBody } = res;
    let errorMessage;
    switch (responseBody.message) {
      case 'User is disabled':
      case 'Bad credentials':
        errorMessage = 'Your email or password was incorrect.';
        break;
      case 'User not activated':
        errorMessage = 'Please activate your account.';
        break;
      default:
        errorMessage = '';
        break;
    }
    yield put(UserActions.updateErrorMessage(errorMessage));
    yield put(UserActions.setIsLoginLoading(false));

    if (res.type !== resType.ERROR) {
      yield put(
        UserActions.updateUserDetails({
          country: '',
          email: action.payload.email,
          isLoggedIn: true,
        }),
      );
      yield put(UserActions.getUserDetails());
      yield put(CodeActions.getLastSaveTime());
      yield put(DashboardActions.setIsWelcomeModalOpen(true));
    }
  } catch (err) {
    yield put(UserActions.setIsLoginLoading(false));
    console.error(err);
  }
}

export function* logout(action: ActionType<typeof UserActions.logout>) {
  try {
    const res = yield call(UserFetch.userLogout);

    const isAuthenticated = yield checkAuthentication({
      error: res.error,
      type: res.type,
    });
    if (isAuthenticated === false) return;

    yield put(UserActions.updateErrorMessage(res.message));

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
    yield put(UserActions.updateErrorMessage(res.error ? res.body.message : ''));

    if (res.type !== resType.ERROR) {
      yield put(
        UserActions.updateUserDetails({
          country: action.payload.registerDetails.country,
          email: action.payload.registerDetails.email,
          isLoggedIn: false,
          username: action.payload.registerDetails.username,
        }),
      );
      yield put(NotificationActions.success('Registered successfully!'));
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
      const { avatarId, college, country, fullName, userType, username, userId } = res.body;
      console.log('BODY', res.body);
      yield put(
        UserActions.updateUserDetails({
          college,
          country,
          fullName,
          userId,
          userType,
          username,
          avatar: avatarName[avatarId],
          isLoggedIn: true,
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
      const { avatarId, country, fullName, username, college } = action.payload.editUserDetails;
      yield put(
        UserActions.updateUserDetails({
          college,
          country,
          fullName,
          username,
          // @ts-ignore
          avatar: avatarName[avatarId],
          isLoggedIn: true,
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

export function* checkEmailExists(action: ActionType<typeof UserActions.checkEmailExists>) {
  try {
    const res = yield call(UserFetch.checkEmailExists, action.payload.email);

    // Call returns error if email already exists, else empty
    yield put(UserActions.updateErrorMessage(res.error));
  } catch (err) {
    console.error(err);
  }
}

export function* checkUsernameExists(action: ActionType<typeof UserActions.checkUsernameExists>) {
  try {
    const res = yield call(UserFetch.checkUsernameExists, action.payload.username);

    // Call returns error if email already exists, else empty
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
    takeEvery(UserActions.Type.ACTIVATE_USER, activateUser),
    takeEvery(UserActions.Type.REGISTER, register),
    takeEvery(UserActions.Type.EDIT_USER_PROFILE, editUserProfile),
    takeEvery(UserActions.Type.EDIT_USER_PASSWORD, editUserPassword),
    takeEvery(UserActions.Type.LOGIN, login),
    takeEvery(UserActions.Type.LOGOUT, logout),
    takeEvery(UserActions.Type.CHECK_EMAIL_EXISTS, checkEmailExists),
    takeEvery(UserActions.Type.CHECK_USERNAME_EXISTS, checkUsernameExists),
    takeEvery(UserActions.Type.GET_USER_DETAILS, getUserDetails),
    takeEvery(UserActions.Type.RESET_APP_STATE, resetAppState),
  ]);
}
