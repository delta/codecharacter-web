import { action } from 'typesafe-actions';

export namespace EditorActions {
  export enum Type {
    UPDATE_CODE = 'UPDATE_CODE',
    CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE',
    CHANGE_THEME = 'CHANGE_THEME',
    TOGGLE_CUSTOMIZATION_PANEL = 'TOGGLE_CUSTOMIZATION_PANEL',
  }

  export const updateCode = (code: string) =>
    action(Type.UPDATE_CODE, {
      code,
    });

  export const changeFontSize = (fontSize: number) =>
    action(Type.CHANGE_FONT_SIZE, {
      fontSize,
    });

  export const changeTheme = (theme: string) =>
    action(Type.CHANGE_THEME, {
      theme,
    });

  export const toggleCustomizationPanel = (showCustomizationPanel: boolean) =>
    action(Type.TOGGLE_CUSTOMIZATION_PANEL, {
      showCustomizationPanel,
    });
}
