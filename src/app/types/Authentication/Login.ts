import { AuthType } from 'app/types/Authentication';

export { Login as State } from 'app/types/User';

export interface ElementOwnProps {
  handleSelectPanel: (authType: AuthType) => void;
}

export interface StateProps {
  errorMessage: string;
}

export interface DispatchProps {
  login: (username: string, password: string) => void;
  updateErrorMessage: (errorMessage: string) => void;
}

export type Props = ElementOwnProps & StateProps & DispatchProps;
