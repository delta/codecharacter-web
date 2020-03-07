import { SidePanelTab } from 'app/reducers/Dashboard';
import { Notification } from 'app/types/Notification';

export interface StateProps {
  isLoggedIn: boolean;
  notifications: Notification[];
  sidePanelTab: SidePanelTab;
}

export interface OwnProps {
  toggleReactTour: () => void;
  setIsAuthenticationOpen: (isAuthenticationOpen: boolean) => void;
}

export interface DispatchProps {
  closeSidePanelTab: () => void;
  logout: () => void;
  openSidePanelTab: (type: SidePanelTab) => void;
  resetAppState: () => void;
  toggleUserProfileModal: (isUserProfileModalOpen: boolean) => void;
  clearAllLogs: () => void;
}

export type Props = OwnProps & StateProps & DispatchProps;
