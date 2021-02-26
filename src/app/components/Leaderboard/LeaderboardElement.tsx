import { faCaretDown, faCaretUp, faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconsComponent } from 'app/components/Leaderboard/IconElement';
import * as styles from 'app/styles/Leaderboard.module.css';
import { Avatar, avatarName } from 'app/types/Authentication/Register';
import { Request } from 'app/types/code/Submission';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import classnames from 'classnames';
// import { type } from 'os';
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
  {
    isModelOpen: boolean;
    onHover: boolean;
    optionsPie: object;
  }
> {
  // tslint:disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      isModelOpen: false,
      onHover: false,
      optionsPie: {
        chart: {
          foreColor: 'gray',
          width: '50%',
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
    const {
      player,
      index,
      isPlayAgainstDisabled,
      currentUsername,
      updatePlayerId2,
      updateRequest,
    } = this.props;
    const ratingArray: number[] = [];
    const labelArray: string[] = [];
    let tempDate = '';
    let prevRate = 0;
    let maxWinningStreak = 0;
    let curWinningStreak = 0;
    let currentRate = 0;
    player.rating.forEach((element) => {
      currentRate = Math.round(element.rating * 100) / 100;
      ratingArray.push(currentRate);

      if (currentRate > prevRate) {
        curWinningStreak += 1;
      } else {
        if (curWinningStreak > maxWinningStreak) {
          maxWinningStreak = curWinningStreak;
          curWinningStreak = 0;
        }
      }
      prevRate = currentRate;

      let realDate = '';
      const dateobj = new Date(element.validFrom);
      realDate = dateobj.toLocaleDateString('en-GB').substr(0, 5);
      if (realDate === tempDate) {
        labelArray.push(' ');
      } else {
        tempDate = realDate;
        labelArray.push(realDate);
      }
    });
    const series = { data: ratingArray, name: 'Points' };
    const optionsLine = {
      chart: {
        foreColor: 'gray',
        height: 40,
        id: 'basic-bar',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
        markers: {
          colors: ['rgb(0, 143, 251)', 'rgb(0, 227, 150)', 'rgb(254, 176, 25)'],
        },
        style: {
          colors: ['#000000', '#000000', '#000000'],
        },
      },
      markers: {
        hover: {
          size: '0',
          sizeOffset: '0',
        },
        size: '0',
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        axisBorder: {
          color: '#000',
          show: true,
        },
        axisTicks: {
          show: false,
        },
        categories: labelArray,
        labels: {
          style: {
            colors: 'rgb(255,255,255)',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: 'rgb(255,255,255)',
          },
        },
      },
      stroke: {	
        curve: 'smooth',	
      },	
      xaxis: {
        categories: labelArray,
        axisTicks: {
          show: false,
        },
      }
      
    };
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
            <FontAwesomeIcon
              style={{
                color:
                  player.rating.length > 1
                    ? player.rating[player.rating.length - 1].rating >
                      player.rating[player.rating.length - 2].rating
                      ? 'green'
                      : 'red '
                    : 'green',
                display: 'inline',
                fontSize: 29,
                marginTop: '20px',
              }}
              icon={
                player.rating.length > 1
                  ? player.rating[player.rating.length - 1].rating >
                    player.rating[player.rating.length - 2].rating
                    ? faCaretUp
                    : faCaretDown
                  : faCaretUp
              }
            />
            {player.rank <= 3 ? (
              <div
                style={{
                  color: colors[player.rank],
                  marginLeft: '4px',
                  marginRight: '0px',
                  position: 'relative',
                  top: '20%',
                }}
              >
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
                  marginLeft: '4px',
                }}
                className={classnames(
                  player.rank <= 9 ? styles['leader-ava'] : styles['leader-ava-l'],
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
                    src={Avatar[avatarName[player.avatarId]]}
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
                <div style={{ display: 'flex' }}>
                  <div className="col-auto">
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
                    <div className={classnames(styles['leader-flag'], 'mt-2')}>
                      <ReactCountryFlag
                        code={player.country === 'null' ? player.country : 'IN'}
                        svg
                        alt={player.country}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={classnames(styles['player-info-2'])}>
            {!(isPlayAgainstDisabled || currentUsername === player.username) ? (
              <div style={{ fontSize: '0.55em', cursor: 'pointer' }} title={`Start match`}>
                <img
                  src="./assets/img/fight.png"
                  width={30}
                  height={30}
                  className="mr-3"
                  style={{
                    filter:
                      ' invert(14%) sepia(3%) saturate(68960%) hue-rotate(320deg) brightness(102%) contrast(110%)',
                  }}
                  onClickCapture={async (e) => {
                    // hello
                    e.stopPropagation();
                    await updatePlayerId2(player.userId);
                    await updateRequest(Request.MANUAL);
                    this.props.getTimer();
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <IconsComponent player={player} />
        </div>
        <div
          style={{
            borderTop: `${this.state.isModelOpen ? '1px solid grey' : ''}`,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {this.state.isModelOpen ? (
            <div
              className={classnames(styles.chart_holder, 'row', 'justify-content-center')}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className={classnames(styles.chart_div, styles.pie_chart)}>
                <Chart
                  options={this.state.optionsPie}
                  series={[player.ties, player.wins, player.losses]}
                  type="donut"
                  width="400"
                />
                <div className={classnames(styles.winning_streak)}>
                  Highest winning streak: {maxWinningStreak}
                </div>
              </div>
              <div className={classnames(styles.chart_div)}>
                <Chart options={optionsLine} series={[series]}  type="line" width="800" />
              </div>
            </div>
          ) : null}
        </div>
      </Col>
    );
  }
}
