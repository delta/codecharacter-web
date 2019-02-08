import Authentication from 'app/containers/Authentication';
import CodeStatus from 'app/containers/code/CodeStatus';
import Editor from 'app/containers/code/Editor';
import GameLog from 'app/containers/GameLog';
import SideBar from 'app/containers/SideBar';
import SidePanel from 'app/containers/SidePanel';
import SocketHandler from 'app/containers/SocketHandler';
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
  public minRendererWidth = 20;
  public initialEditorRatio = 0.4;

  constructor(props: DashboardInterfaces.Props) {
    super(props);

    const fixedLeftPaneWidth =
      this.sideBarWidth + (this.props.sidePanelOpen ? this.sidePanelWidth : 0);
    const resizeableWidth = window.innerWidth - fixedLeftPaneWidth;
    const initialEditorWidth = this.initialEditorRatio * resizeableWidth;

    this.state = {
      fixedLeftPaneWidth,
      editorWidth: initialEditorWidth,
      editorWidthRatio: this.initialEditorRatio,
      isEditorOpen: true,
    };

    if (window.addEventListener) {
      window.addEventListener('resize', this.onWindowResize, true);
    }
  }

  public componentWillReceiveProps(nextProps: DashboardInterfaces.Props) {
    const { sidePanelOpen } = nextProps;
    sidePanelOpen ? this.onToggleSidePanel(true) : this.onToggleSidePanel(false);
  }

  public render() {
    let { editorWidth } = this.state;
    const { isLoggedIn } = this.props;
    editorWidth = Math.max(editorWidth, this.minEditorWidth);

    return (
      <div>
        {!isLoggedIn ? <Authentication /> : null}
        {isLoggedIn ? <SocketHandler /> : null}
        <SplitPane
          split="vertical"
          minSize={
            (this.state.isEditorOpen ? this.minEditorWidth : 0) + this.state.fixedLeftPaneWidth
          }
          maxSize={window.innerWidth - this.minRendererWidth}
          size={(this.state.isEditorOpen ? editorWidth : 0) + this.state.fixedLeftPaneWidth}
          resizerClassName={style.vertical}
          onChange={this.onSplitPaneResize}
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
                {this.state.isEditorOpen ? <Editor editorWidth={editorWidth} /> : null}
              </div>
            </Row>
          </Grid>
          <SplitPane split="horizontal" defaultSize={300} resizerClassName={style.horizontal}>
            <Grid fluid={true}>
              <Row>
                <SubmitBar
                  toggleEditor={this.onEditorToggle}
                  isEditorOpen={this.state.isEditorOpen}
                />
              </Row>
            </Grid>
            <GameLog />
          </SplitPane>
        </SplitPane>
      </div>
    );
  }

  private onWindowResize = () => {
    const resizeableWidth = window.innerWidth - this.state.fixedLeftPaneWidth;
    const editorWidth = this.state.editorWidthRatio * resizeableWidth;
    this.setState({
      editorWidth,
    });
  };

  private onEditorToggle = (): void => {
    this.setState({
      isEditorOpen: !this.state.isEditorOpen,
    });

    if (this.state.isEditorOpen) {
      const availableWidth = window.innerWidth - this.state.fixedLeftPaneWidth;
      const editorWidth = this.state.editorWidthRatio * availableWidth;
      this.setState({
        editorWidth,
      });
    }
  };

  private onSplitPaneResize = (leftPaneSize: number): void => {
    const editorWidth = leftPaneSize - this.state.fixedLeftPaneWidth;
    const resizeableWidth = window.innerWidth - this.state.fixedLeftPaneWidth;
    this.setState({
      editorWidth,
      editorWidthRatio: editorWidth / resizeableWidth,
    });
  };

  private onToggleSidePanel = (isSidePanelOpen: boolean): void => {
    const fixedLeftPaneWidth = this.sideBarWidth + (isSidePanelOpen ? this.sidePanelWidth : 0);
    const resizeableWidth = window.innerWidth - fixedLeftPaneWidth;
    const editorWidth = this.state.editorWidthRatio * resizeableWidth;

    this.setState({
      editorWidth,
      fixedLeftPaneWidth,
    });
  };
}
