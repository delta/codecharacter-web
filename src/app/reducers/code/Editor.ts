import { EditorActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  changeFontSize: EditorActions.changeFontSize,
  changeTheme: EditorActions.changeTheme,
  enableAutoCompletion: EditorActions.enableAutoCompletion,
  enableSnippets: EditorActions.enableSnippets,
  toggleCustomizationPanel: EditorActions.toggleCustomizationPanel,
  updateCode: EditorActions.updateCode,
};

export interface EditorStoreState {
  code: string;
  editorOptions: {
    basicAutoCompletion: boolean;
    fontSize: number;
    snippets: boolean;
    theme: string;
  };
}

export type EditorStoreAction = ActionType<typeof actions>;

const editorStoreIntialState: EditorStoreState = {
  code: '#include <bits/stdc++.h>\nusing namespace std; \n\nint main() {\n    return 0;\n}',
  editorOptions: {
    basicAutoCompletion: false,
    fontSize: 16,
    snippets: false,
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
    case EditorActions.Type.ENABLE_AUTO_COMPLETION:
      return {
        ...state,
        editorOptions: {
          ...state.editorOptions,
          basicAutoCompletion: action.payload.basicAutoCompletion,
        },
      };
    case EditorActions.Type.ENABLE_SNIPPETS:
      return {
        ...state,
        editorOptions: {
          ...state.editorOptions,
          snippets: action.payload.snippets,
        },
      };
    case EditorActions.Type.TOGGLE_CUSTOMIZATION_PANEL:
      return {
        ...state,
        showCustomizationPanel: action.payload.showCustomizationPanel,
      };
    default:
      return state;
  }
};
