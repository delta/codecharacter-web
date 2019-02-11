import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotificationElement from 'app/containers/Notification/NotificationElement';
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
  public render() {
    const { activeNotificationTab } = this.state;
    const { notifications, deleteNotificationType } = this.props;
    const activeNotifications = notifications.filter((notification) => {
      switch (activeNotificationTab) {
        case NotificationInterfaces.NotificationTabType.ALL: {
          return true;
        }
        case NotificationInterfaces.NotificationTabType.SUCCESS: {
          return notification.type === NotificationInterfaces.NotificationType.SUCCESS;
        }
        case NotificationInterfaces.NotificationTabType.ERROR: {
          return notification.type === NotificationInterfaces.NotificationType.ERROR;
        }
        case NotificationInterfaces.NotificationTabType.INFO: {
          return notification.type === NotificationInterfaces.NotificationType.INFO;
        }
        default:
          return true;
      }
    });
    return (
      <Grid fluid={true} className={classnames(styles.Notification)}>
        <Row className="justify-content-between py-2 px-3">
          <Col className="text-light font-weight-bold my-auto">NOTIFICATIONS</Col>
          <Col className="text-light font-weight-bold my-auto">
            <button
              className={classnames(styles.customBtn)}
              style={{
                background: 'none',
              }}
              onClick={() => deleteNotificationType(activeNotificationTab)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </Col>
        </Row>
        <Row>
          <div className="col mb-2">
            <button
              className={classnames(styles.customBtn, {
                [`${styles.buttonActive}`]:
                  activeNotificationTab === NotificationInterfaces.NotificationTabType.ALL,
              })}
              onClick={() =>
                this.toggleNotificationTab(NotificationInterfaces.NotificationTabType.ALL)
              }
            >
              {' '}
              All{' '}
            </button>
          </div>
          <div className="col">
            <button
              className={classnames(styles.customBtn, {
                [`${styles.buttonActive}`]:
                  activeNotificationTab === NotificationInterfaces.NotificationTabType.INFO,
              })}
              onClick={() =>
                this.toggleNotificationTab(NotificationInterfaces.NotificationTabType.INFO)
              }
            >
              {' '}
              Info
            </button>
          </div>
          <div className="col">
            <button
              className={classnames(styles.customBtn, {
                [`${styles.buttonActive}`]:
                  activeNotificationTab === NotificationInterfaces.NotificationTabType.SUCCESS,
              })}
              onClick={() =>
                this.toggleNotificationTab(NotificationInterfaces.NotificationTabType.SUCCESS)
              }
            >
              {' '}
              Success{' '}
            </button>
          </div>
          <div className="col">
            <button
              className={classnames(styles.customBtn, {
                [`${styles.buttonActive}`]:
                  activeNotificationTab === NotificationInterfaces.NotificationTabType.ERROR,
              })}
              onClick={() =>
                this.toggleNotificationTab(NotificationInterfaces.NotificationTabType.ERROR)
              }
            >
              {' '}
              Error{' '}
            </button>
          </div>
        </Row>
        <Row className={classnames('mb-2', styles.notificationWrap)}>
          {activeNotifications.map(({ id, title, text, type }) => (
            <NotificationElement key={id} id={id} title={title} text={text} type={type} />
          ))}
        </Row>
      </Grid>
    );
  }
  private toggleNotificationTab = (
    activeNotificationTab: NotificationInterfaces.NotificationTabType,
  ) => {
    this.setState({
      activeNotificationTab,
    });
  };
}
