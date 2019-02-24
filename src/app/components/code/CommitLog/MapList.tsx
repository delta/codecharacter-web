import * as styles from 'app/styles/CommitLog.module.css';
import { MapListProps } from 'app/types/code/CommitElement';
import classnames from 'classnames';
import * as React from 'react';

export class MapList extends React.Component<MapListProps, {}> {
  public render() {
    const { maps, startMatch } = this.props;

    return (
      <div className={classnames(styles.dropdown)}>
        {maps.map((map, index) => (
          <div
            className={classnames(styles.dropdownItem)}
            onClick={(e) => {
              startMatch(map.mapId);
              e.stopPropagation();
            }}
          >
            <span className={classnames(styles.dropdownName)}>{map.name}</span>
          </div>
        ))}
      </div>
    );
  }
}
