export interface State {
  commitMessage: string;
  isCommitMessageBoxOpen: boolean;
}

export interface DispatchProps {
  saveCode: () => void;
  commit: (commitMessage: string) => void;
  getCommitLog: () => void;
}

export type Props = {
  toggleEditor: () => void;
  isEditorOpen: boolean;
} & DispatchProps;
