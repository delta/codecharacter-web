import { AuthType } from 'app/types/Authentication';

export interface State {
  isForgotPasswordOpen: boolean;
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

export interface ForgotPasswordProps {
  updateErrorMessage: (errorMessage: string) => void;
  handleSelectPanel: (authType: AuthType) => void;
  closeForgotPassword: () => void;
  errorMessage: string;
  username: string;
  setUsername: (username: string) => void;
  forgotPassword: (email: string) => void;
}

export type Props = ElementOwnProps & StateProps & DispatchProps;
