import { action } from 'typesafe-actions';

export namespace DashboardActions {
  export enum Type {
    TOGGLE_EDITOR_SETTINGS_PANEL = 'TOGGLE_EDITOR_SETTINGS_PANEL'
  }

  export const toggleEditorSettingsPanel = (showEditorSettingsPanel: boolean) =>
    action(Type.TOGGLE_EDITOR_SETTINGS_PANEL, {
      showEditorSettingsPanel,
    });
}

export type DashboardActions = Omit<typeof DashboardActions, 'Type'>;
