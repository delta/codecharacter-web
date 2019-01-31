export enum AuthType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export interface State {
  authType: AuthType;
}

export interface StateProps {
  isLoggedIn: boolean;
}

export type Props = StateProps;
