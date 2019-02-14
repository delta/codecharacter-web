import { SidePanelTab } from 'app/reducers/Dashboard';
import { action } from 'typesafe-actions';

export namespace DashboardActions {
  export enum Type {
    SET_SIDE_PANEL_TAB = 'SET_SIDE_PANEL_TAB',
    RESET_DASHBOARD_STATE = 'RESET_DASHBOARD_STATE',
  }

  export const setSidePanelTab = (sidePanelTab: SidePanelTab) =>
    action(Type.SET_SIDE_PANEL_TAB, {
      sidePanelTab,
    });

  export const resetDashboardState = () => action(Type.RESET_DASHBOARD_STATE);
}
