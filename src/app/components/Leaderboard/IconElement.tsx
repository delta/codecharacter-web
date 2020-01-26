import { faHandshake, faThumbsDown, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/Leaderboard.module.css';
import classnames from 'classnames';
import * as React from 'react';

// tslint:disable-next-line
export const IconsComponent = ({ player }: any) => {
  return (
    <div style={{ fontSize: '1.5rem' }}>
      <div style={{ position: 'absolute', left: '40%', top: '15px', textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Won"
          icon={faTrophy}
          className={classnames(styles.trophy)}
          aria-hidden="true"
        />
        <p style={{ color: 'grey' }}>{player.numWin}</p>
      </div>
      <div style={{ position: 'absolute', left: '55%', top: '15px', textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Tied"
          icon={faHandshake}
          className={classnames(styles.handshake)}
          aria-hidden="true"
        />
        <p style={{ color: 'grey' }}>{player.numTie}</p>
      </div>
      <div style={{ position: 'absolute', left: '70%', top: '15px', textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Lost"
          icon={faThumbsDown}
          className={classnames(styles.thumbdown)}
          aria-hidden="true"
        />
        <p style={{ color: 'grey' }}>{player.numLoss}</p>
      </div>
    </div>
  );
};
