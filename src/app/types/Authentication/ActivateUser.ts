export interface StateProps {
  message: string;
}

export interface DispatchProps {
  activateUser: (activationCode: string) => void;
}

export type Props = StateProps & DispatchProps;
