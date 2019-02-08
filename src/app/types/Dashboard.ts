import { DashboardActions } from 'app/actions';
import { SidePanelTab } from 'app/reducers/Dashboard';
import { ActionType } from 'typesafe-actions';

const actions = {
  setSidePanelTab: DashboardActions.setSidePanelTab,
};

export interface State {
  editorWidth: number;
  editorWidthRatio: number;
  fixedLeftPaneWidth: number;
  isEditorOpen: boolean;
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
