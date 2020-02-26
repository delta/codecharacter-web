import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Svg } from 'app/components/Leaderboard/Svg';
import * as styles from 'app/styles/Leaderboard.module.css';
import { Avatar } from 'app/types/Authentication/Register';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import classnames from 'classnames';
import * as React from 'react';
import { Button, Col } from 'react-bootstrap';

// @ts-ignore
// tslint:disable-next-line:import-name
import ReactCountryFlag from 'react-country-flag';
const colors = ['#FFB900', '#69797E', '#847545', '#038387'];

const SmallComponent = ({player,playerTotalMatches}:any) =>{
  return(
      <div>
        <svg height="60" width="100" fill="white">
          <text x="12" y="35">Won({Math.floor((player.numWin * 100) / playerTotalMatches)}%)</text>
          <circle cx="30" cy="50" r="5" fill="rgb(40, 167, 69)" />
        </svg> 
        <svg height="60" width="100" fill="white">
          <text x="23" y="35">Tied({Math.floor((player.numTie * 100) / playerTotalMatches)}%)</text>
          <circle cx="50" cy="50" r="5" fill="rgb(255, 193, 7)" />
        </svg> 
        <svg height="60" width="100" fill="white">
          <text x="28" y="35">Lost({Math.floor((player.numLoss * 100) / playerTotalMatches)}%)</text>
          <circle cx="70" cy="50" r="5" fill="#DB3444" />
        </svg> 
      </div>
  );
}

export class LeaderboardElement extends React.Component<LeaderboardInterfaces.ElementProps, {isModelOpen:boolean}> {
  constructor(props:any){
    super(props);
    this.state={
      isModelOpen:false
    } 
  } 

  public handleOnClick = () =>{
    this.setState((prevState, props) => ({
      isModelOpen: !prevState.isModelOpen
    }));
  }

  public render() {
    const { player, index, isPlayAgainstDisabled, runMatch, currentUsername } = this.props;

    const playerTotalMatches = player.numWin + player.numLoss + player.numTie;

    return (
      <Col
        sm={12}
        style={{
          animationDelay: `${(index % 10) * 0.1}s`,
        }}
        className={classnames('mb-1', styles.leader)}
      >
        <div className={classnames(styles['leader-wrap'])}>
          <div className={classnames(styles['player-info-1'])}>
            {player.rank <= 3 ? (
              <div
                style={{
                  backgroundColor: colors[player.rank - 1],
                }}
                className={classnames(styles['leader-ava'])}
              >
                <Svg />
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
                  <span>{`${player.username.substr(0, 15)}${
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
              <ReactCountryFlag code={player.country} svg alt={player.country}/>
            </div>

            {!(isPlayAgainstDisabled || currentUsername === player.username) ? (
              <Button
                bsStyle="danger"
                style={{ fontSize: '0.55em' }}
                bsSize="xsmall"
                onClick={() => runMatch(player.id)}
                title={`Start match`}
              >
                <img src="assets/img/fight.png" width={15} height={15} />
              </Button>
            ) : null}
          </div>
        </div>
        <div>
          {this.state.isModelOpen?(
            <SmallComponent player={player} playerTotalMatches={playerTotalMatches}/>
          ):null}
        </div>
        <div className={classnames('progress', styles['leader-bar'])} onClick={this.handleOnClick}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              backgroundColor: '#28A745',
              width: `${(player.numWin * 100) / playerTotalMatches}%`,
            }}
          />
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              backgroundColor: '#FFC107',
              width: `${(player.numTie * 100) / playerTotalMatches}%`,
            }}
          />
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              backgroundColor: '#DB3444',
              width: `${(player.numLoss * 100) / playerTotalMatches}%`,
            }}
          />
        </div>
      </Col>
    );
  }
}
