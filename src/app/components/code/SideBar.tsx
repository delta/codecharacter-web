import { faCode, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as styles from 'app/styles/Sidebar.module.css';
import classnames from 'classnames';
import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

// tslint:disable-next-line:variable-name
export class Sidebar extends React.Component<Sidebar.Props, {}> {
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
            className={classnames('py-4 px-auto text-white', styles.customBtn)}
            onClick={() => sidePanelTab === SidePanelTab.NONE ? openSidePanelTab() : closeSidePanelTab() }
          >
            <FontAwesomeIcon icon={faCog} />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export namespace Sidebar {
  export interface StateProps {
    sidePanelTab: SidePanelTab;
  }

  export interface DispatchProps {
    closeSidePanelTab: () => void
    openSidePanelTab: () => void
  }

  export type Props = StateProps & DispatchProps;
}

export default Sidebar;
