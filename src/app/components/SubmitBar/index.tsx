import { faCloud, faCodeBranch, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommitMessageBox } from 'app/components/SubmitBar/CommitMessageBox';
import * as styles from 'app/styles/SubmitBar.module.css';
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
    const { saveCode } = this.props;
    const { commitMessage, isCommitMessageBoxOpen } = this.state;
    return (
      <div
        className={classnames(styles.SubmitBar, {
          [`${styles.hideCommitBox}`]: !isCommitMessageBoxOpen,
        })}
      >
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
