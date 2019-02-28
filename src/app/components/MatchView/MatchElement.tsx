import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/MatchView.module.css';
import { Avatar } from 'app/types/Authentication/Register';
import * as MatchInterfaces from 'app/types/MatchView';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

export class MatchElement extends React.Component<
  MatchInterfaces.ElementProps,
  MatchInterfaces.ElementState
> {
  public MAP_THUMBNAIL = [
    'islesofcodechar',
    'timeturner',
    'treacherousmangroves',
    'mysterymap',
    'mysterymap',
  ];

  public MAP_NAME = [
    'Isles of Codecharacter',
    'Time Turner',
    'Treacherous Mangroves',
    'The Fuhrer',
    'Crossroads of Destiny',
  ];

  public constructor(props: MatchInterfaces.ElementProps) {
    super(props);
    this.state = {
      isHoveredOver: false,
    };
  }

  public render() {
    const { match, getGameLogs, type } = this.props;
    const { isHoveredOver } = this.state;

    const isMyMatch = type === MatchInterfaces.MatchViewTabType.MY_MATCHES;
    let matchResult = 'TIE';

    if (match.verdict === '0') {
      matchResult = 'TIE';
    } else if (match.verdict === '1') {
      matchResult = 'WON';
    } else {
      matchResult = 'LOST';
    }

    return (
      <Col
        sm={12}
        style={{ borderRadius: 5 }}
        className={classnames('mb-1')}
        onMouseEnter={() => {
          this.setState({
            isHoveredOver: true,
          });
        }}
        onMouseLeave={() => {
          this.setState({
            isHoveredOver: false,
          });
        }}
      >
        <div
          className={classnames(
            'w-100',
            styles.matchElement,
            type === MatchInterfaces.MatchViewTabType.TOP_MATCHES ? styles.topMatchElement : '',
            {
              [`${styles.winBackground}`]: isMyMatch && matchResult === 'WON',
              [`${styles.loseBackground}`]: isMyMatch && matchResult === 'LOST',
              [`${styles.tieBackground}`]: isMyMatch && matchResult === 'TIE',
            },
          )}
        >
          <Row className="d-flex justify-content-around ">
            <Col sm={5} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, margin: 0 }}>{`${match.username1.substr(0, 15)}${
                match.username1.length > 15 ? '...' : ''
              }`}</p>
              {match.rating1 ? (
                <p style={{ fontSize: 16 }}>
                  <b>{`${match.rating1}`}</b>
                </p>
              ) : null}
            </Col>
            <Col sm={2} style={{ textAlign: 'center' }}>
              <FontAwesomeIcon icon={faShieldAlt} />
            </Col>
            <Col sm={5} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, margin: 0 }}>{`${match.username2.substr(0, 15)}${
                match.username2.length > 15 ? '...' : ''
              }`}</p>
              {match.rating2 ? (
                <p style={{ fontSize: 16 }}>
                  <b>{`${match.rating2}`}</b>
                </p>
              ) : null}
            </Col>
          </Row>
          <div className={classnames(' d-flex justify-content-center w-100')}>
            {
              // @ts-ignore
              <img width={50} height={50} src={Avatar[match.avatar1]} />
            }
            <span className="text-capitalize text-font-weight-bold  h3 mx-3">
              {match.score1} - {match.score2}
            </span>
            {
              // @ts-ignore
              <img width={50} height={50} src={Avatar[match.avatar2]} />
            }
          </div>
          {isMyMatch ? (
            <div className=" d-flex justify-content-center text-capitalize text-font-weight-bold ">
              {matchResult}
            </div>
          ) : (
            <div className="d-flex" style={{ padding: 10 }} />
          )}
          <div className={classnames(styles.body, 'd-flex justify-content-around ')}>
            {match.games.map((game, index) => {
              let gameVerdict = 'TIE';

              if (game.verdict === '0') {
                gameVerdict = 'TIE';
              } else if (game.verdict === '1') {
                gameVerdict = 'WON';
              } else if (game.verdict === '2') {
                gameVerdict = 'LOST';
              } else {
                gameVerdict = 'RUNTIME ERROR';
              }

              return (
                <span
                  key={index}
                  className={classnames(styles.game)}
                  onClick={() => getGameLogs(game.id)}
                  title={`${this.MAP_NAME[game.mapId - 1]} - ${gameVerdict} - ${game.winType}`}
                >
                  <img
                    src={`assets/img/maps/${this.MAP_THUMBNAIL[game.mapId - 1]}.png`}
                    width={30}
                    height={30}
                    style={{
                      border: `4px solid ${
                        game.verdict === '0'
                          ? '#957f00'
                          : game.verdict === '1'
                          ? '#047104'
                          : game.verdict === '2'
                          ? '#770000'
                          : 'black'
                      }`,
                      borderRadius: 3,
                      marginBottom: 5,
                    }}
                  />
                </span>
              );
            })}
          </div>
          {isHoveredOver && isMyMatch ? (
            <div
              className=" d-flex justify-content-start text-capitalize  my-1 mx-3 h6"
              style={{
                fontSize: '12px',
                margin: '5px',
              }}
            >
              {new Date(match.playedAt).toLocaleString()}
            </div>
          ) : null}
        </div>
      </Col>
    );
  }
}
