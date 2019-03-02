import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/Notification.module.css';
import * as NotificationElementInterfaces from 'app/types/Notification/NotificationElement';
import classnames from 'classnames';
import * as React from 'react';
import { Col } from 'react-bootstrap';

export class NotificationElement extends React.Component<NotificationElementInterfaces.Props, {}> {
  public render() {
    const { message, type, createdAt } = this.props;
    return (
      <Col sm={12} className={classnames('mb-1')}>
        <div className={classnames('w-100', styles.notificationElement, styles[type])}>
          <div className={classnames(styles.header)}>
            <span className="mr-2 mb-1">
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
            <span>{message}</span>
          </div>
          <div className={classnames('ml-3', 'pl-2', 'mt-2', styles.body)}>
            {new Date(createdAt).toLocaleString()}
          </div>
        </div>
      </Col>
    );
  }
}
