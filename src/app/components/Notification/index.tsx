import { NotificationElement } from 'app/components/Notification/NotificationElement';
import * as styles from 'app/styles/Notification.module.css';
import * as NotificationInterfaces from 'app/types/Notification';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

export class Notification extends React.Component<
  NotificationInterfaces.Props,
  NotificationInterfaces.State
> {
  constructor(props: NotificationInterfaces.Props) {
    super(props);
    this.state = {
      activeNotificationTab: NotificationInterfaces.NotificationTabType.ALL,
    };
  }

  public componentDidMount() {
    this.props.getAllGlobalNotifications();
  }

  public render() {
    return (
      <Grid className={classnames(styles['about-grid'])}>
        <Row className="justify-content-between py-2 px-3">
          <Col className="text-light font-weight-bold my-auto">ABOUT CODE CHARACTER</Col>
        </Row>
        <Row style={{ padding: 20, fontSize: 15 }}>
          <Col>
            <p>
              {' '}
              Code Character is an online AI programming competition, where you write C++ code for a
              real time strategy game. Test your code against yourself, against the computer,
              against your previous versions and then against everyone else on multiple maps!{' '}
            </p>
            <p> Challenge others to improve your rating as you climb up the leaderboard!</p>
            <ul>
              <li>Integrated code editor and development environment</li>
              <li>View your AI play with different versions of itself and with existing AI Bots</li>
              <li>Live leaderboard, challenge anyone.</li>
              <li>Active discussion forum for any game related questions</li>
              <li>Extensive tutorials and documentation</li>
            </ul>
            <p>
              Go through the{' '}
              <a href="https://code.pragyan.org/docs" target="_blank">
                docs
              </a>{' '}
              and start playing!
            </p>
            <h6>
              <strong>PRIZES</strong>
            </h6>
            <p>A total of 50K INR up for grabs for acing the leaderboard.</p>
            <h6>College Students</h6>
            <ul>
              <li>First Place - 10K INR</li>
              <li>Second Place - 6K INR</li>
              <li>Third Place - 4K INR</li>
            </ul>
            <h6>Professionals</h6>
            <ul>
              <li>First Place - 15K INR</li>
              <li>Second Place - 10K INR</li>
              <li>Third Place - 5K INR</li>
            </ul>
            <br />
          </Col>
        </Row>
        <Row className={classnames('mb-2', styles.notificationWrap)}>
          {this.props.notifications.map((notification, id) => (
            <NotificationElement
              key={id}
              createdAt={notification.createdAt}
              message={notification.message}
              type={NotificationInterfaces.NotificationTabType.INFO}
            />
          ))}
        </Row>
      </Grid>
    );
  }
}
