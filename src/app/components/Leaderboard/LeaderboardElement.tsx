import { LeaderboardActions } from 'app/actions';
import { Svg } from 'app/components/code/Svg';
import * as styles from 'app/styles/Leaderboard.module.css';
import classnames from 'classnames';
import * as React from 'react';
import { Button, Col } from 'react-bootstrap';
import Player = LeaderboardActions.Player;
import MAX_RATING = LeaderboardActions.MAX_RATING;

// @ts-ignore
// tslint:disable-next-line:import-name
import ReactCountryFlag from 'react-country-flag';
const colors = ['#FFB900', '#69797E', '#847545', '#038387'];

export class LeaderboardElement extends React.Component<LeaderboardElement.Props, {}> {
  public render() {
    const { player, rank } = this.props;
    return (
      <Col
        sm={12}
        key={player.id}
        style={{
          animationDelay: `${rank * 0.1}s`,
        }}
        className={classnames('mb-1', styles.leader)}
      >
        <div className={classnames(styles['leader-wrap'])}>
          <div className={classnames(styles['player-info-1'])}>
            {rank < 3 ? (
              <div
                style={{
                  backgroundColor: colors[rank],
                }}
                className={classnames(styles['leader-ava'])}
              >
                <Svg />
              </div>
            ) : null}
            <div className={classnames(styles['leader-content'])}>
              <div className={classnames(styles['leader-name'])}>{`${rank + 1}. ${
                player.name
              }`}</div>

              <div className={classnames(styles['leader-score'])}>
                <div className={classnames(styles['leader-score_title'])}>
                  {player.rating} ratings
                </div>
              </div>
            </div>
          </div>

          <div className={classnames(styles['player-info-2'])}>
            <div className={classnames(styles['leader-flag'])}>
              <ReactCountryFlag code={player.country} svg alt={player.country} />
            </div>

            <Button bsStyle="danger" style={{ fontSize: '0.55em' }} bsSize="xsmall">
              PLAY
            </Button>
          </div>
        </div>
        <div
          style={{ animationDelay: `${0.4 + rank * 0.2}s` }}
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

export namespace LeaderboardElement {
  export interface OwnProps {
    player: Player;
    rank: number;
  }
  export type Props = OwnProps;
}
