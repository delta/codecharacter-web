import CommitLog from 'app/containers/code/CommitLog';
import EditorSettings from 'app/containers/code/EditorSettings';
import Leaderboard from 'app/containers/Leaderboard';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as React from 'react';

export class SidePanel extends React.Component<SidePanel.Props, {}> {
  public render() {
    const { sidePanelTab, sidePanelWidth } = this.props;
    let sidePanel = <div className="SidePanel" />;
    switch (sidePanelTab) {
      case SidePanelTab.NONE:
        sidePanel = <div className="SidePanel" />;
        break;
      case SidePanelTab.EDITOR_SETTINGS:
        sidePanel = (
          <div
            className="SidePanel"
            style={{
              backgroundColor: '#1c1c1c',
              height: '100vh',
              width: `${sidePanelWidth}px`,
            }}
          >
            <EditorSettings />
          </div>
        );
        break;
      case SidePanelTab.LEADERBOARD:
        sidePanel = (
          <div
            className="SidePanel"
            style={{
              backgroundColor: '#1c1c1c',
              height: '100vh',
              width: `${sidePanelWidth}px`,
            }}
          >
            <Leaderboard />
          </div>
        );
        break;
      case SidePanelTab.COMMIT_LOG:
        sidePanel = (
          <div
            className="SidePanel"
            style={{
              backgroundColor: '#1c1c1c',
              height: '100vh',
              width: `${sidePanelWidth}px`,
            }}
          >
            <CommitLog />
          </div>
        );
        break;
    }
    return sidePanel;
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
