import { Commit } from 'app/types/code/Code';

export interface StateProps {
  commitLog: Commit[];
  currentCommitHash: string;
}

export interface State {
  offset: number;
}

export interface DispatchProps {
  checkoutCode: (commitHash: string) => void;
  getCommitLog: () => void;
  forkCode: (commitHash: string) => void;
  startPreviousCommitMatch: (mapId: number, commitHash: string) => void;
}

export type Props = {} & StateProps & DispatchProps;
