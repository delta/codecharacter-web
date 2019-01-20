import { action } from 'typesafe-actions';

export namespace EditorSettingsActions {
  export enum Type {
    CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE',
    CHANGE_THEME = 'CHANGE_THEME',
    TOGGLE_BASIC_AUTO_COMPLETION = 'TOGGLE_BASIC_AUTO_COMPLETION',
    TOGGLE_SNIPPETS = 'TOGGLE_SNIPPETS',
  }

  export const changeFontSize = (fontSize: number) =>
    action(Type.CHANGE_FONT_SIZE, {
      fontSize,
    });

  export const changeTheme = (theme: string) =>
    action(Type.CHANGE_THEME, {
      theme,
    });

  export const toggleBasicAutoCompletion = (enableBasicAutoCompletion: boolean) =>
    action(Type.TOGGLE_BASIC_AUTO_COMPLETION, {
      enableBasicAutoCompletion,
    });

  export const toggleSnippets = (enableSnippets: boolean) =>
    action(Type.TOGGLE_SNIPPETS, {
      enableSnippets,
    });
}
