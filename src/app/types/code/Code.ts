import { CodeActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

export interface Commit {
  hash: string;
  date: string;
  message: string;
}

const actions = {
  resetCodeState: CodeActions.resetCodeState,
  setCurrentCommitHash: CodeActions.setCurrentCommitHash,
  updateCode: CodeActions.updateCode,
  updateCommitLog: CodeActions.updateCommitLog,
  updateLastSaveTime: CodeActions.updateLastSaveTime,
  updateStatusMessage: CodeActions.updateStatusMessage,
};

export interface CodeStoreState {
  code: string;
  statusMessage: string;
  commitLog: Commit[];
  currentCommitHash: string;
  debugLog1: string;
  debugLog2: string;
  lastSaveTime: Date;
  log: string;
}

export type CodeStoreAction = ActionType<typeof actions>;
