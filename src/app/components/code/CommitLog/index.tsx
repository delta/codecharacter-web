import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommitElement } from 'app/components/code/CommitLog/CommitElement';
import * as styles from 'app/styles/CommitLog.module.css';
import 'app/styles/Pagination.css';
import { Commit } from 'app/types/code/Code';
import * as CommitLogInterfaces from 'app/types/code/CommitLog';
import classnames from 'classnames';
import * as React from 'react';
// tslint:disable-next-line
import ReactPaginate from 'react-paginate';

import { Col, Grid, Row } from 'react-bootstrap';

export class CommitLog extends React.Component<
  CommitLogInterfaces.Props,
  CommitLogInterfaces.State
> {
  private static paginationSize = 10;
  constructor(props: CommitLogInterfaces.Props) {
    super(props);
    this.state = {
      offset: 0,
    };
  }

  public componentDidMount() {
    this.props.getCommitLog();
  }

  public handlePageClick = (data: { selected: number }) => {
    this.setState({
      offset: Math.ceil(data.selected * CommitLog.paginationSize),
    });
  };

  public render() {
    const currentDate = new Date();
    const latestCommit = {
      date: currentDate.toString(),
      hash: 'latest',
      message: 'Your Current Code',
    };
    const renderCommitLog: Commit[] = [];
    renderCommitLog.push(latestCommit);
    const { checkoutCode, currentCommitHash, forkCode, commitLog } = this.props;
    renderCommitLog.push(...commitLog);
    return (
      <Grid fluid={true} className={classnames(styles.CommitLog)}>
        <Row className="justify-content-between py-2 pl-3">
          <Col className="text-light font-weight-bold my-auto">COMMIT LOG</Col>
        </Row>
        <Row className={styles['commitlog-wrap']}>
          {renderCommitLog.map((commit, index) =>
            index >= this.state.offset &&
            index <= this.state.offset + CommitLog.paginationSize - 1 ? (
              <CommitElement
                isCurrentHash={currentCommitHash === commit.hash}
                checkoutCode={() => checkoutCode(commit.hash)}
                key={index}
                index={index}
                forkCode={() => {
                  forkCode(commit.hash);
                }}
                commitDetails={commit}
                commitsLength={renderCommitLog.length}
                startMatch={this.props.startPreviousCommitMatch}
              />
            ) : null,
          )}
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
              pageCount={Math.max(renderCommitLog.length / CommitLog.paginationSize)}
              marginPagesDisplayed={1}
              pageClassName={'atag'}
              pageRangeDisplayed={2}
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
}
