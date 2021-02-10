import MapList from 'app/containers/code/MapList';
import * as styles from 'app/styles/CommitLog.module.css';
import * as CommitInterfaces from 'app/types/code/CommitElement';
import classnames from 'classnames';
import * as React from 'react';

export class CommitElement extends React.Component<CommitInterfaces.Props, CommitInterfaces.State> {
  private static commitImgType = {
    COMMIT_HEAD: './assets/img/commit-head.png',
    COMMIT_HEAD_HOVER: './assets/img/commit-head-hover.png',
    COMMIT_HEAD_HOVER_SELECT: './assets/img/commit-head-hover-select.png',
    COMMIT_INITIAL: './assets/img/commit-initial.png',
    COMMIT_INITIAL_HOVER: './assets/img/commit-initial-hover.png',
    COMMIT_INITIAL_HOVER_SELECT: './assets/img/commit-initial-hover-select.png',
    COMMIT_MIDDLE: './assets/img/commit.png',
    COMMIT_MIDDLE_HOVER: './assets/img/commit-hover.png',
    COMMIT_MIDDLE_HOVER_SELECT: './assets/img/commit-hover-select.png',
  };

  constructor(props: CommitInterfaces.Props) {
    super(props);
    this.state = {
      imgType: CommitElement.commitImgType.COMMIT_INITIAL,
      isHovered: false,
      isMapListOpen: false,
    };
  }

  public componentDidMount() {
    window.addEventListener(
      'click',
      () => {
        this.setState({
          isMapListOpen: false,
        });
      },
      false,
    );
    this.setImgType();
  }

  public componentWillMount() {
    window.removeEventListener(
      'click',
      () => {
        this.setState({
          isMapListOpen: false,
        });
      },
      false,
    );
  }

  public componentDidUpdate(prevProps: CommitInterfaces.Props, prevState: CommitInterfaces.State) {
    if (
      prevProps.index !== this.props.index ||
      prevProps.commitsLength !== this.props.commitsLength ||
      prevState.isHovered !== this.state.isHovered ||
      prevProps.isCurrentHash !== this.props.isCurrentHash
    ) {
      this.setImgType();
    }
  }

  public setImgType() {
    const { index, isCurrentHash } = this.props;
    const { isHovered } = this.state;
    let imgType;
    if (index === 0) {
      if (isHovered) imgType = CommitElement.commitImgType.COMMIT_HEAD_HOVER_SELECT;
      else if (isCurrentHash) imgType = CommitElement.commitImgType.COMMIT_HEAD_HOVER;
      else imgType = CommitElement.commitImgType.COMMIT_HEAD;
    } else if (index === this.props.commitsLength - 1) {
      if (isHovered) imgType = CommitElement.commitImgType.COMMIT_INITIAL_HOVER_SELECT;
      else if (isCurrentHash) imgType = CommitElement.commitImgType.COMMIT_INITIAL_HOVER;
      else imgType = CommitElement.commitImgType.COMMIT_INITIAL;
    } else {
      if (isHovered) imgType = CommitElement.commitImgType.COMMIT_MIDDLE_HOVER_SELECT;
      else if (isCurrentHash) imgType = CommitElement.commitImgType.COMMIT_MIDDLE_HOVER;
      else imgType = CommitElement.commitImgType.COMMIT_MIDDLE;
    }
    this.setState({
      imgType,
    });
  }

  public render() {
    const { commitDetails, checkoutCode, maps, startMatch } = this.props;
    const { isMapListOpen } = this.state;

    return (
      <div
        className={classnames(
          styles.Commit,
          'list-group-item',
          'list-group-item-action',
          'flex-column',
          'align-items-start',
        )}
      >
        <div className={classnames(styles.CommitDetails)}>
          <div className="d-flex w-100 justify-content-between">
            <h6 className="mb-1" title={commitDetails.message}>
              {commitDetails.message.length > 20
                ? `${commitDetails.message.substring(0, 20)}...`
                : commitDetails.message}
            </h6>
            {commitDetails.hash !== 'latest' ? (
              <div>
                <img
                  className={classnames(styles.ForkLogo)}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.setState({
                      isMapListOpen: !isMapListOpen,
                    });
                  }}
                  src="./assets/img/commit-match.png"
                  title="Fight this code"
                />
              </div>
            ) : null}
            {isMapListOpen ? (
              <MapList
                maps={maps}
                commitHash={commitDetails.hash}
                startMatch={(mapId: number) => {
                  startMatch(mapId, commitDetails.hash);
                  this.setState({
                    isMapListOpen: !isMapListOpen,
                  });
                }}
              />
            ) : null}
          </div>
          <p className={classnames('mb-2', styles.CommitDate)}>
            {`${new Date(commitDetails.date).toLocaleString()}`}
          </p>
        </div>
        <div
          style={{ width: '20%', marginLeft: '80%' }}
          className={classnames(styles.imgDiv)}
          onClick={() => {
            checkoutCode();
          }}
          onMouseEnter={() => {
            this.setState({ isHovered: true });
          }}
          onMouseLeave={() => {
            this.setState({ isHovered: false });
          }}
        >
          <img src={this.state.imgType} style={{ height: '100px' }} width={40} />
        </div>
      </div>
    );
  }
}
