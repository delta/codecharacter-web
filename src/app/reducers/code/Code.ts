import { CodeActions } from 'app/actions';
import * as CodeInterfaces from 'app/types/code/Code';

const codeStoreInitialState: CodeInterfaces.CodeStoreState = {
  code: '#include <bits/stdc++.h>\nusing namespace std; \n\nint main() {\n  return 0;\n}',
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
    default:
      return state;
  }
};
