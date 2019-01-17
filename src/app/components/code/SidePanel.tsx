import EditorSettings from 'app/containers/code/EditorSettings';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as React from 'react';

// tslint:disable-next-line:variable-name
export class SidePanel extends React.Component<SidePanel.Props, {}> {
  public componentWillReceiveProps(nextProps: SidePanel.Props) {
    const { sidePanelTab, onShowSidePanel, onHideSidePanel } = nextProps;
    if (sidePanelTab === 'EDITOR_SETTINGS') {
      onShowSidePanel();
    } else {
      onHideSidePanel();
    }
  }
  public render() {
    const { sidePanelTab } = this.props;
    let sidePanel = (
      <div
        className="SidePanel"
        style={{
          backgroundColor: '#1c1c1c',
          height: '100vh',
        }}
      />
    )
    switch (sidePanelTab) {
      case SidePanelTab.NONE:
        sidePanel = (
          <div
            className="SidePanel"
            style={{
              backgroundColor: '#1c1c1c',
              height: '100vh',
            }}
          />
        )
        break;
      case SidePanelTab.EDITOR_SETTINGS:
        sidePanel = (
          <EditorSettings/>
        )
        break;
      default:
        sidePanel = (
          <div
            className="SidePanel"
            style={{
              backgroundColor: '#1c1c1c',
              height: '100vh',
            }}
          />
        )
    }
    return sidePanel
  }
}

export namespace SidePanel {

  export interface OwnProps {
    onShowSidePanel: () => void
    onHideSidePanel: () => void
  }

  export interface StateProps {
    sidePanelTab: SidePanelTab;
  }

  export type Props = OwnProps & StateProps & {};
}
