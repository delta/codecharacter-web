import { RouteComponentProps } from 'react-router-dom';

export interface ChangePasswordState {
  password: string;
  repeatPassword: string;
  passwordError: string;
}
export interface StateProps {
  errorMessage: string;
}

export interface DispatchProps {
  changePassword: (password: string, passwordResetToken: string, userId: number) => void;
}

export type changePasswordProps = StateProps & DispatchProps & RouteComponentProps;
