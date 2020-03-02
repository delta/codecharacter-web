import { SubmissionActions } from 'app/actions';
import * as SubmissionInterfaces from 'app/types/code/Submission';
import { SplitPaneState } from 'app/types/Dashboard';

export enum Map {
  MAP1,
  MAP2,
  MAP3,
  MAP4,
  MAP5,
}

export interface State {
  commitMessage: string;
  isCommitMessageBoxOpen: boolean;
  isRunOptionsOpen: boolean;
  isMapOptionsOpen: boolean;
}

export interface StateProps {
  map: Map;
  maps: SubmissionInterfaces.Map[];
  debugRunAvailable: boolean;
  aiIds: number[];
}

export interface DispatchProps {
  saveCode: () => void;
  commit: (commitMessage: string) => void;
  getCommitLog: () => void;
  lockCode: () => void;
  aiMatch: (mapId: number, aiId: number) => void;
  selfMatch: (mapId: number) => void;
  debugRun: () => void;
  loadMaps: () => void;
  getAiIds: () => void;
  clearLogs: () => void;
  updateMap: (map: Map) => void;
}

export interface RunOptionsOwnState {
  isMapOptionsOpen: boolean;
  currentIndex: number;
}

export interface RunOptionsStateProps {
  maps: SubmissionInterfaces.Map[];
  aiIds: number[];
}

export interface RunOptionsDispatchProps {
  startMatch: (type: SubmissionActions.Type, mapId: number, aiId: number) => void;
  loadMaps: () => void;
  getAiIds: () => void;
  closeOptions: () => void;
}

export type RunOptionsProps = RunOptionsDispatchProps & RunOptionsStateProps;

export type Props = {
  changeSplitPaneState: (state: SplitPaneState) => void;
  splitPaneState: SplitPaneState;
} & DispatchProps &
  StateProps;
