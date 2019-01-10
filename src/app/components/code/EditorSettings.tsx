import { themes } from 'app/components/code/Editor';
import { SidePanelTab } from 'app/reducers/Dashboard';
import * as styles from 'app/styles/EditorSettings.module.css';
import classnames from 'classnames';
import * as React from 'react';
import { Col, FormGroup, Grid, Row } from 'react-bootstrap';

// tslint:disable-next-line:variable-name
export class EditorSettings extends React.Component<EditorSettings.Props, {}> {
  public componentWillReceiveProps(nextProps: EditorSettings.Props) {
    const { sidePanelTab, onShowEditorSettings, onHideEditorSettings } = nextProps;
    if (sidePanelTab === 'EDITOR_SETTINGS') {
      onShowEditorSettings();
    } else {
      onHideEditorSettings();
    }
  }

  public render() {
    const {
      fontSize,
      changeFontSize,
      theme,
      changeTheme,
      basicAutoCompletion,
      enableAutoCompletion,
      snippets,
      enableSnippets,
    } = this.props;

    const fontSizeOptions = [];
    for (let i = 8; i <= 40; i += 2) {
      fontSizeOptions.push(i);
    }

    return (
      <div
        style={{
          backgroundColor: '#1c1c1c',
          height: '100vh',
        }}
      >
        <Grid fluid={true} className={classnames(styles.EditorSettings)}>
          <Row className="justify-content-between py-2 pl-3">
            <Col className="text-light font-weight-bold my-auto">SETTINGS</Col>
          </Row>
          <Row>
            <Col sm={12} className={classnames('mb-1', styles.setting)}>
              <div className="font-weight-bold py-1">Font Size</div>
              <p>The size of text in the code editor</p>
              <FormGroup controlId="fontSize">
                <select
                  className={classnames('form-control', styles.formControlSelect, 'font-size-control')}
                  value={fontSize}
                  onChange={(e) => changeFontSize(Number(e.target.value))}
                >
                  {fontSizeOptions.map((font: number) => (
                    <option value={font} key={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
            <Col sm={12} className={classnames('mb-1', styles.setting)}>
              <div className="font-weight-bold py-1">Editor Theme</div>
              <p>The syntax and overall theme of the code editor</p>
              <FormGroup controlId="theme">
                <select
                  className={classnames('form-control', styles.formControlSelect, 'theme-control')}
                  value={theme}
                  onChange={(e) => changeTheme(e.target.value)}
                >
                  {themes.map((themeValue: string) => (
                    <option value={themeValue} key={themeValue}>
                      {themeValue}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
            <Col sm={12} className={classnames('mb-1', styles.setting)}>
              <div className="font-weight-bold py-1">Auto Completion</div>
              <p>Use basic auto code completion in the editor</p>
              <FormGroup controlId="autoCompletion">
                <select
                  className={classnames('form-control', styles.formControlSelect, 'auto-complete-control')}
                  value={basicAutoCompletion ? 'enabled' : 'disabled'}
                  onChange={(e) =>
                    enableAutoCompletion(e.target.value === 'enabled' ? true : false)
                  }
                >
                  <option value={'enabled'} key={'enabled'}>Enabled</option>
                  <option value={'disabled'} key={'disabled'}>Disabled</option>
                </select>
              </FormGroup>
            </Col>
            <Col sm={12} className={classnames('mb-1', styles.setting)}>
              <div className="font-weight-bold py-1">Snippets</div>
              <p>Use code snippets in editor</p>
              <FormGroup controlId="snippets">
                <select
                  className={classnames('form-control', styles.formControlSelect, 'snippets-control')}
                  value={snippets ? 'enabled' : 'disabled'}
                  onChange={(e) => enableSnippets(e.target.value === 'enabled' ? true : false)}
                >
                  <option value={'enabled'} key={'enabled'}>Enabled</option>
                  <option value={'disabled'} key={'disabled'}>Disabled</option>
                </select>
              </FormGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}


export namespace EditorSettings {
  export interface OwnProps {
    onShowEditorSettings: () => void;
    onHideEditorSettings: () => void;
  }

  export interface StateProps {
    basicAutoCompletion: boolean;
    fontSize: number;
    theme: string;
    snippets: boolean;
    sidePanelTab: SidePanelTab;
  }

  export interface DispatchProps {
    changeFontSize: (fontSize: number) => void;
    changeTheme: (theme: string) => void;
    enableAutoCompletion: (basicAutoCompletion: boolean) => void;
    enableSnippets: (snippets: boolean) => void;
  }

  export type Props = OwnProps & StateProps & DispatchProps;
}
