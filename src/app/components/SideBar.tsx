import {
  faBell,
  faCode,
  faCodeBranch,
  faCog,
  faInfoCircle,
  faSignOutAlt,
  faTrophy,
  faTv,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as styles from 'app/styles/Sidebar.module.css';
import * as SideBarInterfaces from 'app/types/SideBar';
import classnames from 'classnames';
import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export class Sidebar extends React.Component<SideBarInterfaces.Props, {}> {
  public render() {
    const {
      sidePanelTab,
      closeSidePanelTab,
      openSidePanelTab,
      logout,
      toggleUserProfileModal,
    } = this.props;
    return (
      <div className={classnames('h-100', styles.Sidebar)}>
        <ButtonGroup
          vertical
          className={classnames('w-100 justify-content-center align-items-center', styles.Sidebar)}
        >
          <Button className={classnames('py-3 px-auto text-white', styles.customBtn)}>
            <FontAwesomeIcon icon={faCode} />
          </Button>
          <Button
            className={classnames('py-3 px-auto editor-settings-btn-ctrl', styles.customBtn, {
              [`${styles.customBtnActive}`]: sidePanelTab === SidePanelTab.EDITOR_SETTINGS,
            })}
            id="editor_settings_button"
            onClick={() =>
              sidePanelTab !== SidePanelTab.EDITOR_SETTINGS
                ? openSidePanelTab(SidePanelTab.EDITOR_SETTINGS)
                : closeSidePanelTab()
            }
          >
            <FontAwesomeIcon icon={faCog} />
          </Button>
          <Button
            className={classnames('py-3 px-auto leaderboard-btn-ctrl', styles.customBtn, {
              [`${styles.customBtnActive}`]: sidePanelTab === SidePanelTab.LEADERBOARD,
            })}
            id="leaderboard_button"
            onClick={() =>
              sidePanelTab !== SidePanelTab.LEADERBOARD
                ? openSidePanelTab(SidePanelTab.LEADERBOARD)
                : closeSidePanelTab()
            }
          >
            <FontAwesomeIcon icon={faTrophy} />
          </Button>
          <Button
            className={classnames('py-3 px-auto commitLog-btn-ctrl', styles.customBtn, {
              [`${styles.customBtnActive}`]: sidePanelTab === SidePanelTab.COMMIT_LOG,
            })}
            id="commit_log_button"
            onClick={() =>
              sidePanelTab !== SidePanelTab.COMMIT_LOG
                ? openSidePanelTab(SidePanelTab.COMMIT_LOG)
                : closeSidePanelTab()
            }
          >
            <FontAwesomeIcon icon={faCodeBranch} />
          </Button>
          <Button
            className={classnames('py-3 px-auto match-btn-ctrl', styles.customBtn, {
              [`${styles.customBtnActive}`]: sidePanelTab === SidePanelTab.MATCH,
            })}
            onClick={() =>
              sidePanelTab !== SidePanelTab.MATCH
                ? openSidePanelTab(SidePanelTab.MATCH)
                : closeSidePanelTab()
            }
          >
            <FontAwesomeIcon icon={faTv} />
          </Button>
          <Button
            className={classnames('py-3 px-auto notification-btn-ctrl', styles.customBtn, {
              [`${styles.customBtnActive}`]: sidePanelTab === SidePanelTab.NOTIFICATION,
            })}
            id="notifications_button"
            onClick={() =>
              sidePanelTab !== SidePanelTab.NOTIFICATION
                ? openSidePanelTab(SidePanelTab.NOTIFICATION)
                : closeSidePanelTab()
            }
          >
            <FontAwesomeIcon icon={faBell} />
          </Button>
          <Button
            className={classnames('py-3 px-auto', styles.customBtn)}
            id="user_profile_button"
            onClick={() => {
              toggleUserProfileModal(true);
            }}
          >
            <FontAwesomeIcon icon={faUser} />
          </Button>
          <Button
            className={classnames('py-3 px-auto', styles.customBtn)}
            id="logout_button"
            onClick={() => {
              logout();
              this.resetCompleteState();
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Button>
          <Button
            className={classnames('py-3 px-auto', styles.joyRide)}
            id="joyride_button"
            onClick={() => this.props.toggleJoyRide()}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  private resetCompleteState = (): void => {
    const { resetAppState } = this.props;
    resetAppState();
  };
}

export default Sidebar;
