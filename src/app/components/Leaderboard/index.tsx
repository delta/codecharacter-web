import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LeaderboardElement } from 'app/components/Leaderboard/LeaderboardElement';
import { Timer } from 'app/components/Leaderboard/Timer';
import * as styles from 'app/styles/Leaderboard.module.css';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
export class Leaderboard extends React.Component<
  LeaderboardInterfaces.Props,
  LeaderboardInterfaces.State
> {
  private leaderboard = React.createRef<HTMLDivElement>();
  private search = React.createRef<HTMLInputElement>();

  constructor(props: LeaderboardInterfaces.Props) {
    super(props);
    this.state = {
      isSearching: false,
      nextFetchIndex: 1,
      pattern: '',
    };
  }

  public componentWillMount(): void {
    this.props.clearLeaderboard();
    this.props.getLeaderboard('', this.state.nextFetchIndex);
    this.props.getTimer();
  }

  public componentWillReceiveProps(nextProps: LeaderboardInterfaces.Props) {
    if (this.props.players !== nextProps.players) {
      this.setState({
        nextFetchIndex: nextProps.players.length + 1,
      });
    }
  }

  public render() {
    const {
      players,
      loading,
      timerData,
      getTimer,
      setTimer,
      runMatch,
      username: currentUsername,
    } = this.props;
    return (
      <Grid fluid={true} className={classnames(styles.Leaderboard)}>
        {this.state.isSearching ? (
          <Row className={classnames('py-2 pl-3', styles.leaderboardTitle)}>
            <Col
              sm={8}
              className="text-light font-weight-bold my-auto"
              style={{ paddingLeft: '25px' }}
            >
              <input
                placeholder="Search for..."
                ref={this.search}
                onChange={this.updatePattern}
                className={styles.textbox}
              />
            </Col>
            <Col sm={4}>
              <button
                className={styles.button}
                onClick={() => this.setState({ isSearching: false })}
              >
                <FontAwesomeIcon style={{ color: 'white' }} icon={faTimes} />
              </button>
              <button className={styles.button} onClick={this.searchLeaderboard}>
                <FontAwesomeIcon style={{ color: 'white' }} icon={faSearch} />
              </button>
            </Col>
          </Row>
        ) : (
          <Row className={classnames('py-2 pl-3', styles.leaderboardTitle)}>
            <Col
              sm={9}
              className="text-light font-weight-bold my-auto"
              style={{ paddingLeft: '25px' }}
            >
              LEADERBOARD
            </Col>
            <Col sm={3}>
              <button
                className={styles.button}
                onClick={() => this.setState({ isSearching: true })}
              >
                <FontAwesomeIcon style={{ color: 'white' }} icon={faSearch} />
              </button>
            </Col>
          </Row>
        )}
        <div
          ref={this.leaderboard}
          onScroll={this.trackScrolling}
          className={styles['leaderboard-wrap']}
        >
          <Row>
            <div
              className="col-12 text-center"
              style={{
                fontSize: '10px',
              }}
            >
              {timerData > 0 ? (
                <Timer timerData={timerData} getTimer={getTimer} setTimer={setTimer} />
              ) : (
                <span className="mb-2">Ready to initiate Match</span>
              )}
            </div>
            {players.length ? (
              players.map((player, index) =>
                player ? (
                  <LeaderboardElement
                    currentUsername={currentUsername}
                    player={player}
                    rank={player.rank}
                    index={index}
                    key={index}
                    runMatch={runMatch}
                    isPlayAgainstDisabled={timerData > 0 ? true : false}
                  />
                ) : null,
              )
            ) : (
              <div style={{ padding: '0px 30px' }}>Nothing to show</div>
            )}
            {loading && (
              <Col sm={12} className="d-flex justify-content-center" style={{ padding: '2px' }}>
                <BeatLoader
                  css={'override'}
                  margin={'5px'}
                  sizeUnit={'px'}
                  size={10}
                  loading={loading}
                  color={'#36D7B7'}
                />
              </Col>
            )}
          </Row>
        </div>
      </Grid>
    );
  }

  public trackScrolling = () => {
    const { loading } = this.props;
    const leaderboard = this.leaderboard.current!;
    if (loading) return;
    if (leaderboard.scrollHeight - leaderboard.scrollTop === leaderboard.clientHeight) {
      this.props.getLeaderboard(this.state.pattern, this.state.nextFetchIndex);
    }
  };

  private searchLeaderboard = () => {
    this.props.clearLeaderboard();
    this.setState({
      nextFetchIndex: 1,
    });
    this.props.getLeaderboard(this.state.pattern, 1);
  };

  private updatePattern = () => {
    const search = this.search.current!;
    this.setState({
      pattern: search.value,
    });
  };
}
