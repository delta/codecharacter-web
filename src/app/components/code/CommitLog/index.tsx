import { CommitElement } from 'app/components/code/CommitLog/CommitElement';
import * as styles from 'app/styles/CommitLog.module.css';
import * as CommitLogInterfaces from 'app/types/code/CommitLog';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

export class CommitLog extends React.Component<
  CommitLogInterfaces.Props,
  CommitLogInterfaces.State
> {
  constructor(props: CommitLogInterfaces.Props) {
    super(props);
  }

  public componentDidMount() {
    this.props.getCommitLog();
  }

  public render() {
    const { commitLog, checkoutCode, currentCommitHash } = this.props;
    const currentDate = new Date();
    const latestCommit = {
      date: currentDate.toString(),
      hash: 'latest',
      message: 'Your Current Code',
    };
    return (
      <Grid fluid={true} className={classnames(styles.CommitLog)}>
        <Row className="justify-content-between py-2 pl-3">
          <Col className="text-light font-weight-bold my-auto">COMMIT LOG</Col>
        </Row>
        <Row className={styles['commitlog-wrap']}>
          <CommitElement
            isCurrentHash={currentCommitHash === latestCommit.hash}
            onClick={() => checkoutCode(latestCommit.hash)}
            key={0}
            index={0}
            commitDetails={latestCommit}
            commitsLength={commitLog.length + 1}
          />
          {commitLog.map((commit, index) => (
            <CommitElement
              isCurrentHash={currentCommitHash === commit.hash}
              onClick={() => checkoutCode(commit.hash)}
              key={index + 1}
              index={index + 1}
              commitDetails={commit}
              commitsLength={commitLog.length + 1}
            />
          ))}
        </Row>
      </Grid>
    );
  }
}
