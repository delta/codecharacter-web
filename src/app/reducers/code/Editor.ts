import { EditorActions, EditorSettingsActions } from 'app/actions';
import * as EditorInterfaces from 'app/types/code/Editor';

const editorStoreIntialState: EditorInterfaces.EditorStoreState = {
  code: '#include <bits/stdc++.h>\nusing namespace std; \n\nint main() {\n    return 0;\n}',
  editorOptions: {
    enableBasicAutoCompletion: false,
    enableSnippets: false,
    fontSize: 16,
    theme: 'monokai',
  },
};

export const editorReducer = (
  state = editorStoreIntialState,
  action: EditorInterfaces.EditorStoreAction,
) => {
  switch (action.type) {
    case EditorActions.Type.UPDATE_CODE: {
      return {
        ...state,
        code: action.payload.code,
      };
    }
    case EditorSettingsActions.Type.CHANGE_FONT_SIZE:
      return {
        ...state,
        editorOptions: {
          ...state.editorOptions,
          fontSize: action.payload.fontSize,
        },
      };
    case EditorSettingsActions.Type.CHANGE_THEME:
      return {
        ...state,
        editorOptions: {
          ...state.editorOptions,
          theme: action.payload.theme,
        },
      };
    case EditorSettingsActions.Type.TOGGLE_BASIC_AUTO_COMPLETION:
      return {
        ...state,
        editorOptions: {
          ...state.editorOptions,
          enableBasicAutoCompletion: action.payload.enableBasicAutoCompletion,
        },
      };
    case EditorSettingsActions.Type.TOGGLE_SNIPPETS:
      return {
        ...state,
        editorOptions: {
          ...state.editorOptions,
          enableSnippets: action.payload.enableSnippets,
        },
      };
    default:
      return state;
  }
};
