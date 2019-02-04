import { LeaderboardElement } from 'app/components/Leaderboard/LeaderboardElement';
import * as styles from 'app/styles/Leaderboard.module.css';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

export class Leaderboard extends React.Component<LeaderboardInterfaces.Props, {}> {
  public render() {
    const { players } = this.props;
    return (
      <Grid fluid={true} className={classnames(styles.Leaderboard)}>
        <Row className="justify-content-between py-2 pl-3">
          <Col className="text-light font-weight-bold my-auto">LEADERBOARD</Col>
        </Row>
        <Row className={styles['leaderboard-wrap']}>
          {players.length ? (
            players.map((player, rank) => (
              <LeaderboardElement player={player} rank={rank} key={rank} />
            ))
          ) : (
            <div>Nothing to show</div>
          )}
        </Row>
      </Grid>
    );
  }
}
