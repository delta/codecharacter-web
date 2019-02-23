import { faShieldAlt, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/MatchView.module.css';
import { Avatar } from 'app/types/Authentication/Register';
import * as MatchInterfaces from 'app/types/MatchView';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

export class MatchElement extends React.Component<MatchInterfaces.ElementProps, {}> {
  public render() {
    const { match, getGameLogs, currentUserMatch, type } = this.props;
    return (
      <Col sm={12} className={classnames('mb-1')}>
        <div
          className={classnames(
            'w-100',
            styles.matchElement,
            type === MatchInterfaces.MatchViewTabType.TOP_MATCHES ? styles.topMatchElement : '',
            {
              [`${styles.winBackground}`]: currentUserMatch && match.score1 < match.score2,
              [`${styles.loseBackground}`]: currentUserMatch && match.score1 < match.score2,
            },
          )}
        >
          <Row className="d-flex justify-content-around ">
            <Col sm={5} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13 }}>{`${match.username1.substr(0, 15)}${
                match.username1.length > 15 ? '...' : ''
              }`}</p>
            </Col>
            <Col sm={2} style={{ textAlign: 'center' }}>
              <FontAwesomeIcon icon={faShieldAlt} />
            </Col>
            <Col sm={5} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13 }}>{`${match.username2.substr(0, 15)}${
                match.username2.length > 15 ? '...' : ''
              }`}</p>
            </Col>
          </Row>
          <div className={classnames(' d-flex justify-content-center w-100')}>
            {
              // @ts-ignore
              <img width={35} height={35} src={Avatar[match.avatar1]} />
            }
            <span className="text-capitalize text-font-weight-bold  h3 mx-3">
              {match.score1} - {match.score2}
            </span>
            {
              // @ts-ignore
              <img width={35} height={35} src={Avatar[match.avatar2]} />
            }
          </div>
          <div className=" d-flex justify-content-center text-capitalize text-font-weight-bold ">
            {match.verdict === 1 ? 'WON' : match.verdict === 2 ? 'LOST' : 'TIE'}
          </div>
          <div className={classnames(styles.body, 'd-flex justify-content-around ')}>
            {match.games.map((gameId, index) => (
              <span
                key={index}
                className={classnames(styles.game)}
                // @ts-ignore
                onClick={() => getGameLogs(gameId.id)}
              >
                <FontAwesomeIcon icon={faVideo} />
              </span>
            ))}
          </div>
          {/* <div
            className=" d-flex justify-content-start text-capitalize  my-1 mx-3 h6"
            style={{
              fontSize: '12px',
            }}
          >
            Played At : {match.playedAt}
          </div> */}
        </div>
      </Col>
    );
  }
}
