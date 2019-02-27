import { Docs } from 'app/components/Docs';
import CommitLog from 'app/containers/code/CommitLog';
import EditorSettings from 'app/containers/code/EditorSettings';
import Leaderboard from 'app/containers/Leaderboard';
// tslint:disable-next-line:import-name
import Match from 'app/containers/MatchView';
import Notification from 'app/containers/Notification';
import UserProfileModal from 'app/containers/UserProfileModal';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as styles from 'app/styles/SidePanel.module.css';
import classnames from 'classnames';
import * as React from 'react';

export class SidePanel extends React.Component<SidePanel.Props, {}> {
  public render() {
    const { sidePanelTab, sidePanelWidth } = this.props;
    let sidePanel = <div className={classnames(styles.SidePanel)} />;
    switch (sidePanelTab) {
      case SidePanelTab.NONE:
        sidePanel = <div className={classnames(styles.SidePanel)} />;
        break;
      case SidePanelTab.EDITOR_SETTINGS:
        sidePanel = <EditorSettings />;
        break;
      case SidePanelTab.LEADERBOARD:
        sidePanel = <Leaderboard />;
        break;
      case SidePanelTab.COMMIT_LOG:
        sidePanel = <CommitLog />;
        break;
      case SidePanelTab.NOTIFICATION:
        sidePanel = <Notification />;
        break;
      case SidePanelTab.MATCH:
        sidePanel = <Match />;
        break;
      case SidePanelTab.USER_EDIT:
        sidePanel = <UserProfileModal />;
        break;
      case SidePanelTab.DOCS:
        sidePanel = <Docs />;
    }
    return sidePanelTab === SidePanelTab.NONE ? (
      sidePanel
    ) : (
      <div
        className={classnames(styles.SidePanel)}
        style={{
          width: `${sidePanelWidth}px`,
        }}
      >
        {sidePanel}
      </div>
    );
  }
}

export namespace SidePanel {
  export interface StateProps {
    sidePanelTab: SidePanelTab;
  }

  export interface OwnProps {
    sidePanelWidth: number;
  }

  export type Props = StateProps & OwnProps;
}
