import Authentication from 'app/containers/Authentication';
import CodeStatus from 'app/containers/code/CodeStatus';
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

export class Dashboard extends React.Component<
  DashboardInterfaces.Props,
  DashboardInterfaces.State
> {
  public sideBarWidth = 50;
  public sidePanelWidth = 350;
  public minEditorWidth = 350;

  constructor(props: DashboardInterfaces.Props) {
    super(props);
    /* 40% of Window width is taken up by Editor Component */
    const initialEditorWidth = Math.max(Math.floor(0.4 * window.innerWidth), this.minEditorWidth);
    this.state = {
      /* Ratio of editor width with total window width */
      editorRatio: initialEditorWidth / window.innerWidth,
      editorWidth: initialEditorWidth,
      /* SideBar width + SidePanel width(if open). Defaults to 50px (Sidebar width). 50px + 350px if SidePanel is open. */
      exhaustedLeftPartitionWidth: this.sideBarWidth,
      /* Left Split Pane width = SideBar width + ?SidePanel width + Editor width */
      leftPartitionWidth: initialEditorWidth + this.sideBarWidth,
    };

    if (window.addEventListener) {
      window.addEventListener('resize', this.setEditorWidth, true);
    }
  }

  public componentWillReceiveProps(nextProps: DashboardInterfaces.Props) {
    const { sidePanelOpen } = nextProps;
    sidePanelOpen ? this.onToggleSidePanel(true) : this.onToggleSidePanel(false);
  }

  public render() {
    const { editorWidth, leftPartitionWidth } = this.state;
    const { isLoggedIn } = this.props;
    return (
      <div>
        {!isLoggedIn ? <Authentication /> : null}
        <SplitPane
          split="vertical"
          minSize={
            this.minEditorWidth +
            (this.props.sidePanelOpen ? this.sidePanelWidth : 0) +
            this.sideBarWidth
          }
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
                <CodeStatus width={editorWidth} />
                <Editor editorWidth={editorWidth} />
              </div>
            </Row>
          </Grid>
          <SplitPane split="horizontal" defaultSize={300} resizerClassName={style.horizontal}>
            <Grid fluid={true}>
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

  private setEditorWidth = () => {
    const editorWidth = Math.max(
      this.state.editorRatio * (window.innerWidth - this.state.exhaustedLeftPartitionWidth),
      this.minEditorWidth,
    );
    this.setState({
      editorWidth,
      leftPartitionWidth: editorWidth + this.state.exhaustedLeftPartitionWidth,
    });
  };

  private onResize = (size: number): void => {
    const editorWidth = Math.max(
      size - this.state.exhaustedLeftPartitionWidth,
      this.minEditorWidth,
    );
    this.setState({
      editorWidth,
      editorRatio: editorWidth / (window.innerWidth - this.state.exhaustedLeftPartitionWidth),
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
    const editorWidth = Math.max(Math.floor(editorRatio * availableWidth), this.minEditorWidth);
    const leftPartitionWidth = exhaustedLeftPartitionWidth + editorWidth;

    this.setState({
      editorRatio,
      editorWidth,
      exhaustedLeftPartitionWidth,
      leftPartitionWidth,
    });
  };
}
