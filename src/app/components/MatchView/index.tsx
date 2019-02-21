import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MatchElement } from 'app/components/MatchView/MatchElement';
import * as styles from 'app/styles/MatchView.module.css';
import * as MatchInterfaces from 'app/types/MatchView';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
// tslint:disable-next-line
import ReactPaginate from 'react-paginate';

export class Match extends React.Component<MatchInterfaces.Props, MatchInterfaces.State> {
  private static paginationSize = 15;
  constructor(props: MatchInterfaces.Props) {
    super(props);
    this.state = {
      activeMatchViewTab: MatchInterfaces.MatchViewTabType.MY_MATCHES,
      offset: 0,
    };
  }

  public componentDidMount() {
    this.props.getMatches();
    this.props.getTopMatches();
  }

  public handlePageClick = (data: { selected: number }) => {
    this.setState({
      offset: Math.ceil(data.selected * Match.paginationSize),
    });
  };

  public render() {
    const { activeMatchViewTab } = this.state;
    const { matches, topMatches } = this.props;

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
                this.props.getMatches();
              }}
            >
              {' '}
              My Matches{' '}
            </button>
          </div>
          <div className="col d-flex justify-content-center mb-3">
            <button
              className={classnames(styles.customBtn, {
                [`${styles.buttonActive}`]:
                  activeMatchViewTab === MatchInterfaces.MatchViewTabType.TOP_MATCHES,
              })}
              onClick={() => {
                this.toggleNotificationTab(MatchInterfaces.MatchViewTabType.TOP_MATCHES);
                this.props.getTopMatches();
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
                  index >= this.state.offset &&
                  index <= this.state.offset + Match.paginationSize - 1 ? (
                    <MatchElement match={match} index={index - 1} key={index - 1} />
                  ) : null
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
                index >= this.state.offset &&
                index <= this.state.offset + Match.paginationSize - 1 ? (
                  <MatchElement match={match} index={index - 1} key={index - 1} />
                ) : null
              ) : (
                <div className="ml-5"> Nothing to show </div>
              ),
            )
          ) : (
            <div className="ml-5"> Nothing to show </div>
          )}
        </Row>
        <Row>
          <Col className="d-flex justify-content-center" style={{ width: '100vw', margin: '10px' }}>
            <ReactPaginate
              previousLabel={
                <span>
                  <FontAwesomeIcon icon={faCaretLeft} /> <FontAwesomeIcon icon={faCaretLeft} />
                </span>
              }
              nextLabel={
                <span>
                  <FontAwesomeIcon icon={faCaretRight} /> <FontAwesomeIcon icon={faCaretRight} />
                </span>
              }
              breakLabel={'...'}
              breakClassName={'break-me'}
              marginPagesDisplayed={1}
              pageClassName={'atag'}
              pageRangeDisplayed={2}
              pageCount={Math.ceil(matches.length / Match.paginationSize)}
              activeLinkClassName={'active'}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </Col>
        </Row>
      </Grid>
    );
  }

  private toggleNotificationTab = (activeMatchViewTab: MatchInterfaces.MatchViewTabType) => {
    this.setState({
      activeMatchViewTab,
    });
  };
}
