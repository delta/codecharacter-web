import {
  faChevronLeft,
  faChevronRight,
  faCloud,
  faCodeBranch,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommitMessageBox } from 'app/components/SubmitBar/CommitMessageBox';
import * as styles from 'app/styles/SubmitBar.module.css';
import { SplitPaneState } from 'app/types/Dashboard';
import * as SubmitBarInterfaces from 'app/types/SubmitBar';
import classnames from 'classnames';
import * as React from 'react';

export class SubmitBar extends React.Component<
  SubmitBarInterfaces.Props,
  SubmitBarInterfaces.State
> {
  constructor(props: SubmitBarInterfaces.Props) {
    super(props);
    this.state = {
      commitMessage: '',
      isCommitMessageBoxOpen: false,
    };
  }

  public render() {
    const { saveCode, splitPaneState, changeSplitPaneState } = this.props;
    const { commitMessage, isCommitMessageBoxOpen } = this.state;
    return (
      <div
        className={classnames(styles.SubmitBar, {
          [`${styles.hideCommitBox}`]: !isCommitMessageBoxOpen,
        })}
      >
        <button className={classnames(styles.customBtn)} style={{ padding: '0px' }}>
          {this.props.splitPaneState !== SplitPaneState.RENDERER ? (
            <span
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
          ) : null}
          {this.props.splitPaneState !== SplitPaneState.EDITOR ? (
            <span
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
          ) : null}
        </button>
        <button className={classnames(styles.customBtn)}>
          <span className={classnames(styles.icon)}>
            <FontAwesomeIcon icon={faPlay} />
          </span>
          <span>RUN</span>
        </button>
        <button className={classnames(styles.customBtn)} onClick={saveCode}>
          <span className={classnames(styles.icon)}>
            <FontAwesomeIcon icon={faCloud} />
          </span>
          <span>SAVE</span>
        </button>
        <button
          className={classnames(styles.customBtn)}
          onClick={() => this.toggleCommitMessageBox(!isCommitMessageBoxOpen)}
        >
          <span className={classnames(styles.icon)}>
            <FontAwesomeIcon icon={faCodeBranch} />
          </span>
          <span>COMMIT</span>
        </button>
        <CommitMessageBox
          commitMessage={commitMessage}
          isCommitMessageBoxOpen={isCommitMessageBoxOpen}
          handleCommit={this.handleCommit}
          updateCommitMessage={this.updateCommitMessage}
        />
      </div>
    );
  }

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
}
