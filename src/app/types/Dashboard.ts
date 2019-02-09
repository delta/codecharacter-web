import { DashboardActions } from 'app/actions';
import { SidePanelTab } from 'app/reducers/Dashboard';
import { ActionType } from 'typesafe-actions';

const actions = {
  setSidePanelTab: DashboardActions.setSidePanelTab,
};

export enum SplitPaneState {
  EDITOR = 'EDITOR',
  BOTH = 'BOTH',
  RENDERER = 'RENDERER',
}

export interface State {
  editorWidthRatio: number;
  fixedLeftPaneWidth: number;
  splitPaneState: SplitPaneState;
  windowWidth: number;
}

export interface StateProps {
  isLoggedIn: boolean;
  sidePanelOpen: boolean;
}

export type Props = StateProps;

export type DashboardActions = Omit<typeof DashboardActions, 'Type'>;

export interface DashboardStoreState {
  sidePanelTab: SidePanelTab;
}

export type DashboardStoreAction = ActionType<typeof actions>;
