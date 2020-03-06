import { DashboardActions } from 'app/actions';
import { SidePanelTab } from 'app/reducers/Dashboard';
import { ActionType } from 'typesafe-actions';

const actions = {
  resetDashboardState: DashboardActions.resetDashboardState,
  setIsWelcomeModalOpen: DashboardActions.setIsWelcomeModalOpen,
  setSidePanelTab: DashboardActions.setSidePanelTab,
  toggleReactTour: DashboardActions.toggleReactTour,
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
  isReactTourActive: boolean;
}

export interface StateProps {
  isFirstLogin: boolean;
  isLoggedIn: boolean;
  sidePanelOpen: boolean;
  isAuthenticationOpen: boolean;
  isUserProfileModalOpen: boolean;
  isWelcomeModalOpen: boolean;
  logFile: string;
  player1DebugLog: string;
  player2DebugLog: string;
  isReactTourActive: boolean;
}

export interface DispatchProps {
  setIsAuthenticationOpen: (isAuthenticationOpen: boolean) => void;
  toggleReactTour: () => void;
  closeWelcomeModal: () => void;
}

export type Props = StateProps & DispatchProps;

export type DashboardActions = Omit<typeof DashboardActions, 'Type'>;

export interface DashboardStoreState {
  isReactTourActive: boolean;
  sidePanelTab: SidePanelTab;
  isWelcomeModalOpen: boolean;
}

export type DashboardStoreAction = ActionType<typeof actions>;
