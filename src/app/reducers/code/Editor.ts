import { EditorActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  changeFontSize: EditorActions.changeFontSize,
  changeTheme: EditorActions.changeTheme,
  updateCode: EditorActions.updateCode,
};

export interface EditorStoreState {
  code: string;
  editorOptions: {
    fontSize: number;
    theme: string;
  };
}

export type EditorStoreAction = ActionType<typeof actions>;

const editorStoreIntialState: EditorStoreState = {
  code: '#include <bits/stdc++.h>\nusing namespace std; \n\nint main() {\n    return 0;\n}',
  editorOptions: {
    fontSize: 16,
    theme: 'monokai',
  },
};

export const editorReducer = (state = editorStoreIntialState, action: EditorStoreAction) => {
  switch (action.type) {
    case EditorActions.Type.UPDATE_CODE: {
      return {
        ...state,
        code: action.payload.code,
      };
    }
    case EditorActions.Type.CHANGE_FONT_SIZE:
      return {
        ...state,
        editorOptions: {
          ...state.editorOptions,
          fontSize: action.payload.fontSize,
        },
      };
    case EditorActions.Type.CHANGE_THEME:
      return {
        ...state,
        editorOptions: {
          ...state.editorOptions,
          theme: action.payload.theme,
        },
      };
    default:
      return state;
  }
};
