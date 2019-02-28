export enum AuthType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export interface OwnProps {
  setIsAuthenticationOpen: (isAuthenticationOpen: boolean) => void;
}

export interface State {
  authType: AuthType;
}

export interface StateProps {
  isLoggedIn: boolean;
}

export interface DispatchProps {
  updateErrorMessage: (errorMessage: string) => void;
  toggleUserProfileModal: (isUserProfileModalOpen: boolean) => void;
}

export type Props = OwnProps & StateProps & DispatchProps;
