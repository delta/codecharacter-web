import { DashboardActions } from 'app/actions';
import * as DashboardInterfaces from 'app/types/Dashboard';

export enum SidePanelTab {
  EDITOR_SETTINGS = 'EDITOR_SETTINGS',
  LEADERBOARD = 'LEADERBOARD',
  COMMIT_LOG = 'COMMIT_LOG',
  NONE = 'NONE',
}

const dashboardStoreIntialState: DashboardInterfaces.DashboardStoreState = {
  sidePanelTab: SidePanelTab.NONE,
};

export const dashboardReducer = (
  state = dashboardStoreIntialState,
  action: DashboardInterfaces.DashboardStoreAction,
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
