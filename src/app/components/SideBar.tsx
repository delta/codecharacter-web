import { faCode, faCodeBranch, faCog, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as styles from 'app/styles/Sidebar.module.css';
import * as SideBarInterfaces from 'app/types/SideBar';
import classnames from 'classnames';
import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export class Sidebar extends React.Component<SideBarInterfaces.Props, {}> {
  public render() {
    const { sidePanelTab, closeSidePanelTab, openSidePanelTab } = this.props;
    return (
      <div className={classnames('h-100', styles.Sidebar)}>
        <ButtonGroup
          vertical
          className={classnames('w-100 justify-content-center align-items-center', styles.Sidebar)}
        >
          <Button className={classnames('py-4 px-auto text-white h2', styles.customBtn)}>
            <FontAwesomeIcon icon={faCode} />
          </Button>
          <Button
            className={classnames('py-4 px-auto editor-settings-btn-ctrl', styles.customBtn, {
              [`${styles.customBtnActive}`]: sidePanelTab === SidePanelTab.EDITOR_SETTINGS,
            })}
            onClick={() =>
              sidePanelTab !== SidePanelTab.EDITOR_SETTINGS
                ? openSidePanelTab(SidePanelTab.EDITOR_SETTINGS)
                : closeSidePanelTab()
            }
          >
            <FontAwesomeIcon icon={faCog} />
          </Button>
          <Button
            className={classnames('py-4 px-auto leaderboard-btn-ctrl', styles.customBtn, {
              [`${styles.customBtnActive}`]: sidePanelTab === SidePanelTab.LEADERBOARD,
            })}
            onClick={() =>
              sidePanelTab !== SidePanelTab.LEADERBOARD
                ? openSidePanelTab(SidePanelTab.LEADERBOARD)
                : closeSidePanelTab()
            }
          >
            <FontAwesomeIcon icon={faTrophy} />
          </Button>
          <Button
            className={classnames('py-4 px-auto commitlog-btn-ctrl', styles.customBtn, {
              [`${styles.customBtnActive}`]: sidePanelTab === SidePanelTab.COMMIT_LOG,
            })}
            onClick={() =>
              sidePanelTab !== SidePanelTab.COMMIT_LOG
                ? openSidePanelTab(SidePanelTab.COMMIT_LOG)
                : closeSidePanelTab()
            }
          >
            <FontAwesomeIcon icon={faCodeBranch} />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Sidebar;
