import { LeaderboardActions } from 'app/actions';
import { LeaderboardElement } from 'app/components/Leaderboard/LeaderboardElement';
import * as styles from 'app/styles/Leaderboard.module.css';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Player = LeaderboardActions.Player;

export class Leaderboard extends React.Component<Leaderboard.Props, {}> {
  public render() {
    const { players } = this.props;
    return (
      <Grid fluid={true} className={classnames(styles.Leaderboard)}>
        <Row className="justify-content-between py-2 pl-3">
          <Col className="text-light my-auto">LEADERBOARD</Col>
        </Row>
        <Row className={styles['leaderboard-wrap']}>
          {players.length ? (
            players.map((player, rank) => (
              <LeaderboardElement player={player} rank={rank} key={player.id} />
            ))
          ) : (
            <div>Nothing to show</div>
          )}
        </Row>
      </Grid>
    );
  }
}

export namespace Leaderboard {
  export interface StateProps {
    players: Player[];
  }

  export interface DispatchProps {
    getPlayersData: () => void;
  }

  export type Props = StateProps & DispatchProps;
}
