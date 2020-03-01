import { RouteComponentProps } from 'react-router-dom';

export interface StateProps {
  message: string;
}

export interface DispatchProps {
  activateUser: (activationCode: string, userId: number) => void;
}

export type Props = StateProps & DispatchProps & RouteComponentProps;
