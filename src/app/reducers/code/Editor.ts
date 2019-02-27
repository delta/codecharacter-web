import { EditorSettingsActions } from 'app/actions';
import * as EditorInterfaces from 'app/types/code/Editor';

const editorStoreIntialState: EditorInterfaces.EditorStoreState = {
  editorOptions: {
    enableBasicAutoCompletion: true,
    enableSnippets: true,
    fontSize: 16,
    keyboardHandler: 'default',
    theme: 'twilight',
  },
};

export const editorReducer = (
  state = editorStoreIntialState,
  action: EditorInterfaces.EditorStoreAction,
) => {
  switch (action.type) {
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
    case EditorSettingsActions.Type.CHANGE_KEYBOARD_HANDLER:
      return {
        ...state,
        editorOptions: {
          ...state.editorOptions,
          keyboardHandler: action.payload.keyboardHandler,
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
    case EditorSettingsActions.Type.RESET_EDITOR_STATE:
      return {
        ...editorStoreIntialState,
      };
    default:
      return state;
  }
};
