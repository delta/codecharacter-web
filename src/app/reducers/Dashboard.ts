import { DashboardActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  toggleEditorSettingsPanel: DashboardActions.toggleEditorSettingsPanel,
};

export interface DashboardStoreState {
  showEditorSettingsPanel: boolean
}

export type DashboardStoreAction = ActionType<typeof actions>;

const dashboardStoreIntialState: DashboardStoreState = {
  showEditorSettingsPanel: false,
};

export const dashboardReducer = (state = dashboardStoreIntialState, action: DashboardStoreAction) => {
  switch (action.type) {
    case DashboardActions.Type.TOGGLE_EDITOR_SETTINGS_PANEL:
      return {
        ...state,
        showEditorSettingsPanel: action.payload.showEditorSettingsPanel
      }
    default:
      return state;
  }
};
