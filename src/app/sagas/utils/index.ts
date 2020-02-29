import { NotificationActions, UserActions } from 'app/actions';
import { put } from 'redux-saga/effects';

export interface ResponseStructure {
  type: string | undefined;
  error: string | undefined;
}

export function* checkAuthentication(result: ResponseStructure) {
  if (result && result.error && result.error === 'Unauthorised') {
    yield put(
      UserActions.updateUserDetails({
        country: '',
        email: '',
        isLoggedIn: false,
        username: '',
      }),
    );
    yield put(UserActions.setIsAuthenticationOpen(true));
    return false;
  }
  return true;
}

export function* checkAccountActivated(result: ResponseStructure) {
  if (result && result.error && result.error === 'Email not activated') {
    yield put(
      NotificationActions.info('Your account has not been activated yet. Please check your email.'),
    );
    return false;
  }
  return true;
}
