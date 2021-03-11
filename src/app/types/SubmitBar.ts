import { SubmissionActions } from 'app/actions';
import * as SubmissionInterfaces from 'app/types/code/Submission';
import { SplitPaneState } from 'app/types/Dashboard';

export interface State {
  commitMessage: string;
  isCommitMessageBoxOpen: boolean;
  isRunOptionsOpen: boolean;
}

export interface StateProps {
  maps: SubmissionInterfaces.Map[];
  debugRunAvailable: boolean;
  aiIds: number[];
  isStoryModeModalOpen: boolean;
  storyModeModalLevel: number;
  // tslint:disable-next-line
  ratings: { level: number; stars: number }[];
  current_level: number;
  current_stars: number;
}

export interface DispatchProps {
  saveCode: () => void;
  getQuestStatus: () => void;
  setCurrentLevel: (level: number, stars: number) => void;
  changeCurrentRequest: (currentRequest: SubmissionInterfaces.Request) => void;
  commit: (commitMessage: string) => void;
  getCommitLog: () => void;
  lockCode: () => void;
  aiMatch: (mapId: number, aiId: number) => void;
  selfMatch: (mapId: number) => void;
  debugRun: () => void;
  loadMaps: () => void;
  getAiIds: () => void;
  clearLogs: () => void;
  updateCurrentAiId: (aiId: number) => void;
  updateMapId: (mapId: number) => void;
  openStoryModeModal: (level: number) => void;
  closeStoryModeModal: () => void;
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
