import { action } from 'typesafe-actions';

export namespace EditorSettingsActions {
  export enum Type {
    CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE',
    CHANGE_THEME = 'CHANGE_THEME',
    CHANGE_KEYBOARD_HANDLER = 'CHANGE_KEYBOARD_HANDLER',
    TOGGLE_BASIC_AUTO_COMPLETION = 'TOGGLE_BASIC_AUTO_COMPLETION',
    TOGGLE_SNIPPETS = 'TOGGLE_SNIPPETS',
    RESET_EDITOR_STATE = 'RESET_EDITOR_STATE',
  }

  export const changeFontSize = (fontSize: number) =>
    action(Type.CHANGE_FONT_SIZE, {
      fontSize,
    });

  export const changeTheme = (theme: string) =>
    action(Type.CHANGE_THEME, {
      theme,
    });

  export const changeKeyboardHandler = (keyboardHandler: string) =>
    action(Type.CHANGE_KEYBOARD_HANDLER, {
      keyboardHandler,
    });

  export const toggleBasicAutoCompletion = (enableBasicAutoCompletion: boolean) =>
    action(Type.TOGGLE_BASIC_AUTO_COMPLETION, {
      enableBasicAutoCompletion,
    });

  export const toggleSnippets = (enableSnippets: boolean) =>
    action(Type.TOGGLE_SNIPPETS, {
      enableSnippets,
    });

  export const resetEditorState = () => action(Type.RESET_EDITOR_STATE);
}
