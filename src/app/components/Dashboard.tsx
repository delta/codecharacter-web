import Joyride from 'app/components/Joyride';
import Authentication from 'app/containers/Authentication';
import CodeStatus from 'app/containers/code/CodeStatus';
import Editor from 'app/containers/code/Editor';
import GameLog from 'app/containers/GameLog';
import Renderer from 'app/containers/Renderer';
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
  public minRendererWidth = 50;
  public initialEditorRatio = 0.4;
  public initialRendererHeight = 40;
  public compilationData = '';

  constructor(props: DashboardInterfaces.Props) {
    super(props);

    const fixedLeftPaneWidth =
      this.sideBarWidth + (this.props.sidePanelOpen ? this.sidePanelWidth : 0);

    this.state = {
      fixedLeftPaneWidth,
      editorWidthRatio: this.initialEditorRatio,
      isJoyRideActive: false,
      rendererHeight: this.initialRendererHeight,
      splitPaneState: DashboardInterfaces.SplitPaneState.BOTH,
      windowWidth: window.innerWidth,
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
    const {
      editorWidthRatio,
      windowWidth,
      fixedLeftPaneWidth,
      splitPaneState,
      isJoyRideActive,
    } = this.state;
    const { isLoggedIn } = this.props;

    let editorWidth;
    switch (splitPaneState) {
      case DashboardInterfaces.SplitPaneState.EDITOR: {
        editorWidth = windowWidth - fixedLeftPaneWidth - this.minRendererWidth;
        editorWidth = Math.max(editorWidth, this.minEditorWidth);
        break;
      }
      case DashboardInterfaces.SplitPaneState.BOTH: {
        const availableWidth = windowWidth - fixedLeftPaneWidth;
        editorWidth = editorWidthRatio * availableWidth;
        editorWidth = Math.max(editorWidth, this.minEditorWidth);
        break;
      }
      case DashboardInterfaces.SplitPaneState.RENDERER: {
        editorWidth = 0;
        break;
      }
      default: {
        editorWidth = 0;
      }
    }

    return (
      <div>
        {isLoggedIn && isJoyRideActive ? <Joyride toggleJoyRide={this.onToggleJoyRide} /> : null}
        {!isLoggedIn ? <Authentication /> : null}
        {isLoggedIn ? <SocketHandler /> : null}
        {/* {isUserProfileModalOpen ? <UserProfileModal /> : null} */}
        <SplitPane
          split="vertical"
          minSize={this.minEditorWidth + fixedLeftPaneWidth}
          maxSize={windowWidth - this.minRendererWidth}
          size={this.state.fixedLeftPaneWidth + editorWidth}
          resizerClassName={style.vertical}
          onChange={this.onSplitPaneResize}
          allowResize={splitPaneState === DashboardInterfaces.SplitPaneState.BOTH}
        >
          <Grid fluid={true}>
            <Row>
              <div
                style={{
                  height: '100vh',
                }}
              >
                <SideBar toggleJoyRide={this.onToggleJoyRide} />
              </div>
              <SidePanel sidePanelWidth={this.sidePanelWidth} />
              <div
                style={{
                  height: '100vh',
                }}
              >
                <CodeStatus width={editorWidth} />
                {this.state.splitPaneState !== DashboardInterfaces.SplitPaneState.RENDERER ? (
                  <Editor editorWidth={editorWidth} />
                ) : null}
              </div>
            </Row>
          </Grid>
          <SplitPane
            split="horizontal"
            defaultSize={this.initialRendererHeight}
            resizerClassName={style.horizontal}
            onChange={(size: number) => this.setState({ rendererHeight: size })}
            maxSize={500}
          >
            <Grid fluid={true} style={{ backgroundColor: 'black' }}>
              <Row>
                <SubmitBar
                  changeSplitPaneState={this.changeSplitPaneState}
                  splitPaneState={this.state.splitPaneState}
                />
              </Row>
              <Row style={{ paddingTop: 42 }} id="renderer">
                <Renderer height={this.state.rendererHeight - 42} />
              </Row>
            </Grid>
            <GameLog height={window.innerHeight - this.state.rendererHeight} />
          </SplitPane>
        </SplitPane>
      </div>
    );
  }

  private onWindowResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

  private changeSplitPaneState = (state: DashboardInterfaces.SplitPaneState): void => {
    this.setState({
      splitPaneState: state,
    });
  };

  private onSplitPaneResize = (leftPaneSize: number): void => {
    const availableWidth = this.state.windowWidth - this.state.fixedLeftPaneWidth;
    let editorWidth = leftPaneSize - this.state.fixedLeftPaneWidth;
    editorWidth = Math.max(editorWidth, this.minEditorWidth);
    const editorWidthRatio = editorWidth / availableWidth;

    if (this.state.splitPaneState === DashboardInterfaces.SplitPaneState.BOTH) {
      this.setState({
        editorWidthRatio,
      });
    }
  };

  private onToggleSidePanel = (isSidePanelOpen: boolean): void => {
    const fixedLeftPaneWidth = this.sideBarWidth + (isSidePanelOpen ? this.sidePanelWidth : 0);

    this.setState({
      fixedLeftPaneWidth,
    });
  };

  private onToggleJoyRide = (): void => {
    this.setState({
      isJoyRideActive: !this.state.isJoyRideActive,
    });
  };
}
