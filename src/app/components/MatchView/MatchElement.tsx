import { faCaretSquareDown, faCaretSquareUp, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
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

  public MAP_NAME = ['Sands of Time', 'Sector', 'Revival', 'The Fuhrer', 'Crossroads of Destiny'];
  public constructor(props: MatchInterfaces.ElementProps) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }

  public render() {
    const { match, getGameLogs, type } = this.props;
    const { isSelected } = this.state;

    let games = null;

    if (isSelected) {
      games = match.games.map((game, index) => {
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
            className={classnames(styles.game, 'mt-2')}
            onClick={(e) => {
              getGameLogs(game.id);
              e.stopPropagation();
            }}
            title={
              isMyMatch
                ? `${this.MAP_NAME[game.mapId - 1]} - ${gameVerdict} - ${game.winType}`
                : `${this.MAP_NAME[game.mapId - 1]}`
            }
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
      });
    }

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
      <Col sm={12} style={{ borderRadius: 5, userSelect: 'none' }} className={classnames('mb-1')}>
        <div
          className={classnames(
            'w-100 container-fluid px-0',
            styles.matchElement,
            styles.topMatchElement,
          )}
        >
          <div className={classnames(' d-flex justify-content-center w-100 row mx-0')}>
            <div className="d-flex col-4 justify-content-end">
              {
                // @ts-ignore
                <img width={50} height={50} src={Avatar[match.avatar1]} />
              }
            </div>
            <div className="col-4 container-fluid justify-content-center px-0">
              <span className="text-capitalize text-font-weight-bold  h3 row justify-content-center m-0">
                {match.score1} - {match.score2}
              </span>
              <span className="row justify-content-center">
                <FontAwesomeIcon icon={faShieldAlt} />
              </span>
            </div>
            <div className="col-4 justify-content-start">
              {
                // @ts-ignore
                <img width={50} height={50} src={Avatar[match.avatar2]} />
              }
            </div>
          </div>
          <Row className="d-flex justify-content-around ">
            <Col sm={5} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, margin: 0 }}>{`${match.username1.substr(0, 10)}${
                match.username1.length > 10 ? '...' : ''
              }`}</p>
            </Col>
            {isMyMatch ? (
              <Col className=" d-flex justify-content-center text-capitalize text-font-weight-bold ">
                {matchResult}
              </Col>
            ) : (
              <Col className="d-flex" style={{ padding: 10 }} />
            )}
            <Col sm={5} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, margin: 0 }}>{`${match.username2.substr(0, 10)}${
                match.username2.length > 10 ? '...' : ''
              }`}</p>
            </Col>
          </Row>
          <div
            className={
              isSelected
                ? classnames(
                    styles.body,
                    'd-flex justify-content-around border-top border-secondary',
                  )
                : classnames(styles.body, 'd-flex justify-content-around')
            }
          >
            {games}
          </div>
          {isSelected && isMyMatch ? (
            <div
              className="d-flex justify-content-start text-capitalize  my-1 mx-3 h6"
              style={{
                fontSize: '12px',
                margin: '5px',
              }}
            >
              {new Date(match.playedAt).toLocaleString()}
            </div>
          ) : null}
        </div>
        <div
          onClick={() =>
            this.setState({
              isSelected: !isSelected,
            })
          }
          className={styles.corner_icon}
        >
          <FontAwesomeIcon icon={isSelected ? faCaretSquareUp : faCaretSquareDown} />
        </div>
      </Col>
    );
  }
}
