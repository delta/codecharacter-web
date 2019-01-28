import { AuthType } from 'app/types/Authentication';
export { Login as OwnState } from 'app/types/User';

export interface OwnProps {
  handleSelectPanel: (authType: AuthType) => void;
}

export interface DispatchProps {
  login: (username: string, password: string) => void;
}

export type Props = OwnProps & DispatchProps;
