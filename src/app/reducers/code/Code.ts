import { CodeActions } from 'app/actions';
import * as CodeInterfaces from 'app/types/code/Code';

const codeStoreInitialState: CodeInterfaces.CodeStoreState = {
  code: '#include <bits/stdc++.h>\nusing namespace std; \n\nint main() {\n  return 0;\n}',
  commitLog: [],
  currentCommitHash: 'latest',
  debugLog1: '',
  debugLog2: '',
  isCodeSaved: true,
  lastSaveTime: new Date(0),
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
        isCodeSaved: false,
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
    case CodeActions.Type.UPDATE_LAST_SAVE_TIME: {
      return {
        ...state,
        lastSaveTime: action.payload.lastSaveTime,
      };
    }
    case CodeActions.Type.UPDATE_IS_CODE_SAVED: {
      return {
        ...state,
        isCodeSaved: action.payload.isCodeSaved,
      };
    }
    case CodeActions.Type.RESET_CODE_STATE: {
      return {
        ...codeStoreInitialState,
      };
    }
    default:
      return state;
  }
};
