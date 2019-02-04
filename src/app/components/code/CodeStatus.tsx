import * as styles from 'app/styles/CodeStatus.module.css';
import * as CodeStatusInterfaces from 'app/types/code/CodeStatus';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

export class CodeStatus extends React.Component<CodeStatusInterfaces.Props, {}> {
  public render() {
    const { currentCommitHash, width } = this.props;
    return (
      <Row
        className={classnames(styles.CodeStatusRow)}
        style={{
          width,
        }}
      >
        <Col sm={8} className={classnames(styles.CommitStatusCol)}>
          <p className={classnames(styles.StatusText)} style={{ textAlign: 'left' }}>
            {' '}
            On Commit: {currentCommitHash.slice(0, 7)}{' '}
            {currentCommitHash !== 'latest' ? '(Non editable)' : ''}
          </p>
        </Col>
        <Col sm={4} className={classnames(styles.StatusTextCol)}>
          <p className={classnames(styles.StatusText)} style={{ textAlign: 'right' }}>
            {' '}
            Saved 2 min ago{' '}
          </p>
        </Col>
      </Row>
    );
  }
}
