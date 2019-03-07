import { AuthType } from 'app/types/Authentication';

export interface State {
  username: string;
  password: string;
}
export interface ElementOwnProps {
  handleSelectPanel: (authType: AuthType) => void;
}

export interface StateProps {
  errorMessage: string;
  isLoginLoading: boolean;
}

export interface DispatchProps {
  login: (username: string, password: string) => void;
  updateErrorMessage: (errorMessage: string) => void;
}

export type Props = ElementOwnProps & StateProps & DispatchProps;
