import { SidePanelTab } from 'app/reducers/Dashboard';

export interface StateProps {
  sidePanelTab: SidePanelTab;
}

export interface OwnProps {
  toggleJoyRide: () => void;
}

export interface DispatchProps {
  closeSidePanelTab: () => void;
  logout: () => void;
  openSidePanelTab: (type: SidePanelTab) => void;
  resetCodeState: () => void;
  resetEditorState: () => void;
  resetSubmissionState: () => void;
  resetDashboardState: () => void;
  resetGameLogState: () => void;
  resetLeaderboardState: () => void;
  resetNotificationState: () => void;
  resetUserState: () => void;
  toggleUserProfileModal: (isUserProfileModalOpen: boolean) => void;
}

export type Props = OwnProps & StateProps & DispatchProps;
