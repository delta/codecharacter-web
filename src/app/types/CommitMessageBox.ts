export interface ElementOwnProps {
  isCommitMessageBoxOpen: boolean;
  commitMessage: string;
  handleCommit: () => void;
  updateCommitMessage: (commitMessage: string) => void;
}

export type Props = ElementOwnProps;
