import { faCode, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/EditorPanel.module.css';
import classnames from 'classnames';
import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

// tslint:disable-next-line:variable-name
export class EditorPanel extends React.Component<EditorPanel.Props, {}> {
  public render() {
    const { showCustomizationPanel, toggleCustomizationPanel } = this.props
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
            onClick={() => toggleCustomizationPanel(!showCustomizationPanel)}
          >
            <FontAwesomeIcon icon={faCog} />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
};

export namespace EditorPanel {
  export interface StateProps {
    showCustomizationPanel: boolean;
  }

  export interface DispatchProps {
    toggleCustomizationPanel: (showCustomizationPanel: boolean) => void;
  }

  export type Props = StateProps & DispatchProps;
}

export default EditorPanel;
