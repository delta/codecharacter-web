import Editor from 'app/containers/code/Editor';
import EditorSettings from 'app/containers/code/EditorSettings';
import GameLog from 'app/containers/code/GameLog';
import Sidebar from 'app/containers/code/Sidebar';
import * as style from 'app/styles/Dashboard.css';
import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';
/* tslint:disable-next-line:import-name */
import SplitPane from 'react-split-pane';

export class Dashboard extends React.Component<{}, Dashboard.State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      editorWidth: 450,
      leftPartitionWidth: 500,
      usedUpLeftPartitionWidth: 50,
    };
  }

  public render() {
    const { editorWidth } = this.state;

    return (
      <div>
        <SplitPane
          split="vertical"
          minSize={500}
          defaultSize={500}
          resizerClassName={style.vertical}
          onChange={this.onResize}
        >
          <Grid fluid={true}>
            <Row>
              <div
                style={{
                  height: '100vh',
                }}
              >
                <Sidebar />
              </div>
              <EditorSettings
                onShowEditorSettings={this.onShowEditorSettings}
                onHideEditorSettings={this.onHideEditorSettings}
              />
              <div
                style={{
                  height: '100vh',
                }}
              >
                <Editor editorWidth={editorWidth} />
              </div>
            </Row>
          </Grid>
          <SplitPane split="horizontal" defaultSize={300} resizerClassName={style.horizontal}>
            <div />
            <GameLog />
          </SplitPane>
        </SplitPane>
      </div>
    );
  }

  private onResize = (size: number): void => {
    this.setState({
      editorWidth: size - this.state.usedUpLeftPartitionWidth,
      leftPartitionWidth: size,
    });
  };
  /* Sidebar width: 50px, Settings width: 350px, force update and rerender Editor by updating editorWidth */
  private onShowEditorSettings = (): void => {
    this.setState({
      editorWidth: this.state.leftPartitionWidth - 400,
      usedUpLeftPartitionWidth: 400,
    });
  };
  private onHideEditorSettings = (): void => {
    this.setState({
      editorWidth: this.state.leftPartitionWidth - 50,
      usedUpLeftPartitionWidth: 50,
    });
  };
}
export namespace Dashboard {
  export interface State {
    editorWidth: number;
    leftPartitionWidth: number;
    usedUpLeftPartitionWidth: number;
  }
}
