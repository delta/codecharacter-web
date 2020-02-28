import { ChangeUserPassword } from 'app/types/User';

export interface StateProps {
  errorMessage: string;
}

export interface DispatchProps {
  changePassword: (changePasswordDetails: ChangeUserPassword) => void;
}

export type changePasswordProps = StateProps & DispatchProps;
