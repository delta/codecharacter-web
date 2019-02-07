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

export interface DispatchProps {
  toggleUserProfileModal: (isUserProfileModalOpen: boolean) => void;
}

export type Props = StateProps & DispatchProps;
