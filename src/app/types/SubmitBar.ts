export interface State {
  commitMessage: string;
  isCommitMessageBoxOpen: boolean;
}

export interface DispatchProps {
  saveCode: () => void;
  commit: (commitMessage: string) => void;
}

export type Props = {} & DispatchProps;
