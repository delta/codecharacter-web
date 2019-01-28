export enum AuthType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export interface State {
  isAuthModalOpen: boolean;
  authType: AuthType;
}

export interface StateProps {
  isLoggedIn: boolean;
}

export type Props = StateProps;
