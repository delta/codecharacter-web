import { SidePanelTab } from 'app/reducers/Dashboard';
import { action } from 'typesafe-actions';

export namespace DashboardActions {
  export enum Type {
    SET_SIDE_PANEL_TAB = 'SET_SIDE_PANEL_TAB',
  }

  export const setSidePanelTab = (sidePanelTab: SidePanelTab) =>
    action(Type.SET_SIDE_PANEL_TAB, {
      sidePanelTab,
    });
}

export type DashboardActions = Omit<typeof DashboardActions, 'Type'>;
