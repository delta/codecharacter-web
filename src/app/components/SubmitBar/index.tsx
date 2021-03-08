import {
  faChevronLeft,
  faChevronRight,
  faCodeBranch,
  faCog,
  faExclamationCircle,
  faLock,
  faPlay,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubmissionActions } from 'app/actions';
import { StoryModeModal } from 'app/components/StoryModeModal';
import { CommitMessageBox } from 'app/components/SubmitBar/CommitMessageBox';
import { DropDownItem } from 'app/components/SubmitBar/DropDownItem';
import { RunOptions } from 'app/components/SubmitBar/RunOptions';
import * as styles from 'app/styles/SubmitBar.module.css';
import * as SubmissionInterfaces from 'app/types/code/Submission';
import { SplitPaneState } from 'app/types/Dashboard';
import * as SubmitBarInterfaces from 'app/types/SubmitBar';
import classnames from 'classnames';
import * as React from 'react';

import { Badge, Tooltip } from '@material-ui/core';

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
      openStoryModeModal,
      isStoryModeModalOpen,
      ratings,
      current_level,
      current_stars,
      setCurrentLevel,
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
            <Tooltip
              title={
                splitPaneState === SplitPaneState.EDITOR
                  ? 'Show Renderer and Editor'
                  : splitPaneState === SplitPaneState.BOTH
                  ? 'Close Editor'
                  : ''
              }
            >
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
            </Tooltip>
          ) : null}
          {this.props.splitPaneState !== SplitPaneState.EDITOR ? (
            <Tooltip
              title={
                splitPaneState === SplitPaneState.RENDERER
                  ? 'Show Renderer and Editor'
                  : splitPaneState === SplitPaneState.BOTH
                  ? 'Close Renderer'
                  : ''
              }
            >
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
            </Tooltip>
          ) : null}
        </button>
        <Tooltip title="Clear Renderer Log">
          <button
            className={classnames(styles.customBtn)}
            onClick={clearLogs}
            id="clear_gamelog_button"
          >
            <span className={classnames(styles.icon)} style={{ padding: 0, margin: 0, border: 0 }}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </button>
        </Tooltip>
        <Tooltip title="Run Code">
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
            <span className={classnames(styles.icon)}>
              <FontAwesomeIcon icon={faPlay} />
            </span>
            <span>RUN</span>
          </button>
        </Tooltip>
        {debugRunAvailable ? (
          <Tooltip title="Debug Code">
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
          </Tooltip>
        ) : null}
        <Tooltip title="Save Code">
          <button className={classnames(styles.customBtn)} onClick={saveCode} id="save_button">
            <span className={classnames(styles.icon)}>
              <FontAwesomeIcon icon={faSave} />
            </span>
            <span>SAVE</span>
          </button>
        </Tooltip>
        <Tooltip title="Commit Code">
          <button
            id="commit_button"
            className={classnames(styles.customBtn)}
            onClick={() => this.toggleCommitMessageBox(!isCommitMessageBoxOpen)}
          >
            <span className={classnames(styles.icon)}>
              <FontAwesomeIcon icon={faCodeBranch} />
            </span>
            <span>COMMIT</span>
          </button>
        </Tooltip>
        <Tooltip title="Submit Code">
          <button
            className={classnames(styles.customBtn)}
            title="Submit Code"
            id="submit_button"
            onClick={(e) => {
              this.props.saveCode();
              this.props.lockCode();
            }}
          >
            <span className={classnames(styles.icon)}>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <span>SUBMIT</span>
          </button>
        </Tooltip>
        <Badge
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          badgeContent={current_level}
          color={'secondary'}
        >
          <div onMouseEnter={this.updateQuestRating} className={styles.dropdown}>
            <button className={classnames(styles.customBtn)} title="Quest_Level" id="quest_button">
              <span className={classnames(styles.icon)}>
                <FontAwesomeIcon icon={faExclamationCircle} />
              </span>
              <span>QUEST LEVEL </span>
            </button>
            {ratings ? (
              <div className={styles['dropdown-content']}>
                {ratings[0] !== undefined ? (
                  <DropDownItem
                    level={String(ratings[0].level)}
                    rating={ratings[0].stars}
                    openStoryModeModal={openStoryModeModal}
                    setCurrentLevel={setCurrentLevel}
                  />
                ) : (
                  <DropDownItem
                    level={'1'}
                    rating={-1}
                    openStoryModeModal={openStoryModeModal}
                    setCurrentLevel={setCurrentLevel}
                  />
                )}
                {ratings[1] !== undefined ? (
                  <DropDownItem
                    level={String(ratings[1].level)}
                    rating={ratings[1].stars}
                    openStoryModeModal={openStoryModeModal}
                    setCurrentLevel={setCurrentLevel}
                  />
                ) : (
                  <DropDownItem
                    level={'2'}
                    rating={-1}
                    openStoryModeModal={openStoryModeModal}
                    setCurrentLevel={setCurrentLevel}
                  />
                )}
                {ratings[2] !== undefined ? (
                  <DropDownItem
                    level={String(ratings[2].level)}
                    rating={ratings[2].stars}
                    openStoryModeModal={openStoryModeModal}
                    setCurrentLevel={setCurrentLevel}
                  />
                ) : (
                  <DropDownItem
                    level={'3'}
                    rating={-1}
                    openStoryModeModal={openStoryModeModal}
                    setCurrentLevel={setCurrentLevel}
                  />
                )}
                {ratings[3] !== undefined ? (
                  <DropDownItem
                    level={String(ratings[3].level)}
                    rating={ratings[3].stars}
                    openStoryModeModal={openStoryModeModal}
                    setCurrentLevel={setCurrentLevel}
                  />
                ) : (
                  <DropDownItem
                    level={'4'}
                    rating={-1}
                    openStoryModeModal={openStoryModeModal}
                    setCurrentLevel={setCurrentLevel}
                  />
                )}
                {ratings[4] !== undefined ? (
                  <DropDownItem
                    level={String(ratings[4].level)}
                    rating={ratings[4].stars}
                    openStoryModeModal={openStoryModeModal}
                    setCurrentLevel={setCurrentLevel}
                  />
                ) : (
                  <DropDownItem
                    level={'5'}
                    rating={-1}
                    openStoryModeModal={openStoryModeModal}
                    setCurrentLevel={setCurrentLevel}
                  />
                )}
              </div>
            ) : null}
          </div>
        </Badge>
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
        {isStoryModeModalOpen ? this.storyModeModalComponent(false, current_stars) : null}
      </div>
    );
  }

  public componentDidMount() {
    this.props.getQuestStatus();
    this.props.setCurrentLevel(1, 0);
  }

  // public componentDidUpdate() {
  //   this.props.getQuestStatus();
  // }

  private storyModeModalComponent = (isCompleted: boolean, stars: number) => {
    // can just call storyModeModalComponent(true, 3) to render a StoryModeModal component with
    // stars=3 and isCompleted= true and the level value is fetched from storyModeModalLevel state variable
    const { closeStoryModeModal, storyModeModalLevel } = this.props;

    return (
      <StoryModeModal
        isCompleted={isCompleted}
        level={storyModeModalLevel}
        closeStoryModeModal={() => {
          closeStoryModeModal();
        }}
        stars={stars}
        startMatch={this.startStoryModeMatch}
      />
    );
  };
  
  private updateQuestRating = () =>{
    this.props.getQuestStatus();
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

  private startStoryModeMatch = async (mapId: number, aiId: number) => {
    const {
      closeStoryModeModal,
      aiMatch,
      updateMapId,
      updateCurrentAiId,
      changeCurrentRequest,
    } = this.props;
    closeStoryModeModal();
    changeCurrentRequest(SubmissionInterfaces.Request.AI_MATCH);
    updateCurrentAiId(aiId);
    updateMapId(mapId);
    await aiMatch(mapId, aiId);
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
