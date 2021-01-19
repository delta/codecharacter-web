import {
  faBell,
  faBook,
  faCode,
  faCodeBranch,
  faCog,
  faInfoCircle,
  faQuestionCircle,
  faSignInAlt,
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

import Tooltip from '@material-ui/core/Tooltip';

export class Sidebar extends React.Component<SideBarInterfaces.Props, {}> {
  public render() {
    const {
      setIsAuthenticationOpen,
      isLoggedIn,
      sidePanelTab,
      closeSidePanelTab,
      openSidePanelTab,
      logout,
      clearAllLogs,
    } = this.props;
    return (
      <div className={classnames('h-100', styles.Sidebar)}>
        <ButtonGroup
          vertical
          className={classnames('w-100 justify-content-center align-items-center', styles.Sidebar)}
        >
          <Tooltip title="Code Character" placement="right">
            <Button
              className={classnames(
                'py-2 px-auto text-white d-flex justify-content-center',
                styles.customBtn,
              )}
              onClick={() => closeSidePanelTab()}
            >
              <FontAwesomeIcon icon={faCode} />
            </Button>
          </Tooltip>

          <Tooltip title="Docs" placement="right">
            <Button
              className={classnames('py-2 px-auto documentation-btn-ctrl', styles.customBtn, {
                [`${styles.customBtnActive}`]: sidePanelTab === SidePanelTab.DOCS,
              })}
              id="docs_button"
              onClick={() =>
                sidePanelTab !== SidePanelTab.DOCS
                  ? openSidePanelTab(SidePanelTab.DOCS)
                  : closeSidePanelTab()
              }
            >
              <FontAwesomeIcon icon={faBook} />
            </Button>
          </Tooltip>
          <Tooltip title="Editor Settings" placement="right">
            <Button
              className={classnames('py-2 px-auto editor-settings-btn-ctrl', styles.customBtn, {
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
          </Tooltip>
          <Tooltip title="Leaderboard" placement="right">
            <a
              href="/#/leaderboard"
              className={classnames('py-2 px-auto leaderboard-btn-ctrl', styles.customBtn, {
                [`${styles.customBtnActive}`]: sidePanelTab === SidePanelTab.LEADERBOARD,
              })}
              id="leaderboard_button"
              onClick={() => clearAllLogs()}
            >
              <FontAwesomeIcon icon={faTrophy} />
            </a>
          </Tooltip>
          {isLoggedIn ? (
            <Tooltip title="Commit Log" placement="right">
              <Button
                className={classnames('py-2 px-auto commitLog-btn-ctrl', styles.customBtn, {
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
            </Tooltip>
          ) : null}
          {isLoggedIn ? (
            <Tooltip title="Battle TV" placement="right">
              <Button
                className={classnames('py-2 px-auto match-btn-ctrl', styles.customBtn, {
                  [`${styles.customBtnActive}`]: sidePanelTab === SidePanelTab.MATCH,
                })}
                id="matchView_button"
                onClick={() => {
                  sidePanelTab !== SidePanelTab.MATCH
                    ? openSidePanelTab(SidePanelTab.MATCH)
                    : closeSidePanelTab();
                }}
              >
                <FontAwesomeIcon icon={faTv} />
              </Button>
            </Tooltip>
          ) : null}
          <Tooltip title="Notifications" placement="right">
            <Button
              className={classnames('py-2 px-auto notification-btn-ctrl', styles.customBtn, {
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
          </Tooltip>
          <Tooltip title={isLoggedIn ? 'Profile' : 'Login'} placement="right">
            <Button
              href={'/#/profile'}
              className={classnames('py-2 px-auto', styles.customBtn)}
              id="user_profile_button"
              onClick={() => {
                clearAllLogs();
                if (!isLoggedIn) {
                  setIsAuthenticationOpen(true);
                  return;
                }
              }}
            >
              <FontAwesomeIcon icon={isLoggedIn ? faUser : faSignInAlt} />
            </Button>
          </Tooltip>
          {isLoggedIn ? (
            <Tooltip title="Logout" placement="right">
              <Button
                className={classnames('py-2 px-auto', styles.customBtn)}
                id="logout_button"
                onClick={() => {
                  logout();
                  this.resetCompleteState();
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Button>
            </Tooltip>
          ) : null}
          <Tooltip title="Home" placement="right">
            <a
              className={classnames(
                'py-2 px-auto notification-btn-ctrl',
                styles.customBtn,
                styles.infoCircle,
              )}
              href="/#/home"
              onClick={() => clearAllLogs()}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </a>
          </Tooltip>
          <Tooltip title="Take a tour" placement="right">
            <Button
              className={classnames('py-2 px-auto', styles.joyRide)}
              id="joyride_button"
              onClick={() => this.props.toggleReactTour()}
            >
              <FontAwesomeIcon icon={faQuestionCircle} />
            </Button>
          </Tooltip>
          <Tooltip title="Made with ❤ by Delta Force" placement="right">
            <Button className={classnames('py-2 px-auto', styles.deltaLogo)} id="delta_logo">
              <a href="https://delta.nitt.edu" target="_blank">
                <img src="assets/img/deltaLogo.png" height={20} width={20} />
              </a>
            </Button>
          </Tooltip>
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
