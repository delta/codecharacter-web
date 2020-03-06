import { DashboardActions } from 'app/actions';
import * as DashboardInterfaces from 'app/types/Dashboard';

export enum SidePanelTab {
  DOCS = 'DOCS',
  EDITOR_SETTINGS = 'EDITOR_SETTINGS',
  LEADERBOARD = 'LEADERBOARD',
  COMMIT_LOG = 'COMMIT_LOG',
  MATCH = 'MATCH',
  NOTIFICATION = 'NOTIFICATION',
  NONE = 'NONE',
}

const dashboardStoreIntialState: DashboardInterfaces.DashboardStoreState = {
  isReactTourActive: true,
  isWelcomeModalOpen: true,
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
    case DashboardActions.Type.RESET_DASHBOARD_STATE: {
      return {
        ...dashboardStoreIntialState,
      };
    }
    case DashboardActions.Type.SET_IS_WELCOME_MODAL_OPEN: {
      return {
        ...state,
        isWelcomeModalOpen: action.payload.isOpen,
      };
    }
    case DashboardActions.Type.TOGGLE_REACT_TOUR: {
      return {
        ...state,
        isReactTourActive: !state.isReactTourActive,
      };
    }
    default:
      return state;
  }
};
