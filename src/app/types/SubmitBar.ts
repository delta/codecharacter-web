import { SplitPaneState } from 'app/types/Dashboard';

export interface State {
  commitMessage: string;
  isCommitMessageBoxOpen: boolean;
}

export interface DispatchProps {
  saveCode: () => void;
  commit: (commitMessage: string) => void;
  getCommitLog: () => void;
  lockCode: () => void;
}

export type Props = {
  changeSplitPaneState: (state: SplitPaneState) => void;
  splitPaneState: SplitPaneState;
} & DispatchProps;
