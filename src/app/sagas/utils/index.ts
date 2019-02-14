import { UserActions } from 'app/actions';
import { put } from 'redux-saga/effects';

export function* checkAuthentication(result: {
  type: string | undefined;
  error: string | undefined;
}) {
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
