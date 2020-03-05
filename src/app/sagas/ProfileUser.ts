/* tslint:disable:no-console*/
import { ProfileUserActions, UserActions } from 'app/actions';
import * as ProfileUserFetch from 'app/apiFetch/ProfileUser';
import { avatarName } from 'app/types/Authentication/Register';
import { resType } from 'app/types/sagas';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

export function* getMatchStats(action: ActionType<typeof ProfileUserActions.getMatchStats>) {
  try {
    const res = yield call(ProfileUserFetch.getMatchStats, action.payload.username);
    yield put(UserActions.updateErrorMessage(res.error));
    console.log('saga match res');
    console.log(res);
    if (res.type !== resType.ERROR) {
      const { avatarId, college, country, fullName, userType, username } = res.body;
      yield put(
        ProfileUserActions.updateProfileUserDetails({
          college,
          country,
          fullName,
          userType,
          username,
          avatar: avatarName[avatarId],
        }),
      );
    }
  } catch (err) {
    console.error(err);
  }
}

export function* getUserProfile(action: ActionType<typeof ProfileUserActions.getUserDetails>) {
  try {
    const res = yield call(ProfileUserFetch.getUserProfile, action.payload.username);
    console.log('saga profile res');
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

export function* profileSagas() {
  yield all([
    takeEvery(ProfileUserActions.Type.GET_MATCH_STATS, getMatchStats),
    takeEvery(ProfileUserActions.Type.GET_PROFILE_USER_DETAILS, getUserProfile),
  ]);
}
