import { faBrain, faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubmissionActions } from 'app/actions';
import * as styles from 'app/styles/RunOptions.module.css';
import { Map } from 'app/types/code/Submission';
import * as SubmitBarInterfaces from 'app/types/SubmitBar';
import classnames from 'classnames';
import * as React from 'react';

export class RunOptions extends React.Component<
  SubmitBarInterfaces.RunOptionsProps,
  SubmitBarInterfaces.RunOptionsOwnState
> {
  constructor(props: SubmitBarInterfaces.RunOptionsProps) {
    super(props);
    this.state = {
      currentIndex: -1,
      isMapOptionsOpen: false,
    };
  }

  public componentWillMount(): void {
    window.addEventListener('click', this.props.closeOptions, false);
    this.props.loadMaps();
    this.props.getAiIds();
  }

  public componentWillUnmount(): void {
    window.removeEventListener('click', this.props.closeOptions, false);
  }

  public render() {
    const { startMatch } = this.props;
    const { currentIndex, isMapOptionsOpen } = this.state;

    const hardCodedMap: Map[] = [
      {
        mapId: 1,
        name: 'Sands of Time',
      },
      {
        mapId: 2,
        name: 'Sector',
      },
      {
        mapId: 3,
        name: 'Revival',
      },
    ];

    const maps = this.props.maps || hardCodedMap;

    const hardCodedAiIds: number[] = [1, 2];

    const aiIds = hardCodedAiIds;

    const matchOptions = [
      {
        aiId: 0,
        icon: <FontAwesomeIcon icon={faBrain} />,
        name: 'Self Code Match',
        type: SubmissionActions.Type.SELF_MATCH,
      },
    ];

    if (aiIds) {
      aiIds.map((aiId) => {
        matchOptions.push({
          aiId,
          icon: <FontAwesomeIcon icon={faRobot} />,
          name: `AI ${aiId} Match`,
          type: SubmissionActions.Type.AI_MATCH,
        });
      });
    }

    const mapOptions = (
      <div className={classnames(styles['dropdown-submenu'])}>
        {maps.map((mapElement) => (
          <div
            key={mapElement.mapId}
            className={classnames(styles.dropdownItem)}
            onClick={() =>
              startMatch(
                matchOptions[currentIndex].type,
                mapElement.mapId,
                matchOptions[currentIndex].aiId,
              )
            }
          >
            <span className={classnames(styles.dropdownName)}>{mapElement.name}</span>
          </div>
        ))}
      </div>
    );

    return (
      <div className={classnames(styles.dropdown)}>
        {matchOptions.map((option, index) => {
          return (
            <div key={index}>
              <div
                className={classnames(styles.dropdownItem)}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.toggleMapOptions(index);
                  event.stopPropagation();
                }}
              >
                <span className={classnames(styles.dropdownItemName)}>{option.name}</span>
                <span className={classnames(styles.dropdownItemIcon)}>{option.icon}</span>
              </div>
              <div>{isMapOptionsOpen && currentIndex === index ? mapOptions : null}</div>
            </div>
          );
        })}
      </div>
    );
  }

  private toggleMapOptions = (currentIndex: number) => {
    if (this.state.currentIndex === currentIndex) {
      this.setState({
        currentIndex: -1,
        isMapOptionsOpen: false,
      });
    } else {
      this.setState({
        currentIndex,
        isMapOptionsOpen: true,
      });
    }
  };
}
