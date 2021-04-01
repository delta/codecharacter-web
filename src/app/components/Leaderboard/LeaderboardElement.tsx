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
import { Button, Modal } from 'react-bootstrap';

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
          width: '100%',
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
      tooltip: {
        theme: 'dark',
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
    };
    return (
      <>
        <tr
          style={{
            animationDelay: `${(index % 10) * 0.15}s`,
            position: 'relative',
          }}
          className={classnames('mb-1', styles.leader)}
          onClick={this.handleOnClick}
          onMouseEnter={this.handleOnMouseEnter}
          onMouseLeave={this.handleOnMouseLeave}
        >
          <td
            className={classnames(styles['player-info-1'])}
            style={{ alignItems: 'flex-end', paddingTop: 0 }}
          >
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
                  color: 'white',
                  marginLeft: '4px',
                }}
                className={classnames(
                  player.rank <= 9 ? styles['leader-ava'] : styles['leader-ava-l'],
                )}
              >
                {player.rank}
              </div>
            )}
          </td>

          <td className={classnames(styles['leader-score'], 'text-center', 'pb-0')}>
            <div style={{ display: 'inline-flex', float: 'left' }}>
              <img
                style={{ marginTop: '5px' }}
                width={35}
                height={35}
                // @ts-ignore
                src={Avatar[avatarName[player.avatarId]]}
                className={classnames({
                  [`${styles['leader-avatar']}`]: currentUsername !== player.username,
                  [`${styles['leader-avatar-current']}`]: currentUsername === player.username,
                })}
              />
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
                    <span style={{ fontFamily: 'Lato' }}>{`${player.username.substr(0, 20)}${
                      player.username.length > 20 ? '...' : ''
                    }`}</span>
                  </div>
                  <div
                    className={classnames(styles['leader-flag'], 'mt-2', 'ml-0')}
                    style={{ float: 'left' }}
                  >
                    <ReactCountryFlag
                      code={player.country === 'null' ? player.country : 'IN'}
                      svg
                      alt={player.country}
                    />
                  </div>
                </div>
              </div>
            </div>
          </td>
          <IconsComponent player={player} />
          <td>
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
          </td>
        </tr>
        <div onClick={(e) => e.stopPropagation()}>
          <Modal
            show={this.state.isModelOpen}
            onHide={this.handleOnClick}
            animation={false}
            className="leaderboard-modal"
          >
            <Modal.Header style={{ backgroundColor: '#2c2c2c', borderBottom: '0px' }}>
              <Button className="close" onClick={this.handleOnClick} style={{ color: 'white' }}>
                ×
              </Button>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#2c2c2c' }}>
              <div className={classnames(styles.chart_holder, 'row', 'justify-content-center')}>
                <div className={classnames(styles.chart_div, styles.pie_chart)}>
                  <Chart
                    options={this.state.optionsPie}
                    series={[player.ties, player.wins, player.losses]}
                    type="donut"
                    width="100%"
                  />
                  <div className={classnames(styles.winning_streak)}>
                    Highest winning streak: {maxWinningStreak}
                  </div>
                </div>
                <div className={classnames(styles.chart_div)}>
                  <Chart options={optionsLine} series={[series]} type="line" width="100%" />
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}
