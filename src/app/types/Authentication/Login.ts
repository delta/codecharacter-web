import { AuthType } from 'app/types/Authentication';

export interface State {
  isForgotPassword: boolean;
  username: string;
  password: string;
}
export interface ElementOwnProps {
  handleSelectPanel: (authType: AuthType) => void;
}

export interface StateProps {
  errorMessage: string;
  isLoggedIn: boolean;
  isLoginLoading: boolean;
}

export interface DispatchProps {
  forgotPassword: (email: string) => void;
  login: (username: string, password: string) => void;

  updateErrorMessage: (errorMessage: string) => void;
}

export type Props = ElementOwnProps & StateProps & DispatchProps;
