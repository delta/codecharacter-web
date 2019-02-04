import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/Notification.module.css';
import * as NotificationElementInterfaces from 'app/types/Notification/NotificationElement';
import classnames from 'classnames';
import * as React from 'react';
import { Col } from 'react-bootstrap';

export class NotificationElement extends React.Component<NotificationElementInterfaces.Props, {}> {
  public render() {
    const { id, title, text, type, deleteNotification } = this.props;
    return (
      <Col sm={12} className={classnames('mb-1')}>
        <div className={classnames('w-100', styles.notificationElement, styles[type])}>
          <div className={classnames(styles.header)}>
            <span className="mr-2 mb-1">
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
            <span>{title}</span>
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
          <div className={classnames('ml-2', styles.body)}>{text}</div>
        </div>
      </Col>
    );
  }
}
