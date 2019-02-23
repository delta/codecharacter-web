import { LeaderboardActions } from 'app/actions';
import { Svg } from 'app/components/Leaderboard/Svg';
import * as styles from 'app/styles/Leaderboard.module.css';
import { Avatar } from 'app/types/Authentication/Register';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import classnames from 'classnames';
import * as React from 'react';
import { Button, Col } from 'react-bootstrap';
import MAX_RATING = LeaderboardActions.MAX_RATING;

// @ts-ignore
// tslint:disable-next-line:import-name
import ReactCountryFlag from 'react-country-flag';
const colors = ['#FFB900', '#69797E', '#847545', '#038387'];

export class LeaderboardElement extends React.Component<LeaderboardInterfaces.ElementProps, {}> {
  public render() {
    const { player, rank, index, isPlayAgainstDisabled, runMatch, currentUsername } = this.props;
    const fetchSize = LeaderboardActions.FETCH_SIZE;
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
            ) : null}
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
                    style={{
                      display: 'inline',
                    }}
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
                  {`${player.rank}.`}{' '}
                  <span>{`${player.username.substr(0, 13)}${
                    player.username.length > 13 ? '...' : ''
                  }`}</span>
                </div>
                <div
                  className={classnames(styles['leader-score_title'])}
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    marginTop: '5px',
                  }}
                >
                  Rating: {player.rating}
                </div>
              </div>
            </div>
          </div>

          <div className={classnames(styles['player-info-2'])}>
            <div className={classnames(styles['leader-flag'])}>
              <ReactCountryFlag code={player.country} svg alt={player.country} />
            </div>

            <Button
              bsStyle="danger"
              style={{ fontSize: '0.55em' }}
              bsSize="xsmall"
              disabled={isPlayAgainstDisabled || currentUsername === player.username}
              onClick={() => runMatch(player.id)}
            >
              <img src="assets/img/fight.png" width={15} height={15} />
            </Button>
          </div>
        </div>
        <div
          style={{ animationDelay: `${0.4 + (index % fetchSize) * 0.2}s` }}
          className={classnames(styles['leader-bar'])}
        >
          <div
            style={{
              backgroundColor: rank <= 3 ? colors[rank] : colors[3],
              width: `${(player.rating / MAX_RATING) * 100}%`,
            }}
            className={classnames(styles.bar)}
          />
        </div>
      </Col>
    );
  }
}
