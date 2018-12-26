import { EditorActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  updateCode: EditorActions.updateCode,
};

export interface EditorStoreState {
  code: string;
}

export type EditorStoreAction = ActionType<typeof actions>;

const editorStoreIntialState: EditorStoreState = {
  code: '#include <bits/stdc++.h>\nusing namespace std; \n\nint main() {\n    return 0;\n}',
};

export const editorReducer = (state = editorStoreIntialState, action: EditorStoreAction) => {
  switch (action.type) {
    case EditorActions.Type.UPDATE_CODE: {
      return {
        ...state,
        code: action.payload.code,
      };
    }
    default:
      return state;
  }
};
