import { faHandshake, faThumbsDown, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/Leaderboard.module.css';
import classnames from 'classnames';
import * as React from 'react';

// tslint:disable-next-line
export const IconsComponent = ({ player }: any) => {
  return (
    <>
      <td
        className={classnames(styles['leader-score_title'])}
        style={{
          color: 'white',
          fontSize: '26px',
          textAlign: 'center',
          top: '15px',
        }}
      >
        {player.rating[player.rating.length - 1].rating.toFixed(2)}{' '}
      </td>
      <td style={{ textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Won"
          icon={faTrophy}
          className={classnames(styles.trophy)}
          aria-hidden="true"
          color="#00e396"
        />
        <p style={{ color: 'white' }}>{player.wins}</p>
      </td>
      <td style={{ textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Tied"
          icon={faHandshake}
          className={classnames(styles.handshake)}
          aria-hidden="true"
          color="#008ffb"
        />
        <p style={{ color: 'white' }}>{player.ties}</p>
      </td>
      <td style={{ textAlign: 'center' }}>
        <FontAwesomeIcon
          title="Lost"
          icon={faThumbsDown}
          className={classnames(styles.thumbdown)}
          aria-hidden="true"
          color="#feb019"
        />
        <p style={{ color: 'white' }}>{player.losses}</p>
      </td>
    </>
  );
};
