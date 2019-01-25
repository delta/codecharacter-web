import { DashboardActions } from 'app/actions';
import { SidePanelTab } from 'app/reducers/Dashboard';
import { ActionType } from 'typesafe-actions';

const actions = {
  setSidePanelTab: DashboardActions.setSidePanelTab,
};

export interface State {
  editorWidth: number;
  leftPartitionWidth: number;
  exhaustedLeftPartitionWidth: number;
}

export interface StateProps {
  sidePanelOpen: boolean;
}

export type Props = StateProps;

export type DashboardActions = Omit<typeof DashboardActions, 'Type'>;

export interface DashboardStoreState {
  sidePanelTab: SidePanelTab;
}

export type DashboardStoreAction = ActionType<typeof actions>;
