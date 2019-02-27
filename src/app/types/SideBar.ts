import { SidePanelTab } from 'app/reducers/Dashboard';

export interface StateProps {
  isLoggedIn: boolean;
  sidePanelTab: SidePanelTab;
}

export interface OwnProps {
  toggleJoyRide: () => void;
}

export interface DispatchProps {
  closeSidePanelTab: () => void;
  logout: () => void;
  openSidePanelTab: (type: SidePanelTab) => void;
  resetAppState: () => void;
  toggleUserProfileModal: (isUserProfileModalOpen: boolean) => void;
}

export type Props = OwnProps & StateProps & DispatchProps;
