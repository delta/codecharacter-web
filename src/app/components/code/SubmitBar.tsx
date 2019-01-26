import { faCloud, faCodeBranch, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/SubmitBar.module.css';
import classnames from 'classnames';
import * as React from 'react';

export class SubmitBar extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={classnames(styles.SubmitBar)}>
        <button className={classnames(styles.customBtn)}>
          <div>
            <span className={classnames(styles.icon)}>
              <FontAwesomeIcon icon={faPlay} />
            </span>
            <span>RUN</span>
          </div>
        </button>
        <button className={classnames(styles.customBtn)}>
          <span className={classnames(styles.icon)}>
            <FontAwesomeIcon icon={faCloud} />
          </span>
          <span>SAVE</span>
        </button>
        <button className={classnames(styles.customBtn)}>
          <span className={classnames(styles.icon)}>
            <FontAwesomeIcon icon={faCodeBranch} />
          </span>
          <span>COMMIT</span>
        </button>
      </div>
    );
  }
}

export namespace SubmitBar {}
