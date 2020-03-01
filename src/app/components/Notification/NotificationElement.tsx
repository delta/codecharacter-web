import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/Notification.module.css';
import * as NotificationInterfaces from 'app/types/Notification';
import * as NotificationElementInterfaces from 'app/types/Notification/NotificationElement';
import classnames from 'classnames';
import * as React from 'react';
import { Col } from 'react-bootstrap';

function get_time_difference(earlierDate: Date) {
  // if (!earlierDate) {
  //   /* tslint:disable-next-line:no-parameter-reassignment */
  //   earlierDate = new Date();
  // }
  // const laterDate = new Date();
  // const oDiff = {
  //   days: 0,
  //   duration: '',
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // };

  // let answer = '';

  // let nTotalDiff = laterDate.getTime() - earlierDate.getTime();

  // oDiff.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
  // nTotalDiff -= oDiff.days * 1000 * 60 * 60 * 24;

  // oDiff.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
  // nTotalDiff -= oDiff.hours * 1000 * 60 * 60;

  // oDiff.minutes = Math.floor(nTotalDiff / 1000 / 60);
  // nTotalDiff -= oDiff.minutes * 1000 * 60;

  // oDiff.seconds = Math.floor(nTotalDiff / 1000);
  // if (oDiff.days !== 0) {
  //   answer = `${oDiff.days} Days`;
  // } else if (oDiff.hours !== 0) {
  //   answer = `${oDiff.hours} Hours`;
  // } else if (oDiff.hours !== 0) {
  //   answer = `${oDiff.hours} Hours`;
  // } else if (oDiff.minutes !== 0) {
  //   answer = `${oDiff.minutes} mins`;
  // } else {
  //   answer = `${oDiff.seconds} s`;
  // }

  return 'answer';
}

export class NotificationElement extends React.Component<NotificationElementInterfaces.Props, {}> {
  public render() {
    const { id, title, content, type, createdAt, deleteNotification } = this.props;

    return (
      <Col sm={12} className={classnames('mb-1')}>
        <div className={classnames('w-100', styles.notificationElement, styles[type])}>
          <div className={classnames(styles.sideContainer, styles[`side-${type}`])}>
            <div className={classnames(styles.sideIcon)}>
              {type === NotificationInterfaces.NotificationTabType.ERROR ? (
                <FontAwesomeIcon icon={faExclamationTriangle} />
              ) : null}
              {type === NotificationInterfaces.NotificationTabType.SUCCESS ? (
                <FontAwesomeIcon icon={faCheckCircle} />
              ) : null}
              {type === NotificationInterfaces.NotificationTabType.INFO ? (
                <FontAwesomeIcon icon={faInfoCircle} />
              ) : null}
            </div>
          </div>
          <div className={classnames(styles.notificationContent)}>
            <div className={classnames(styles.header)}>
              <span className={styles.title}>{title}</span>
              <span
                style={{
                  marginLeft: 'auto',
                }}
              >
                <button
                  className={classnames(styles.closeBtn)}
                  onClick={() => {
                    deleteNotification(id);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </span>
            </div>

            <div className={classnames('ml-2', styles.body)}>{content}</div>
            <div className={classnames('ml-2', styles.body, styles.date)}>
              {get_time_difference(createdAt)}
            </div>
          </div>
        </div>
      </Col>
    );
  }
}
