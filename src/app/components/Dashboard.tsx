import Editor from 'app/containers/code/Editor';
import GameLog from 'app/containers/code/GameLog';
import Sidebar from 'app/containers/code/Sidebar';
import SidePanel from 'app/containers/code/SidePanel';
import * as style from 'app/styles/Dashboard.css';
import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';
/* tslint:disable-next-line:import-name */
import SplitPane from 'react-split-pane';

export class Dashboard extends React.Component<{}, Dashboard.State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      editorWidth: 675,
      leftPartitionWidth: 725,
      usedUpLeftPartitionWidth: 50,
    };
  }

  public render() {
    const { editorWidth, leftPartitionWidth } = this.state;

    return (
      <div>
        <SplitPane
          split="vertical"
          minSize={500}
          defaultSize={725}
          size={leftPartitionWidth}
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
              <SidePanel
                onShowSidePanel={this.onShowSidePanel}
                onHideSidePanel={this.onHideSidePanel}
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
  private onShowSidePanel = (): void => {
    let  availableWidth = window.innerWidth - this.state.usedUpLeftPartitionWidth
    const usedUpLeftPartitionWidth = 400
    const editorRatio = this.state.editorWidth / availableWidth;
    availableWidth = window.innerWidth - usedUpLeftPartitionWidth
    const editorWidth = Math.floor(editorRatio * availableWidth)
    const leftPartitionWidth = usedUpLeftPartitionWidth + editorWidth

    this.setState({
      editorWidth,
      leftPartitionWidth,
      usedUpLeftPartitionWidth
    })
  };

  private onHideSidePanel = (): void => {
    let  availableWidth = window.innerWidth - this.state.usedUpLeftPartitionWidth
    const usedUpLeftPartitionWidth = 50
    const editorRatio = this.state.editorWidth / availableWidth;
    availableWidth = window.innerWidth - usedUpLeftPartitionWidth
    const editorWidth = Math.floor(editorRatio * availableWidth)
    const leftPartitionWidth = usedUpLeftPartitionWidth + editorWidth

    this.setState({
      editorWidth,
      leftPartitionWidth,
      usedUpLeftPartitionWidth
    })
  };
}
export namespace Dashboard {
  export interface State {
    editorWidth: number;
    leftPartitionWidth: number;
    usedUpLeftPartitionWidth: number;
  }
}
