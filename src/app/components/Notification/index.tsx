import { faCaretLeft, faCaretRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotificationElement from 'app/containers/Notification/NotificationElement';
import * as styles from 'app/styles/Notification.module.css';
import * as NotificationInterfaces from 'app/types/Notification';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

// tslint:disable-next-line
import ReactPaginate from 'react-paginate';

// tslint:disable-next-line

export class Notification extends React.Component<
  NotificationInterfaces.Props,
  NotificationInterfaces.State
> {
  private static paginationSize = 6;

  constructor(props: NotificationInterfaces.Props) {
    super(props);
    this.state = {
      offset: 0,
      activeNotificationTab: NotificationInterfaces.NotificationTabType.ALL,
      offset: 0,
      tabType: NotificationInterfaces.TabType.NOTIFICATIONS,
    };
  }
  public componentDidMount() {
    this.props.getAllGlobalNotifications();
    this.props.getAllGlobalAnnouncements();
  }

  public handlePageClick = (data: { selected: number }) => {
    this.setState({
      offset: Math.ceil(data.selected * Notification.paginationSize),
    });
  };

  public render() {
    const { activeNotificationTab, tabType } = this.state;
    const { announcements, notifications, deleteNotificationType, deleteNotification } = this.props;
    // let r :Array<NotificationInterfaces.Notification>=[];
    const activeNotifications = notifications.filter((notification) => {
      switch (activeNotificationTab) {
        case NotificationInterfaces.NotificationTabType.ALL: {
          return true;
        }
        case NotificationInterfaces.NotificationTabType.SUCCESS: {
          return notification.type === NotificationInterfaces.NotificationTabType.SUCCESS;
        }
        case NotificationInterfaces.NotificationTabType.ERROR: {
          return notification.type === NotificationInterfaces.NotificationTabType.ERROR;
        }
        case NotificationInterfaces.NotificationTabType.INFO: {
          return notification.type === NotificationInterfaces.NotificationTabType.INFO;
        }
        default:
          return true;
      }
    });

    return (
      <Grid fluid={true} className={classnames(styles.Notification)}>
        <Row className="justify-content-between py-2 px-3">
          <Col
            className={
              this.state.tabType === NotificationInterfaces.TabType.NOTIFICATIONS
                ? classnames('text-light font-weight-bold my-auto', styles['tab-active'])
                : classnames('justify-content-between py-2 px-3', styles['tab-inactive'])
            }
            onClick={() => this.setState({ tabType: NotificationInterfaces.TabType.NOTIFICATIONS })}
          >
            NOTIFICATIONS
          </Col>
          <Col
            className={
              this.state.tabType === NotificationInterfaces.TabType.ANNOUNCEMENTS
                ? classnames('text-light font-weight-bold my-auto', styles['tab-active'])
                : classnames('justify-content-between py-2 px-3', styles['tab-inactive'])
            }
            onClick={() => this.setState({ tabType: NotificationInterfaces.TabType.ANNOUNCEMENTS })}
          >
            ANNOUNCEMENTS
          </Col>
          <Col className="text-light font-weight-bold my-auto">
            <button
              className={
                tabType === NotificationInterfaces.TabType.ANNOUNCEMENTS
                  ? classnames(styles.trashInactive, styles.customBtn)
                  : classnames(styles.customBtn)
              }
              style={{
                background: 'none',
              }}
              onClick={() => {
                if (tabType === NotificationInterfaces.TabType.NOTIFICATIONS) {
                  deleteNotificationType(activeNotificationTab);
                }
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </Col>
        </Row>
        {this.state.tabType === NotificationInterfaces.TabType.NOTIFICATIONS ? (
          <>
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
              <Col
                className="d-flex justify-content-center"
                style={{ width: '100vw', margin: '5px' }}
              >
                <ReactPaginate
                  previousLabel={
                    <span>
                      <FontAwesomeIcon icon={faCaretLeft} /> <FontAwesomeIcon icon={faCaretLeft} />
                    </span>
                  }
                  nextLabel={
                    <span>
                      <FontAwesomeIcon icon={faCaretRight} />{' '}
                      <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                  }
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={Math.max(activeNotifications.length / Notification.paginationSize)}
                  marginPagesDisplayed={1}
                  pageClassName={'atag'}
                  pageRangeDisplayed={2}
                  activeLinkClassName={'active'}
                  onPageChange={this.handlePageClick}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                />
              </Col>
              {activeNotifications.map(({ id, title, content, type, createdAt }, index) =>
                index >= this.state.offset &&
                index <= this.state.offset + Notification.paginationSize - 1 ? (
                  <NotificationElement
                    createdAt={createdAt}
                    key={id}
                    id={id}
                    title={title}
                    content={content}
                    type={type}
                    deleteNotification={deleteNotification}
                  />
                ) : null,
              )}
            </Row>
          </>
        ) : (
          <>
            {announcements.map(({ id, message }) => (
              <div key={id} className={styles['announcement-div']}>
                <div className={styles['announcement-content']}>
                  {message.replace(/['"]+/g, '')}
                </div>
              </div>
            ))}
          </>
        )}
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
