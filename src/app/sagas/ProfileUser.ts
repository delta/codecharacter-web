/* tslint:disable:no-console*/
import { ProfileUserActions, UserActions } from 'app/actions';
import * as ProfileUserFetch from 'app/apiFetch/ProfileUser';
import { avatarName } from 'app/types/Authentication/Register';
import { resType } from 'app/types/sagas';
import { call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

export function* getMatchStats(action: ActionType<typeof ProfileUserActions.getMatchStats>) {
  try {
    const res = yield call(ProfileUserFetch.getMatchStats, action.payload.username);
    yield put(UserActions.updateErrorMessage(res.error));
    if (res.type !== resType.ERROR) {
      const { avatarId, college, country, fullName, userType, username } = res.body;
      yield put(
        ProfileUserActions.updateUserDetails({
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
