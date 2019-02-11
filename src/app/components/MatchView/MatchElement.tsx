import { faShieldAlt, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/MatchView.module.css';
import * as MatchInterfaces from 'app/types/MatchView';
import classnames from 'classnames';
import * as React from 'react';
import { Col } from 'react-bootstrap';

export class MatchElement extends React.Component<MatchInterfaces.ElementProps, {}> {
  public render() {
    const { match } = this.props;
    return (
      <Col sm={12} className={classnames('mb-1')}>
        <div
          className={classnames('w-100', styles.matchElement, {
            [`${styles.winBackground}`]: match.userOneScore > match.userTwoScore,
            [`${styles.loseBackground}`]: match.userOneScore < match.userTwoScore,
          })}
        >
          <div className="d-flex justify-content-around text-dark">
            <span>{match.userOne}</span>
            <span>
              <FontAwesomeIcon icon={faShieldAlt} />
            </span>
            <span>{match.userTwo}</span>
          </div>
          <div className=" d-flex justify-content-center text-capitalize text-font-weight-bold text-dark h2  my-2">
            {match.userOneScore} - {match.userTwoScore}
          </div>
          <div className=" d-flex justify-content-center text-capitalize text-font-weight-bold text-dark">
            {match.userOne === match.winner ? 'WON' : 'LOST'}
          </div>
          <div className={classnames(styles.body, 'd-flex justify-content-around text-dark')}>
            <span className={classnames(styles.game)}>
              <FontAwesomeIcon icon={faVideo} />
            </span>
            <span className={classnames(styles.game)}>
              <FontAwesomeIcon icon={faVideo} />
            </span>
            <span className={classnames(styles.game)}>
              <FontAwesomeIcon icon={faVideo} />
            </span>
            <span className={classnames(styles.game)}>
              <FontAwesomeIcon icon={faVideo} />
            </span>
            <span className={classnames(styles.game)}>
              <FontAwesomeIcon icon={faVideo} />
            </span>
          </div>
          <div
            className=" d-flex justify-content-start text-capitalize text-dark my-1 mx-3 h6"
            style={{
              fontSize: '12px',
            }}
          >
            Played At : {match.playedAt}
          </div>
        </div>
      </Col>
    );
  }
}
