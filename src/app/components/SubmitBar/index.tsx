import {
  faChevronLeft,
  faChevronRight,
  faCodeBranch,
  faCog,
  faLock,
  faPlay,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubmissionActions } from 'app/actions';
import { CommitMessageBox } from 'app/components/SubmitBar/CommitMessageBox';
import { RunOptions } from 'app/components/SubmitBar/RunOptions';
import * as styles from 'app/styles/SubmitBar.module.css';
import * as SubmissionInterfaces from 'app/types/code/Submission';
import { SplitPaneState } from 'app/types/Dashboard';
import * as SubmitBarInterfaces from 'app/types/SubmitBar';
import classnames from 'classnames';
import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: 12,
  },
  
}));

function BootstrapTooltip(props: any) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

export class SubmitBar extends React.Component<
  SubmitBarInterfaces.Props,
  SubmitBarInterfaces.State
> {
  constructor(props: SubmitBarInterfaces.Props) {
    super(props);
    this.state = {
      commitMessage: '',
      isCommitMessageBoxOpen: false,
      isRunOptionsOpen: false,
    };
  }
  
  

  public render() {
    const {
      saveCode,
      splitPaneState,
      changeSplitPaneState,
      maps,
      loadMaps,
      getAiIds,
      aiIds,
      clearLogs,
      debugRunAvailable,
    } = this.props;
    const { commitMessage, isCommitMessageBoxOpen, isRunOptionsOpen } = this.state;
    return (
      <div
        className={classnames(styles.SubmitBar, {
          [`${styles.hideCommitBox}`]: !isCommitMessageBoxOpen,
        })}
      >
        <button className={classnames(styles.customBtn)} style={{ padding: '0px' }}>
          {this.props.splitPaneState !== SplitPaneState.RENDERER ? (
            <BootstrapTooltip title = {splitPaneState == SplitPaneState.EDITOR? "Show Renderer and Editor":splitPaneState == SplitPaneState.BOTH? "Close Editor": null}>
            <span
              id="toggle_button"
              className={classnames(styles.icon, styles.toggleIcon)}
              style={{ padding: '6px' }}
              onClick={() => {
                switch (splitPaneState) {
                  case SplitPaneState.EDITOR: {
                    changeSplitPaneState(SplitPaneState.BOTH);
                    break;
                  }
                  case SplitPaneState.BOTH: {
                    changeSplitPaneState(SplitPaneState.RENDERER);
                    break;
                  }
                  case SplitPaneState.RENDERER: {
                    changeSplitPaneState(SplitPaneState.RENDERER);
                    break;
                  }
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            </BootstrapTooltip>
          ) : null}
          {this.props.splitPaneState !== SplitPaneState.EDITOR ? (
            <BootstrapTooltip title = {splitPaneState == SplitPaneState.RENDERER? "Show Renderer and Editor":splitPaneState == SplitPaneState.BOTH? "Close Renderer": null}>
            <span
              id="toggle_button"
              className={classnames(styles.icon, styles.toggleIcon)}
              style={{ padding: '6px' }}
              onClick={() => {
                switch (splitPaneState) {
                  case SplitPaneState.EDITOR: {
                    changeSplitPaneState(SplitPaneState.EDITOR);
                    break;
                  }
                  case SplitPaneState.BOTH: {
                    changeSplitPaneState(SplitPaneState.EDITOR);
                    break;
                  }
                  case SplitPaneState.RENDERER: {
                    changeSplitPaneState(SplitPaneState.BOTH);
                    break;
                  }
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
            </BootstrapTooltip>
          ) : null}
        </button>
        <BootstrapTooltip title = "Clear Renderer Log">
        <button
          className={classnames(styles.customBtn)}
          onClick={clearLogs}
          id="clear_gamelog_button"
        >
          <span
            className={classnames(styles.icon)}
            style={{ padding: 0, margin: 0, border: 0 }}
          
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </button>
        </BootstrapTooltip>
        <BootstrapTooltip title = "Run Code">
        <button
          className={classnames(styles.customBtn)}
          id="run_button"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            this.setState({
              isRunOptionsOpen: !isRunOptionsOpen,
            });
            event.stopPropagation();
          }}
        >
          <span className={classnames(styles.icon)}
          >
            <FontAwesomeIcon icon={faPlay} />
          </span>
          <span>RUN</span>
        </button>
        </BootstrapTooltip>
        {debugRunAvailable ? (
          <BootstrapTooltip title = "Debug Code">
          <button
            className={classnames(styles.customBtn)}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
            }}
            title="Run debugger on your last runtime error"
            id="debug_run_button"
            onClick={this.props.debugRun}
          >
            <span
              className={classnames(styles.icon)}
              style={{
                borderColor: 'rgb(185, 53, 60)',
              }}
            >
              <FontAwesomeIcon icon={faCog} />
            </span>
            <span>DEBUG RUN</span>
          </button>
          </BootstrapTooltip>
        ) : null}
        <BootstrapTooltip title = "Save Code">
        <button className={classnames(styles.customBtn)} onClick={saveCode} id="save_button">
          <span className={classnames(styles.icon)}
          >
            <FontAwesomeIcon icon={faSave} />
          </span>
          <span>SAVE</span>
        </button>
        </BootstrapTooltip>
        <BootstrapTooltip title = "Commit Code">
        <button
          id="commit_button"
          className={classnames(styles.customBtn)}
          onClick={() => this.toggleCommitMessageBox(!isCommitMessageBoxOpen)}
        >
          <span className={classnames(styles.icon)}
          >
            <FontAwesomeIcon icon={faCodeBranch} />
          </span>
          <span>COMMIT</span>
        </button>
        </BootstrapTooltip>
        <BootstrapTooltip title = "Submit Code">
        <button
          className={classnames(styles.customBtn)}
          title="Submit Code"
          id="submit_button"
          onClick={(e) => {
            this.props.saveCode();
            this.props.lockCode();
          }}
        >
          <span className={classnames(styles.icon)}
          
          >
            <FontAwesomeIcon icon={faLock} />
          </span>
          <span>SUBMIT</span>
        </button>
        </BootstrapTooltip>
        <CommitMessageBox
          commitMessage={commitMessage}
          isCommitMessageBoxOpen={isCommitMessageBoxOpen}
          handleCommit={this.handleCommit}
          updateCommitMessage={this.updateCommitMessage}
        />
        {isRunOptionsOpen ? (
          <RunOptions
            loadMaps={loadMaps}
            startMatch={this.startMatch}
            maps={maps}
            getAiIds={getAiIds}
            aiIds={aiIds}
            closeOptions={this.closeRunOptions}
          />
        ) : null}
      </div>
    );
  }

  private closeRunOptions = () => {
    this.setState({
      isRunOptionsOpen: false,
    });
  };

  private toggleCommitMessageBox = (isCommitMessageBoxOpen: boolean) => {
    this.setState({
      isCommitMessageBoxOpen,
    });
  };

  private updateCommitMessage = (commitMessage: string) => {
    this.setState({
      commitMessage,
    });
  };

  private handleCommit = async () => {
    const { commitMessage } = this.state;
    const { commit, getCommitLog } = this.props;
    await commit(commitMessage);
    await this.toggleCommitMessageBox(false);
    await getCommitLog();
  };

  private startMatch = async (type: SubmissionActions.Type, mapId: number, aiId: number) => {
    const { selfMatch, aiMatch, updateMapId, updateCurrentAiId, changeCurrentRequest } = this.props;

    switch (type) {
      case SubmissionActions.Type.SELF_MATCH: {
        changeCurrentRequest(SubmissionInterfaces.Request.SELF_MATCH);
        updateMapId(mapId);
        await selfMatch(mapId);
        break;
      }
      case SubmissionActions.Type.AI_MATCH: {
        changeCurrentRequest(SubmissionInterfaces.Request.AI_MATCH);
        updateCurrentAiId(aiId);
        updateMapId(mapId);
        await aiMatch(mapId, aiId);
        break;
      }
    }
  };
}
