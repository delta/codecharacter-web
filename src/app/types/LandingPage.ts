/* tslint:disable */

export interface State {
  isNavBarDown: boolean;
}

export interface StateProps {}
export interface OwnProps {
  classes: any;
}

export interface DispatchProps {}

export type Props = OwnProps & StateProps & DispatchProps;
