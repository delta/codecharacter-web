import { CodeActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

export interface Commit {
  hash: string;
  date: string;
  message: string;
}

const actions = {
  setCurrentCommitHash: CodeActions.setCurrentCommitHash,
  updateCode: CodeActions.updateCode,
  updateCommitLog: CodeActions.updateCommitLog,
  updateStatusMessage: CodeActions.updateStatusMessage,
};

export interface CodeStoreState {
  code: string;
  statusMessage: string;
  commitLog: Commit[];
  currentCommitHash: string;
}

export type CodeStoreAction = ActionType<typeof actions>;