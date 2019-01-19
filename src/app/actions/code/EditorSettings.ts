import { action } from 'typesafe-actions';

export namespace EditorSettingsActions {
  export enum Type {
    CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE',
    CHANGE_THEME = 'CHANGE_THEME',
    ENABLE_AUTO_COMPLETION = 'ENABLE_AUTO_COMPLETION',
    ENABLE_SNIPPETS = 'ENABLE_SNIPPETS',
  }

  export const changeFontSize = (fontSize: number) =>
    action(Type.CHANGE_FONT_SIZE, {
      fontSize,
    });

  export const changeTheme = (theme: string) =>
    action(Type.CHANGE_THEME, {
      theme,
    });

  export const enableAutoCompletion = (basicAutoCompletion: boolean) =>
    action(Type.ENABLE_AUTO_COMPLETION, {
      basicAutoCompletion,
    });

  export const enableSnippets = (snippets: boolean) =>
    action(Type.ENABLE_SNIPPETS, {
      snippets,
    });
}
