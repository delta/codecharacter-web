import { faBrain, faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubmissionActions } from 'app/actions';
import * as styles from 'app/styles/RunOptions.module.css';
import * as SubmitBarInterfaces from 'app/types/SubmitBar';
import classnames from 'classnames';
import * as React from 'react';

export class RunOptions extends React.Component<
  SubmitBarInterfaces.ElementProps,
  SubmitBarInterfaces.ElementOwnState
> {
  constructor(props: SubmitBarInterfaces.ElementProps) {
    super(props);
    this.state = {
      currentIndex: Number.MAX_SAFE_INTEGER,
      isMapToggle: false,
    };
  }
  public componentWillMount(): void {
    this.props.loadMaps();
  }

  public render() {
    const { maps, compileAgainst } = this.props;
    const options = [
      {
        icon: <FontAwesomeIcon icon={faBrain} />,
        name: 'Against Self',
        value: SubmissionActions.Type.SELF_MATCH,
      },
      {
        icon: <FontAwesomeIcon icon={faRobot} />,
        name: 'Against AI-1',
        value: '',
      },
      {
        icon: <FontAwesomeIcon icon={faRobot} />,
        name: 'Against AI-2',
        value: '',
      },
    ];
    return (
      <div className={classnames(styles.dropdown)}>
        {options.map((option, index) => {
          return (
            <div>
              <a
                href="#"
                key={index}
                className={classnames(styles.dropdownItem)}
                onClick={() => this.toggleMaps(index)}
              >
                <span className={classnames(styles.dropdownItemName)}>{option.name}</span>
                <span className={classnames(styles.dropdownItemIcon)}>{option.icon}</span>
              </a>
              <div
                className={index !== this.state.currentIndex ? classnames(styles.hideDropdown) : ''}
              >
                {this.state.isMapToggle && (
                  <div className={classnames(styles['dropdown-submenu'])}>
                    {maps.map((map) => (
                      <a
                        href="#"
                        key={map.mapId}
                        className={classnames(styles.dropdownItem)}
                        onClick={() => {
                          compileAgainst(false, option.value, map.mapId);
                        }}
                      >
                        <span className={classnames(styles.dropdownName)}>{map.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  private toggleMaps = (currentIndex: number) => {
    this.setState((prevState) => ({ currentIndex, isMapToggle: !prevState.isMapToggle }));
  };
}
