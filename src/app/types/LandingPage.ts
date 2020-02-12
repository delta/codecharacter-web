export interface State {
  isNavBarDown: boolean;
}

export interface StateProps {
  isLoggedIn: boolean;
}

// tslint:disable-next-line
export interface DispatchProps {}

export type Props = StateProps & DispatchProps;
