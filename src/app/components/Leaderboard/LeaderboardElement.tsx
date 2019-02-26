import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LeaderboardActions } from 'app/actions';
import { Svg } from 'app/components/Leaderboard/Svg';
import * as styles from 'app/styles/Leaderboard.module.css';
import { Avatar } from 'app/types/Authentication/Register';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import classnames from 'classnames';
import * as React from 'react';
import { Button, Col } from 'react-bootstrap';

// @ts-ignore
// tslint:disable-next-line:import-name
import ReactCountryFlag from 'react-country-flag';
const colors = ['#FFB900', '#69797E', '#847545', '#038387'];

export class LeaderboardElement extends React.Component<LeaderboardInterfaces.ElementProps, {}> {
  public render() {
    const { player, index, isPlayAgainstDisabled, runMatch, currentUsername } = this.props;
    const fetchSize = LeaderboardActions.FETCH_SIZE;

    const playerTotalMatches = player.numWin + player.numLoss + player.numTie;

    return (
      <Col
        sm={12}
        style={{
          animationDelay: `${(index % fetchSize) * 0.1}s`,
        }}
        className={classnames('mb-1', styles.leader)}
      >
        <div className={classnames(styles['leader-wrap'])}>
          <div className={classnames(styles['player-info-1'])}>
            {player.rank <= 3 ? (
              <div
                style={{
                  backgroundColor: colors[player.rank - 1],
                }}
                className={classnames(styles['leader-ava'])}
              >
                <Svg />
              </div>
            ) : <div
              style={{
                fontSize: 38,
              }}
              className={classnames(styles['leader-ava'])}
            >
                {player.rank}
              </div>}
            <div className={classnames(styles['leader-content'])}>
              <div
                className={classnames(styles['leader-name'])}
                style={{
                  display: 'inline-block',
                }}
              >
                {
                  <img
                    width={35}
                    height={35}
                    // @ts-ignore
                    src={Avatar[player.avatar]}
                    className={classnames({
                      [`${styles['leader-avatar']}`]: (currentUsername !== player.username),
                      [`${styles['leader-avatar-current']}`]: (currentUsername === player.username)
                    })}
                  />
                }
              </div>

              <div
                className={classnames(styles['leader-score'])}
                style={{
                  display: 'inline-block',
                }}
              >
                <div
                  className={classnames('text-light', styles['leader-score_title'])}
                  style={{
                    display: 'block',
                    fontSize: '16px',
                    whiteSpace: 'nowrap',
                  }}
                  title={player.username}
                >
                  <span>{`${player.username.substr(0, 15)}${
                    player.username.length > 15 ? '...' : ''
                    }`}</span>
                </div>
                <div
                  className={classnames(styles['leader-score_title'])}
                  style={{
                    color: 'gray',
                    display: 'block',
                    fontSize: '26px',
                    marginTop: '5px',
                  }}
                >
                  {player.rating}
                  {' '}
                  {player.type === 'Student'
                    ? <FontAwesomeIcon
                        style={{ fontSize: 18, display: 'inline' }}
                        icon={faGraduationCap}
                        title={'Student Participant'}
                      />
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className={classnames(styles['player-info-2'])}>
            <div className={classnames(styles['leader-flag'])}>
              <ReactCountryFlag code={player.country} svg alt={player.country} />
            </div>

            {!(isPlayAgainstDisabled || currentUsername === player.username)
              ? <Button
                bsStyle="danger"
                style={{ fontSize: '0.55em' }}
                bsSize="xsmall"
                onClick={() => runMatch(player.id)}
                title={`Start match`}
              >
                <img src="assets/img/fight.png" width={15} height={15} />
              </Button>
              : null
            }
          </div>
        </div>
        <div className={classnames('progress', styles['leader-bar'])}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              backgroundColor: '#28A745',
              width: `${(player.numWin * 100) / playerTotalMatches}%`,
            }}
          />
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              backgroundColor: '#FFC107',
              width: `${(player.numTie * 100) / playerTotalMatches}%`,
            }}
          />
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              backgroundColor: '#DB3444',
              width: `${(player.numLoss * 100) / playerTotalMatches}%`,
            }}
          />
        </div>
      </Col>
    );
  }
}
