import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommitMessageBox } from 'app/components/SubmitBar/CommitMessageBox';
import * as styles from 'app/styles/CodeStatus.module.css';
import * as Commitstyles from 'app/styles/SubmitBar.module.css';
import * as CodeStatusInterfaces from 'app/types/code/CodeStatus';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

export class CodeStatus extends React.Component<
  CodeStatusInterfaces.Props,
  CodeStatusInterfaces.State
> {
  public constructor(props: CodeStatusInterfaces.Props) {
    super(props);
    this.state = {
      commitMessage: '',
      isCommitMessageBoxOpen: false,
      lastSaveMessage: '',
    };
  }
  public componentDidMount() {
    setInterval(() => {
      let delta = Math.ceil(
        Math.abs(new Date(this.props.lastSaveTime).getTime() - new Date().getTime()) / 1000,
      );

      // calculate (and subtract) whole days
      const days = Math.floor(delta / 86400);
      if (days > 0) {
        if (days >= 30) {
          this.setState({
            lastSaveMessage: ``,
          });
        } else {
          this.setState({
            lastSaveMessage: `Saved ${days} days ago`,
          });
        }
        return;
      }
      delta -= days * 86400;

      // calculate (and subtract) whole hours
      const hours = Math.floor(delta / 3600) % 24;
      if (hours > 0) {
        this.setState({
          lastSaveMessage: `Saved ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`,
        });
        return;
      }
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      const minutes = Math.floor(delta / 60) % 60;
      if (minutes > 0) {
        this.setState({
          lastSaveMessage: `Saved ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`,
        });
        return;
      }
      delta -= minutes * 60;

      // what's left is seconds
      const seconds = delta % 60;
      if (seconds > 0) {
        this.setState({
          lastSaveMessage: `Saved few seconds ago`,
        });
      }
    }, 1000);
  }

  public render() {
    const { currentState, width, isCodeSaved, currentCommitHash } = this.props;
    const { isCommitMessageBoxOpen, commitMessage } = this.state;
    return (
      <Row
        className={classnames(styles.CodeStatusRow)}
        style={{
          width,
          height: '6vh',
        }}
      >
        <Col sm={6} className={classnames(styles.StatusTextCol)}>
          {currentCommitHash === 'latest' ? (
            <p className={classnames(styles.StatusText)} style={{ textAlign: 'left' }}>
              {isCodeSaved ? ' ' : '* '}
              {this.state.lastSaveMessage}
            </p>
          ) : (
            <p
              className={classnames(styles.StatusText)}
              style={{ textAlign: 'left', color: 'red' }}
            >
              <b>{'Read Only (Old Commit)'}</b>
            </p>
          )}
        </Col>

        <Col>
          <button
            id="commit_button"
            className={classnames(Commitstyles.customBtn)}
            onClick={() => this.toggleCommitMessageBox(!isCommitMessageBoxOpen)}
          >
            <span className={classnames(Commitstyles.icon)}>
              <FontAwesomeIcon icon={faCodeBranch} />
            </span>
            <span>COMMIT</span>
          </button>
        </Col>
        <CommitMessageBox
          commitMessage={commitMessage}
          isCommitMessageBoxOpen={isCommitMessageBoxOpen}
          handleCommit={this.handleCommit}
          updateCommitMessage={this.updateCommitMessage}
        />
        <Col sm={5} className={classnames(styles.CommitStatusCol)}>
          <p className={classnames(styles.StatusText)} style={{ textAlign: 'right' }}>
            {currentState}
          </p>
        </Col>
        {currentState !== 'Idle' ? (
          <Col sm={1} className={classnames(styles.loaderWrapper)}>
            <p className={classnames(styles.loader)} />
          </Col>
        ) : null}
      </Row>
    );
  }
  private toggleCommitMessageBox = (isCommitMessageBoxOpen: boolean) => {
    this.setState({
      isCommitMessageBoxOpen,
    });
  };

  private handleCommit = async () => {
    const { commitMessage } = this.state;
    const { commit, getCommitLog } = this.props;
    await commit(commitMessage);
    await this.toggleCommitMessageBox(false);
    await getCommitLog();
  };
  private updateCommitMessage = (commitMessage: string) => {
    this.setState({
      commitMessage,
    });
  };
}
