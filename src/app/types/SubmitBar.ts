import { SubmissionActions } from 'app/actions';
import * as SubmissionInterfaces from 'app/types/code/Submission';
import { SplitPaneState } from 'app/types/Dashboard';

export interface State {
  commitMessage: string;
  isCommitMessageBoxOpen: boolean;
  isDropdownOpen: boolean;
}

export interface StateProps {
  maps: SubmissionInterfaces.Map[];
}

export interface DispatchProps {
  saveCode: () => void;
  commit: (commitMessage: string) => void;
  getCommitLog: () => void;
  lockCode: () => void;
  selfMatch: (mapId: number) => void;
  loadMaps: () => void;
}

export interface RunOptionsOwnState {
  isMapToggle: boolean;
  currentIndex: number;
}

export interface RunOptionsStateProps {
  maps: SubmissionInterfaces.Map[];
}

export interface RunOptionsDispatchProps {
  startMatch: (type: SubmissionActions.Type, mapId: number) => void;
  loadMaps: () => void;
}

export type RunOptionsProps = RunOptionsDispatchProps & RunOptionsStateProps;

export type Props = {
  changeSplitPaneState: (state: SplitPaneState) => void;
  splitPaneState: SplitPaneState;
} & DispatchProps &
  StateProps;
