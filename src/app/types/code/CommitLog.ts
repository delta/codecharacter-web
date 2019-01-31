import { Commit } from 'app/types/code/Code';

export interface StateProps {
  commitLog: Commit[];
  currentCommitHash: string;
}

export interface State {
  imgType: string[];
}

export interface DispatchProps {
  checkoutCode: (commitHash: string) => void;
  getCommitLog: () => void;
  forkCode: (commitHash: string) => void;
}

export type Props = {} & StateProps & DispatchProps;
