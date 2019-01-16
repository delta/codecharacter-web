import { faCode, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as styles from 'app/styles/EditorPanel.module.css';
import classnames from 'classnames';
import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

// tslint:disable-next-line:variable-name
export class EditorPanel extends React.Component<EditorPanel.Props, {}> {
  public render() {
    const { sidePanelTab, setSidePanelTab } = this.props;
    return (
      <div className={classnames('h-100', styles.EditorPanel)}>
        <ButtonGroup
          vertical
          className={classnames(
            'w-100 justify-content-center align-items-center',
            styles.EditorPanel,
          )}
        >
          <Button className={classnames('py-4 px-auto text-white', styles.customBtn)}>
            <FontAwesomeIcon icon={faCode} />
          </Button>
          <Button
            className={classnames('py-4 px-auto text-white', styles.customBtn)}
            onClick={() => sidePanelTab === SidePanelTab.NONE ? setSidePanelTab(SidePanelTab.EDITOR_SETTINGS) : setSidePanelTab(SidePanelTab.NONE)}
          >
            <FontAwesomeIcon icon={faCog} />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export namespace EditorPanel {
  export interface StateProps {
    sidePanelTab: SidePanelTab;
  }

  export interface DispatchProps {
    setSidePanelTab: (setSidePanelTab: SidePanelTab) => void;
  }

  export type Props = StateProps & DispatchProps;
}

export default EditorPanel;
