import { Commit } from 'app/types/code/Code';
import { Map } from 'app/types/code/Submission';

export interface StateProps {
  commitLog: Commit[];
  currentCommitHash: string;
  maps: Map[];
}

export interface State {
  offset: number;
}

export interface DispatchProps {
  checkoutCode: (commitHash: string) => void;
  getCommitLog: () => void;
  forkCode: (commitHash: string) => void;
  startPreviousCommitMatch: (mapId: number, commitHash: string) => void;
  loadMaps: () => void;
}

export type Props = {} & StateProps & DispatchProps;
