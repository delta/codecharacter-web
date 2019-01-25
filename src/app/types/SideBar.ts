import { SidePanelTab } from 'app/reducers/Dashboard';

export interface StateProps {
  sidePanelTab: SidePanelTab;
}

export interface DispatchProps {
  closeSidePanelTab: () => void;
  openEditorSettings: () => void;
  openLeaderboard: () => void;
}

export type Props = StateProps & DispatchProps;
