import {
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faArrowRight,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LeaderboardElement } from 'app/components/Leaderboard/LeaderboardElement';
import { Timer } from 'app/components/Leaderboard/Timer';
import SocketHandler from 'app/containers/SocketHandler';
import * as styles from 'app/styles/Leaderboard.module.css';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { ScaleLoader } from 'react-spinners';

export class Leaderboard extends React.Component<
  LeaderboardInterfaces.Props,
  LeaderboardInterfaces.State
> {
  private leaderboard = React.createRef<HTMLDivElement>();
  private search = React.createRef<HTMLInputElement>();

  constructor(props: LeaderboardInterfaces.Props) {
    super(props);
    this.state = {
      currentDiv: LeaderboardInterfaces.DivisionType.ALL,
      currentUserType: LeaderboardInterfaces.UserType.ALL,
      isModelOpen: false,
      isSearching: false,
      nextFetchIndex: 1,
      offset: 0,
      pageSize: Math.floor((window.innerHeight * 0.8) / 100),
      pattern: '',
    };
  }

  public componentWillMount(): void {
    this.props.clearLeaderboard();
    const noOfElems = Math.floor((window.innerHeight * 0.8) / 100);
    this.props.getLeaderboard(this.state.nextFetchIndex, noOfElems);
    this.props.getTimer();
  }

  public componentDidUpdate(
    nextProps: LeaderboardInterfaces.Props,
    nextState: LeaderboardInterfaces.State,
  ): void {
    if (
      this.state.currentDiv !== nextState.currentDiv ||
      this.state.currentUserType !== nextState.currentUserType
    ) {
      this.getLeaderboarItems();
    }
  }

  public handlePageClick = (dir: number) => {
    if (
      (dir === -1 && this.state.nextFetchIndex + dir > 0) ||
      (dir === 1 && this.props.players.length === this.state.pageSize)
    ) {
      this.props.getLeaderboard(this.state.nextFetchIndex + dir, this.state.pageSize);
      this.setState({ nextFetchIndex: this.state.nextFetchIndex + dir });
    }
  };

  public render() {
    const {
      players,
      loading,
      timerData,
      getTimer,
      setTimer,
      runMatch,
      username: currentUsername,
      updatePlayerId2,
      updateRequest,
      isLoggedIn,
    } = this.props;
    return (
      <>
        <NavBar isLoggedIn={isLoggedIn} page={NavPage.LEADERBOARD} />
        <Grid fluid={true} className={classnames(styles.Leaderboard)}>
          {isLoggedIn ? <SocketHandler /> : null}
          <Row className={classnames('py-4 pl-3')}>
            <Col
              sm={10}
              className="text-light font-weight-bold my-auto"
              style={{ paddingLeft: '25px', paddingRight: '0 !important' }}
            >
              <input
                placeholder="Search for..."
                ref={this.search}
                onChange={(e) => this.updatePattern(e.target.value)}
                className={classnames(styles.textbox, '')}
              />
            </Col>
            <Col sm={2}>
              <button
                className={styles.button}
                onClick={() => {
                  this.setState({ isSearching: false });
                  this.props.getLeaderboard(this.state.nextFetchIndex, this.state.pageSize);
                }}
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
            <Col>
              <div className={styles.dropdown} style={{ paddingRight: '10px' }}>
                <button className={styles.dropbtn}>
                  {LeaderboardInterfaces.DivisionNames[this.state.currentDiv]}
                </button>
                <FontAwesomeIcon style={{ color: 'white' }} icon={faCaretDown} />
                <div className={styles['dropdown-content']}>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      this.setState({ currentDiv: LeaderboardInterfaces.DivisionType.DIV1 });
                    }}
                    className={
                      this.state.currentDiv === LeaderboardInterfaces.DivisionType.DIV1
                        ? classnames(styles.dropDownMenuActive, styles.dropDownMenuActive)
                        : classnames(styles.dropDownMenu)
                    }
                  >
                    {LeaderboardInterfaces.DivisionNames.DIV_1}
                  </a>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      this.setState({ currentDiv: LeaderboardInterfaces.DivisionType.DIV2 });
                    }}
                    className={
                      this.state.currentDiv === LeaderboardInterfaces.DivisionType.DIV2
                        ? classnames(styles.dropDownMenuActive, styles.dropDownMenuActive)
                        : classnames(styles.dropDownMenu)
                    }
                  >
                    {LeaderboardInterfaces.DivisionNames.DIV_2}
                  </a>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      this.setState({ currentDiv: LeaderboardInterfaces.DivisionType.ALL });
                    }}
                    className={
                      this.state.currentDiv === LeaderboardInterfaces.DivisionType.ALL
                        ? classnames(styles.dropDownMenuActive, styles.dropDownMenuActive)
                        : classnames(styles.dropDownMenu)
                    }
                  >
                    {LeaderboardInterfaces.DivisionNames.All}
                  </a>
                </div>
              </div>
            </Col>
            <Col>
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>
                  {LeaderboardInterfaces.UserTypeName[this.state.currentUserType]}
                </button>
                <FontAwesomeIcon style={{ color: 'white' }} icon={faCaretDown} />
                <div className={styles['dropdown-content']}>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      this.setState({ currentUserType: LeaderboardInterfaces.UserType.STUDENT });
                    }}
                    className={
                      this.state.currentUserType === LeaderboardInterfaces.UserType.STUDENT
                        ? classnames(styles.dropDownMenuActive, styles.dropDownMenuActive)
                        : classnames(styles.dropDownMenu)
                    }
                  >
                    {LeaderboardInterfaces.UserTypeName.STUDENT}
                  </a>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      this.setState({
                        currentUserType: LeaderboardInterfaces.UserType.PROFESSIONAL,
                      });
                    }}
                    className={
                      this.state.currentUserType === LeaderboardInterfaces.UserType.PROFESSIONAL
                        ? classnames(styles.dropDownMenuActive, styles.dropDownMenuActive)
                        : classnames(styles.dropDownMenu)
                    }
                  >
                    {LeaderboardInterfaces.UserTypeName.PROFESSIONAL}
                  </a>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      this.setState({ currentUserType: LeaderboardInterfaces.UserType.ALL });
                    }}
                    className={
                      this.state.currentUserType === LeaderboardInterfaces.UserType.ALL
                        ? classnames(styles.dropDownMenuActive, styles.dropDownMenuActive)
                        : classnames(styles.dropDownMenu)
                    }
                  >
                    {LeaderboardInterfaces.UserTypeName.All}
                  </a>
                </div>
              </div>
            </Col>
            <Col
              style={{ position: 'absolute', left: '27%' }}
              className="text-light font-weight-bold my-auto"
            >
              RANK
            </Col>
            <Col
              style={{ position: 'absolute', left: '35%' }}
              className="text-light font-weight-bold my-auto"
            >
              RATING
            </Col>
            <Col
              style={{ position: 'absolute', left: '49%' }}
              className="text-light font-weight-bold my-auto"
            >
              WON
            </Col>
            <Col
              style={{ position: 'absolute', left: '57%' }}
              className="text-light font-weight-bold my-auto"
            >
              TIED
            </Col>
            <Col
              style={{ position: 'absolute', left: '66%' }}
              className="text-light font-weight-bold my-auto"
            >
              LOST
            </Col>
            <Col style={{ position: 'absolute', right: '10%' }}>
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
          className={classnames(styles['leaderboard-wrap'], 'container-fluid')}
        >
          <Row>
            <div
              className="col-12 text-center"
              style={{
                fontSize: '10px',
                marginTop: '20px',
                paddingBottom: '15px',
              }}
            >
              {timerData > 0 ? (
                <Timer timerData={timerData} getTimer={getTimer} setTimer={setTimer} />
              ) : (
                <span className="mb-2" style={{ paddingBottom: '5px', paddingTop: '5px' }}>
                  Ready to initiate Match
                </span>
              )}
            </div>

            {this.state.nextFetchIndex !== 1 ? (
              <div
                style={{ position: 'absolute', left: '10%', bottom: '50%' }}
                onClick={() => this.handlePageClick(-1)}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{
                    color: 'grey',
                    cursor: 'pointer',
                    fontSize: '30px',
                  }}
                />
              </div>
            ) : null}

            {this.props.players.length >= this.state.pageSize ? (
              <div
                style={{ position: 'absolute', right: '10%', bottom: '50%' }}
                onClick={() => this.handlePageClick(1)}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{
                    color: 'grey',
                    cursor: 'pointer',
                    fontSize: '30px',
                  }}
                />
              </div>
            ) : null}

            <div style={{ marginLeft: '20%', width: '60%' }}>
              {players.length ? (
                players.map((player, index) =>
                  player &&
                  index >= this.state.offset &&
                  index <= this.state.offset + this.state.pageSize - 1 ? (
                    <LeaderboardElement
                      updatePlayerId2={updatePlayerId2}
                      updateRequest={updateRequest}
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
                <div style={{ padding: '0px 30px', textAlign: 'center' }}>Nothing to show</div>
              )}
            </div>
            <Col
              className="d-flex justify-content-center"
              style={{ width: '100vw', margin: '10px' }}
            >
              <span
                onClick={() => this.handlePageClick(-1)}
                style={
                  this.state.nextFetchIndex !== 1
                    ? { cursor: 'pointer' }
                    : { cursor: 'not-allowed', color: '#333' }
                }
              >
                <FontAwesomeIcon icon={faAngleLeft} />
                <FontAwesomeIcon icon={faCaretLeft} />
              </span>

              <span className={classnames('mx-3')}>{this.state.nextFetchIndex}</span>

              <span
                onClick={() => this.handlePageClick(1)}
                style={
                  this.props.players.length >= this.state.pageSize
                    ? { cursor: 'pointer' }
                    : { cursor: 'not-allowed', color: '#333' }
                }
              >
                <FontAwesomeIcon icon={faAngleRight} /> <FontAwesomeIcon icon={faCaretRight} />
              </span>
            </Col>
            {loading && (
              <Col sm={12} className="d-flex justify-content-center" style={{ padding: '2px' }}>
                <ScaleLoader css={'override'} loading={loading} color={'#36D7B7'} />
              </Col>
            )}
          </Row>
        </div>
      </Grid>
    );
  }

  private getLeaderboarItems = () => {
    if (this.state.currentDiv !== LeaderboardInterfaces.DivisionType.ALL) {
      if (this.state.currentUserType !== LeaderboardInterfaces.UserType.ALL) {
        this.props.clearLeaderboard();
        this.setState({
          nextFetchIndex: 1,
        });
        this.props.getLeaderboardByDivAndType(
          this.state.currentDiv,
          this.state.nextFetchIndex,
          this.state.pageSize,
          this.state.currentUserType,
        );
      } else {
        this.props.clearLeaderboard();
        this.setState({
          nextFetchIndex: 1,
        });
        this.props.getLeaderboardByDivType(
          this.state.nextFetchIndex,
          this.state.pageSize,
          this.state.currentDiv,
        );
      }
    } else {
      if (this.state.currentUserType !== LeaderboardInterfaces.UserType.ALL) {
        this.props.clearLeaderboard();
        this.setState({
          nextFetchIndex: 1,
        });
        this.props.getLeaderboardByUserType(
          this.state.nextFetchIndex,
          this.state.pageSize,
          this.state.currentUserType,
        );
      } else {
        this.props.clearLeaderboard();
        this.setState({
          nextFetchIndex: 1,
        });
        this.props.getLeaderboard(this.state.nextFetchIndex, this.state.pageSize);
      }
    }
  };

  private searchLeaderboard = () => {
    this.props.clearLeaderboard();
    this.setState({
      nextFetchIndex: 1,
    });
    if (this.state.pattern === '') {
      this.props.getLeaderboard(this.state.nextFetchIndex, this.state.pageSize);
    } else {
      this.props.getLeaderboardByUsername(
        this.state.pattern,
        this.state.nextFetchIndex,
        this.state.pageSize,
      );
    }
  };

  private updatePattern = (pattern: string) => {
    this.setState({
      pattern,
    });
    if (pattern === '') this.props.getLeaderboard(this.state.nextFetchIndex, this.state.pageSize);
    else this.searchLeaderboard();
  };
}
