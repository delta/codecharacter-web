import { DashboardActions } from 'app/actions';
import { SidePanelTab } from 'app/reducers/Dashboard';
import { ActionType } from 'typesafe-actions';

const actions = {
  resetDashboardState: DashboardActions.resetDashboardState,
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
  rendererHeight: number;
  splitPaneState: SplitPaneState;
  windowWidth: number;
  isJoyRideActive: boolean;
}

export interface StateProps {
  isLoggedIn: boolean;
  sidePanelOpen: boolean;
  isAuthenticationOpen: boolean;
  isUserProfileModalOpen: boolean;
  logFile: string;
  player1DebugLog: string;
  player2DebugLog: string;
}

export interface DispatchProps {
  setIsAuthenticationOpen: (isAuthenticationOpen: boolean) => void;
}

export type Props = StateProps & DispatchProps;

export type DashboardActions = Omit<typeof DashboardActions, 'Type'>;

export interface DashboardStoreState {
  sidePanelTab: SidePanelTab;
}

export type DashboardStoreAction = ActionType<typeof actions>;
