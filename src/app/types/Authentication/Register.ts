import { AuthType } from 'app/types/Authentication';
import * as UserInterfaces from 'app/types/User';

export enum RegisterType {
  Student = 'Student',
  Professional = 'Professional',
}
export interface State {
  collegeName?: string;
  isCaptchaValidated: boolean;
  isFormSubmitted: boolean;
  username: string;
  isStudent: boolean;
  password: string;
  repeatPassword: string;
  email: string;
  country: string;
  fullName: string;
  pragyanId?: string;
  type: RegisterType;
}
export interface StateProps {
  errorMessage: string;
}

export interface ElementOwnProps {
  handleSelectPanel: (authType: AuthType) => void;
}

export interface DispatchProps {
  checkUsernameExists: (username: string) => void;
  register: (registerDetails: UserInterfaces.Register) => void;
  updateErrorMessage: (errorMessage: string) => void;
}

export type Props = StateProps & DispatchProps & ElementOwnProps;
