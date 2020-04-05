export interface StateProps {
  currentCommitHash: string;
  isCodeSaved: boolean;
  currentState: string;
  lastSaveTime: Date;
}

export interface OwnProps {
  width: number;
}

export interface DispatchProps {
  commit: (commitMessage: string) => void;
  getCommitLog: () => void;
}

export interface State {
  commitMessage: string;
  isCommitMessageBoxOpen: boolean;
  lastSaveMessage: string;
}

export type Props = OwnProps & StateProps & DispatchProps;
