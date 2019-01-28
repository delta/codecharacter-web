import Editor from 'app/containers/code/Editor';
import GameLog from 'app/containers/GameLog';
import SideBar from 'app/containers/SideBar';
import SidePanel from 'app/containers/SidePanel';
import SubmitBar from 'app/containers/SubmitBar';
import * as style from 'app/styles/Dashboard.css';
import * as DashboardInterfaces from 'app/types/Dashboard';
import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';
/* tslint:disable-next-line:import-name */
import SplitPane from 'react-split-pane';
import { Authentication } from './Authentication';

export class Dashboard extends React.Component<
  DashboardInterfaces.Props,
  DashboardInterfaces.State
> {
  public sideBarWidth = 50;
  public sidePanelWidth = 350;
  public minEditorWidth = 400;

  constructor(props: DashboardInterfaces.Props) {
    super(props);
    this.state = {
      /* 40% of Window width is taken up by Editor Component */
      editorWidth: Math.max(Math.floor(0.4 * window.innerWidth), this.minEditorWidth),
      /* SideBar width + SidePanel width(if open). Defaults to 50px (Sidebar width). 50px + 350px if SidePanel is open. */
      exhaustedLeftPartitionWidth: this.sideBarWidth,
      /* Left Split Pane width = SideBar width + ?SidePanel width + Editor width */
      leftPartitionWidth:
        Math.max(Math.floor(0.4 * window.innerWidth), this.minEditorWidth) + this.sideBarWidth,
    };
  }

  public componentWillReceiveProps(nextProps: DashboardInterfaces.Props) {
    const { sidePanelOpen } = nextProps;
    sidePanelOpen ? this.onToggleSidePanel(true) : this.onToggleSidePanel(false);
  }

  public render() {
    const { editorWidth, leftPartitionWidth } = this.state;

    return (
      <div>
        <Authentication />
        <SplitPane
          split="vertical"
          minSize={400}
          defaultSize={this.state.leftPartitionWidth}
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
                <SideBar />
              </div>
              <SidePanel sidePanelWidth={this.sidePanelWidth} />
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
            <Grid>
              <Row>
                <SubmitBar />
              </Row>
            </Grid>
            <GameLog />
          </SplitPane>
        </SplitPane>
      </div>
    );
  }

  private onResize = (size: number): void => {
    this.setState({
      editorWidth: size - this.state.exhaustedLeftPartitionWidth,
      leftPartitionWidth: size,
    });
  };

  /* Sidebar width: 50px, Settings width: 350px, force update and rerender Editor by updating editorWidth */
  private onToggleSidePanel = (isSidePanelOpen: boolean): void => {
    let availableWidth = window.innerWidth - this.state.exhaustedLeftPartitionWidth;
    const exhaustedLeftPartitionWidth = isSidePanelOpen
      ? this.sideBarWidth + this.sidePanelWidth
      : this.sideBarWidth;
    const editorRatio = this.state.editorWidth / availableWidth;
    availableWidth = window.innerWidth - exhaustedLeftPartitionWidth;
    const editorWidth = Math.floor(editorRatio * availableWidth);
    const leftPartitionWidth = exhaustedLeftPartitionWidth + editorWidth;

    this.setState({
      editorWidth,
      exhaustedLeftPartitionWidth,
      leftPartitionWidth,
    });
  };
}
