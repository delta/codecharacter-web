import { CodeActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  updateCode: CodeActions.updateCode,
  updateStatusMessage: CodeActions.updateStatusMessage,
};

export interface CodeStoreState {
  code: string;
  statusMessage: string;
}

export type CodeStoreAction = ActionType<typeof actions>;
