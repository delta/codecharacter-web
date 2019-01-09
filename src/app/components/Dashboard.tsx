import Editor from 'app/containers/code/Editor';
import EditorPanel from 'app/containers/code/EditorPanel';
import EditorSettingsModal from 'app/containers/code/EditorSettingsModal';
import GameLog from 'app/containers/code/GameLog';
import * as style from 'app/styles/Dashboard.css';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
/* tslint:disable-next-line:import-name */
import SplitPane from 'react-split-pane';

export class Dashboard extends React.Component<{}, Dashboard.State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      leftPartitionWidth: 600,
    };
  }

  public render() {
    const { leftPartitionWidth } = this.state;
    return (
      <div>
        <div
          className="h-100"
          style={{
            display: 'inline',
            position: 'absolute',
            width: '50px',
          }}
        >
          <EditorPanel />
        </div>
        <SplitPane
          split="vertical"
          minSize={400}
          defaultSize={600}
          resizerClassName={style.vertical}
          onChange={this.onChange}
          style={{
            marginLeft: '50px',
          }}
        >
          <Grid fluid={true} className="h-100">
            <Row className="h-100">
              <Col sm={12} md={12} lg={12} className="h-100 p-0">
                <Editor editorWidth={leftPartitionWidth} />
                <EditorSettingsModal />
              </Col>
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

  private onChange = (size: number): void => {
    this.setState({
      leftPartitionWidth: size,
    });
  };
}
export namespace Dashboard {
  export interface State {
    leftPartitionWidth: number;
  }
}
