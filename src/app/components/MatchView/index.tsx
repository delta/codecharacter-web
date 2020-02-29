import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MatchElement } from 'app/components/MatchView/MatchElement';
import * as styles from 'app/styles/MatchView.module.css';
import * as MatchInterfaces from 'app/types/MatchView';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

export class Match extends React.Component<MatchInterfaces.Props, MatchInterfaces.State> {
  private static paginationSize = 15;
  constructor(props: MatchInterfaces.Props) {
    super(props);
    this.state = {
      activeMatchViewTab: MatchInterfaces.MatchViewTabType.MY_MATCHES,
      pageNo: 1,
    };
  }

  public componentDidMount() {
    this.props.getMatches(this.state.pageNo, Match.paginationSize);
    this.props.getTopMatches(1, Match.paginationSize);
  }

  public handlePageClick = (dir: number) => {
    const { pageNo } = this.state;
    if (
      (dir === -1 && pageNo + dir > 0) ||
      (dir === 1 && this.props.matches.length === Match.paginationSize)
    ) {
      this.setState({
        pageNo: pageNo + dir,
      });
      this.getMatches(pageNo + dir);
    }
  };

  public compare(match1: MatchInterfaces.Match, match2: MatchInterfaces.Match) {
    const time1 = new Date(match1.playedAt).getTime();
    const time2 = new Date(match2.playedAt).getTime();

    return time2 - time1;
  }

  public render() {
    const { activeMatchViewTab } = this.state;
    const { matches, topMatches, getGameLogs, currentUsername } = this.props;

    matches.sort(this.compare);
    topMatches.sort(this.compare);

    return (
      <Grid fluid={true} className={classnames(styles.MatchView)}>
        <Row className="justify-content-between py-2 px-3">
          <Col className="text-light font-weight-bold my-auto">MATCHES</Col>
        </Row>
        <Row>
          <div className="col d-flex justify-content-center mb-3">
            <button
              className={classnames(styles.customBtn, {
                [`${styles.buttonActive}`]:
                  activeMatchViewTab === MatchInterfaces.MatchViewTabType.MY_MATCHES,
              })}
              onClick={() => {
                this.toggleNotificationTab(MatchInterfaces.MatchViewTabType.MY_MATCHES);
                this.props.getMatches(this.state.pageNo, Match.paginationSize);
              }}
            >
              {' '}
              My Matches{' '}
            </button>
          </div>
          <div className="col d-flex justify-content-center mb-3">
            <button
              className={classnames(styles.customBtn, styles.topMatchesButton, {
                [`${styles.buttonActive}`]:
                  activeMatchViewTab === MatchInterfaces.MatchViewTabType.TOP_MATCHES,
              })}
              onClick={() => {
                this.toggleNotificationTab(MatchInterfaces.MatchViewTabType.TOP_MATCHES);
                this.props.getTopMatches(1, Match.paginationSize);
              }}
            >
              {' '}
              Top Matches{' '}
            </button>
          </div>
        </Row>
        <Row className={classnames('mb-2', styles.matchViewWrap)}>
          {activeMatchViewTab === MatchInterfaces.MatchViewTabType.MY_MATCHES ? (
            matches && matches.length ? (
              matches.map((match, index) =>
                match ? (
                  <MatchElement
                    match={match}
                    index={index - 1}
                    key={index - 1}
                    getGameLogs={getGameLogs}
                    currentUserMatch={match.username1 === currentUsername}
                    type={MatchInterfaces.MatchViewTabType.MY_MATCHES}
                  />
                ) : (
                  <div className="ml-5"> Nothing to show </div>
                ),
              )
            ) : (
              <div className="ml-5"> Nothing to show </div>
            )
          ) : topMatches && topMatches.length ? (
            topMatches.map((match, index) =>
              match ? (
                <MatchElement
                  match={match}
                  index={index - 1}
                  key={index - 1}
                  getGameLogs={getGameLogs}
                  currentUserMatch={false}
                  type={MatchInterfaces.MatchViewTabType.TOP_MATCHES}
                />
              ) : (
                <div className="ml-5"> Nothing to show </div>
              ),
            )
          ) : (
            <div className="ml-5"> Nothing to show </div>
          )}
        </Row>
        {activeMatchViewTab === MatchInterfaces.MatchViewTabType.MY_MATCHES &&
        matches.length > 0 ? (
          <Row>
            <Col
              className="d-flex justify-content-center"
              style={{ width: '100vw', margin: '10px' }}
            >
              <div>
                <span
                  className={classnames('px-2 py-1 border border-white')}
                  style={{ borderRadius: '16px', cursor: 'pointer' }}
                  onClick={() => this.handlePageClick(-1)}
                >
                  <FontAwesomeIcon icon={faCaretLeft} /> <FontAwesomeIcon icon={faCaretLeft} />
                </span>
                <span
                  className={classnames('mx-3 px-3 py-1')}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    color: 'black',
                    fontFamily: 'Karla',
                    fontWeight: 'bold',
                  }}
                >
                  {this.state.pageNo}
                </span>
                <span
                  className={classnames('px-2 py-1 border border-white')}
                  onClick={() => this.handlePageClick(1)}
                  style={{ borderRadius: '16px', cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={faCaretRight} /> <FontAwesomeIcon icon={faCaretRight} />
                </span>
              </div>
            </Col>
          </Row>
        ) : null}
      </Grid>
    );
  }

  private getMatches(page: number) {
    if (this.state.activeMatchViewTab === MatchInterfaces.MatchViewTabType.MY_MATCHES) {
      this.props.getMatches(page, Match.paginationSize);
    }
  }

  private toggleNotificationTab = (activeMatchViewTab: MatchInterfaces.MatchViewTabType) => {
    this.setState({
      activeMatchViewTab,
    });
  };
}
