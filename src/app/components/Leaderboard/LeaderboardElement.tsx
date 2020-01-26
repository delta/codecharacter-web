import { faCrown, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconsComponent } from 'app/components/Leaderboard/IconElement';
import * as styles from 'app/styles/Leaderboard.module.css';
import { Avatar } from 'app/types/Authentication/Register';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import classnames from 'classnames';
import * as React from 'react';
/* tslint:disable-next-line:import-name */
import Chart from 'react-apexcharts';
import { Col } from 'react-bootstrap';

// @ts-ignore
// tslint:disable-next-line:import-name
import ReactCountryFlag from 'react-country-flag';

const colors = ['#ffd700', '#ffd700', '#C0C0C0', '#cd7f32'];

export class LeaderboardElement extends React.Component<
  LeaderboardInterfaces.ElementProps,
  { isModelOpen: boolean; onHover: boolean; options: object }
> {
  // tslint:disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      isModelOpen: false,
      onHover: false,
      options: {
        chart: {
          foreColor: 'gray',
        },
        dataLabels: {
          markers: {
            colors: ['rgb(0, 143, 251)', 'rgb(0, 227, 150)', 'rgb(254, 176, 25)'],
          },
          style: {
            colors: ['#000000', '#000000', '#000000'],
          },
        },
        fill: {
          colors: ['rgb(0, 143, 251)', 'rgb(0, 227, 150)', 'rgb(254, 176, 25)'],
        },
        labels: ['Tied', 'Won', 'Lost'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                },
              },
            },
          },
        },
      },
    };
  }

  public componentDidMount() {
    setTimeout(() => {
      // @ts-ignore
      document.getElementById('preloader-container').style.opacity = '0';
    }, 1000);

    setTimeout(() => {
      // @ts-ignore
      document.getElementById('preloader-container').style.display = 'none';
    }, 1500);
  }

  public handleOnClick = () => {
    this.setState((prevState, props) => ({
      isModelOpen: !prevState.isModelOpen,
    }));
  };

  public handleOnMouseEnter = () => {
    this.setState((prevState, props) => ({
      onHover: true,
    }));
  };

  public handleOnMouseLeave = () => {
    this.setState((prevState, props) => ({
      onHover: false,
    }));
  };

  public render() {
    const { player, index, isPlayAgainstDisabled, runMatch, currentUsername } = this.props;

    return (
      <Col
        md={26}
        style={{
          animationDelay: `${(index % 10) * 0.15}s`,
          position: 'relative',
        }}
        className={classnames('mb-1', styles.leader)}
        onClick={this.handleOnClick}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
        <div className={classnames(styles['leader-wrap'])}>
          <div className={classnames(styles['player-info-1'])}>
            {player.rank <= 3 ? (
              <div style={{ position: 'relative', top: '20%', color: colors[player.rank] }}>
                <FontAwesomeIcon
                  style={{ fontSize: 29, display: 'inline' }}
                  icon={faCrown}
                  title={'Student Participant'}
                />
              </div>
            ) : (
              <div
                style={{
                  fontSize: 38,
                }}
                className={classnames(
                  player.rank <= 10 ? styles['leader-ava'] : styles['leader-ava-l'],
                )}
              >
                {player.rank}
              </div>
            )}
            <div className={classnames(styles['leader-content'])}>
              <div
                className={classnames(styles['leader-name'])}
                style={{
                  display: 'inline-block',
                }}
              >
                {
                  <img
                    width={35}
                    height={35}
                    // @ts-ignore
                    src={Avatar[player.avatar]}
                    className={classnames({
                      [`${styles['leader-avatar']}`]: currentUsername !== player.username,
                      [`${styles['leader-avatar-current']}`]: currentUsername === player.username,
                    })}
                  />
                }
              </div>

              <div
                className={classnames(styles['leader-score'])}
                style={{
                  display: 'inline-block',
                }}
              >
                <div
                  className={classnames('text-light', styles['leader-score_title'])}
                  style={{
                    display: 'block',
                    fontSize: '16px',
                    whiteSpace: 'nowrap',
                  }}
                  title={player.username}
                >
                  <span style={{ fontFamily: 'Lato' }}>{`${player.username.substr(0, 15)}${
                    player.username.length > 15 ? '...' : ''
                  }`}</span>
                </div>
                <div
                  className={classnames(styles['leader-score_title'])}
                  style={{
                    color: 'gray',
                    display: 'block',
                    fontSize: '26px',
                    marginTop: '5px',
                  }}
                >
                  {player.rating}{' '}
                  {player.type === 'Student' ? (
                    <FontAwesomeIcon
                      style={{ fontSize: 18, display: 'inline' }}
                      icon={faGraduationCap}
                      title={'Student Participant'}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className={classnames(styles['player-info-2'])}>
            <div className={classnames(styles['leader-flag'])}>
              <ReactCountryFlag code={player.country} svg alt={player.country} />
            </div>

            {!(isPlayAgainstDisabled || currentUsername === player.username) ? (
              <div
                style={{ fontSize: '0.55em', cursor: 'pointer' }}
                onClick={() => runMatch(player.id)}
                title={`Start match`}
              >
                {this.state.onHover ? (
                  <img
                    src="assets/img/fight.png"
                    onClick={() => runMatch(player.id)}
                    width={15}
                    height={15}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <IconsComponent player={player} />
        </div>
        <div>
          {this.state.isModelOpen ? (
            <Chart
              options={this.state.options}
              series={[player.numTie, player.numWin, player.numLoss]}
              type="donut"
              width="380"
            />
          ) : null}
        </div>
      </Col>
    );
  }
}
