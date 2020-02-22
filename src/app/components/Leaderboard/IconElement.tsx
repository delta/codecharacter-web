import { faHandshake, faThumbsDown, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/Leaderboard.module.css';
import classnames from 'classnames';
import * as React from 'react';

// tslint:disable-next-line
export const IconsComponent = ({ player }: any) => {
  return (
    <div style={{ fontSize: '1.5rem' }}>
      <div style={{ position: 'absolute', left: '50%', top: '15px', textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Won"
          icon={faTrophy}
          className={classnames(styles.trophy)}
          aria-hidden="true"
        />
        <p style={{ color: 'grey' }}>{player.wins}</p>
      </div>
      <div style={{ position: 'absolute', left: '65%', top: '15px', textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Tied"
          icon={faHandshake}
          className={classnames(styles.handshake)}
          aria-hidden="true"
        />
        <p style={{ color: 'grey' }}>{player.ties}</p>
      </div>
      <div style={{ position: 'absolute', left: '80%', top: '15px', textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Lost"
          icon={faThumbsDown}
          className={classnames(styles.thumbdown)}
          aria-hidden="true"
        />
        <p style={{ color: 'grey' }}>{player.losses}</p>
      </div>
    </div>
  );
};
