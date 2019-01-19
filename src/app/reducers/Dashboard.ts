import { DashboardActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  setSidePanelTab: DashboardActions.setSidePanelTab,
};

export enum SidePanelTab {
  EDITOR_SETTINGS = 'EDITOR_SETTINGS',
  NONE = 'NONE',
}
export interface DashboardStoreState {
  sidePanelTab: SidePanelTab;
}

export type DashboardStoreAction = ActionType<typeof actions>;

const dashboardStoreIntialState: DashboardStoreState = {
  sidePanelTab: SidePanelTab.NONE,
};

export const dashboardReducer = (
  state = dashboardStoreIntialState,
  action: DashboardStoreAction,
) => {
  switch (action.type) {
    case DashboardActions.Type.SET_SIDE_PANEL_TAB:
      return {
        ...state,
        sidePanelTab: action.payload.sidePanelTab,
      };
    default:
      return state;
  }
};
