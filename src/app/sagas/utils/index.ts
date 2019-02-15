import { UserActions } from 'app/actions';
import { put } from 'redux-saga/effects';

export function* checkAuthentication(result: { type?: string; error?: string }) {
  if (result && result.error && result.error === 'Unauthorised') {
    yield put(
      UserActions.updateUserDetails({
        country: '',
        email: '',
        isLoggedIn: false,
        username: '',
      }),
    );
    return false;
  }
  return true;
}
