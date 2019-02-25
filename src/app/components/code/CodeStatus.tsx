import * as styles from 'app/styles/CodeStatus.module.css';
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
        this.setState({
          lastSaveMessage: `Saved ${days} days ago`,
        });
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
    const { currentState, width, isCodeSaved } = this.props;
    return (
      <Row
        className={classnames(styles.CodeStatusRow)}
        style={{
          width,
          height: '3.5vh',
        }}
      >
        <Col sm={6} className={classnames(styles.StatusTextCol)}>
          <p className={classnames(styles.StatusText)} style={{ textAlign: 'left' }}>
            {isCodeSaved ? ' ' : '* '}
            {this.state.lastSaveMessage}
          </p>
        </Col>
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
}
