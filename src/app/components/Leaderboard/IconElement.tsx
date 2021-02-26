import {
  faGraduationCap,
  faHandshake,
  faThumbsDown,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/Leaderboard.module.css';
import classnames from 'classnames';
import * as React from 'react';

// tslint:disable-next-line
export const IconsComponent = ({ player }: any) => {
  return (
    <div style={{ fontSize: '1.5rem' }}>
      <div
        className={classnames(styles['leader-score_title'])}
        style={{
          color: 'gray',
          display: 'block',
          fontSize: '26px',
          left: '35%',
          lineHeight: '2',
          marginTop: '5px',
          position: 'absolute',
          textAlign: 'center',
          top: '15px',
        }}
      >
        {player.rating[player.rating.length - 1].rating.toFixed(2)}{' '}
        {player.type === 'Student' ? (
          <FontAwesomeIcon
            style={{ fontSize: 18, display: 'inline' }}
            icon={faGraduationCap}
            title={'Student Participant'}
          />
        ) : null}
      </div>
      <div style={{ position: 'absolute', left: '52%', top: '15px', textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Won"
          icon={faTrophy}
          className={classnames(styles.trophy)}
          aria-hidden="true"
          color="#00e396"
        />
        <p style={{ color: 'grey' }}>{player.wins}</p>
      </div>
      <div style={{ position: 'absolute', left: '68%', top: '15px', textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Tied"
          icon={faHandshake}
          className={classnames(styles.handshake)}
          aria-hidden="true"
          color="#008ffb"
        />
        <p style={{ color: 'grey' }}>{player.ties}</p>
      </div>
      <div style={{ position: 'absolute', left: '85%', top: '15px', textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Lost"
          icon={faThumbsDown}
          className={classnames(styles.thumbdown)}
          aria-hidden="true"
          color="#feb019"
        />
        <p style={{ color: 'grey' }}>{player.losses}</p>
      </div>
    </div>
  );
};
