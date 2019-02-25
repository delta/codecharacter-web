import { keyboardHandlers, themes } from 'app/components/code/Editor';
import * as styles from 'app/styles/EditorSettings.module.css';
import * as EditorSettingsInterfaces from 'app/types/code/EditorSettings';
import classnames from 'classnames';
import * as React from 'react';
import { Col, FormGroup, Grid, Row } from 'react-bootstrap';

export class EditorSettings extends React.Component<EditorSettingsInterfaces.Props, {}> {
  public render() {
    const {
      fontSize,
      changeFontSize,
      theme,
      changeTheme,
      changeKeyboardHandler,
      enableBasicAutoCompletion,
      toggleBasicAutoCompletion,
      enableSnippets,
      keyboardHandler,
      toggleSnippets,
    } = this.props;

    const fontSizeOptions = [];
    for (let i = 8; i <= 40; i += 2) {
      fontSizeOptions.push(i);
    }

    return (
      <Grid fluid={true} className={classnames(styles.EditorSettings)}>
        <Row className="justify-content-between py-2 pl-3">
          <Col className="text-light font-weight-bold my-auto">SETTINGS</Col>
        </Row>
        <Row>
          <Col sm={12} className={classnames('mb-1', styles.setting)}>
            <div className="font-weight-bold py-1">Font Size</div>
            <FormGroup controlId="fontSize">
              <select
                className={classnames(
                  'form-control',
                  styles.formControlSelect,
                  'font-size-control',
                )}
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
            <div className="font-weight-bold py-1">Editor Keybinding</div>
            <FormGroup controlId="keyboardHandler">
              <select
                className={classnames(
                  'form-control',
                  styles.formControlSelect,
                  'keyboardHandler-control',
                )}
                value={keyboardHandler}
                onChange={(e) => changeKeyboardHandler(e.target.value)}
              >
                {keyboardHandlers.map((keyboardHandlerOption: string) => (
                  <option value={keyboardHandlerOption} key={keyboardHandlerOption}>
                    {keyboardHandlerOption}
                  </option>
                ))}
              </select>
            </FormGroup>
          </Col>
          <Col sm={12} className={classnames('mb-1', styles.setting)}>
            <div className="font-weight-bold py-1">Basic Auto Completion</div>
            <FormGroup controlId="autoCompletion">
              <select
                className={classnames(
                  'form-control',
                  styles.formControlSelect,
                  'auto-complete-control',
                )}
                value={enableBasicAutoCompletion ? 'enabled' : 'disabled'}
                onChange={(e) =>
                  toggleBasicAutoCompletion(e.target.value === 'enabled' ? true : false)
                }
              >
                <option value={'enabled'} key={'enabled'}>
                  Enabled
                </option>
                <option value={'disabled'} key={'disabled'}>
                  Disabled
                </option>
              </select>
            </FormGroup>
          </Col>
          <Col sm={12} className={classnames('mb-1', styles.setting)}>
            <div className="font-weight-bold py-1">Snippets</div>
            <FormGroup controlId="snippets">
              <select
                className={classnames('form-control', styles.formControlSelect, 'snippets-control')}
                value={enableSnippets ? 'enabled' : 'disabled'}
                onChange={(e) => toggleSnippets(e.target.value === 'enabled' ? true : false)}
              >
                <option value={'enabled'} key={'enabled'}>
                  Enabled
                </option>
                <option value={'disabled'} key={'disabled'}>
                  Disabled
                </option>
              </select>
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}
