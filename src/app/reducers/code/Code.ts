import { CodeActions } from 'app/actions';
import * as CodeInterfaces from 'app/types/code/Code';

const codeStoreInitialState: CodeInterfaces.CodeStoreState = {
  code: '#include <bits/stdc++.h>\nusing namespace std; \n\nint main() {\n  return 0;\n}',
  commitLog: [],
  currentCommitHash: 'latest',
  debugLog1: '',
  debugLog2: '',
  log: '',
  statusMessage: '',
};

export const codeReducer = (
  state = codeStoreInitialState,
  action: CodeInterfaces.CodeStoreAction,
) => {
  switch (action.type) {
    case CodeActions.Type.UPDATE_STATUS_MESSAGE: {
      return {
        ...state,
        statusMessage: action.payload.statusMessage,
      };
    }
    case CodeActions.Type.UPDATE_CODE: {
      return {
        ...state,
        code: action.payload.code,
      };
    }
    case CodeActions.Type.UPDATE_COMMIT_LOG: {
      return {
        ...state,
        commitLog: action.payload.log,
      };
    }
    case CodeActions.Type.SET_CURRENT_COMMIT_HASH: {
      return {
        ...state,
        currentCommitHash: action.payload.commitHash,
      };
    }
    default:
      return state;
  }
};
