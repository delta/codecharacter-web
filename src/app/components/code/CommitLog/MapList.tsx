import { Props } from 'app/containers/code/MapList';
import * as styles from 'app/styles/CommitLog.module.css';
import { Map, Request } from 'app/types/code/Submission';
import classnames from 'classnames';
import * as React from 'react';

export class MapList extends React.Component<Props, {}> {
  public render() {
    const { updateMapId, updateRequest } = this.props;
    const maps: Map[] = [
      {
        mapId: 1,
        name: 'Map of kings',
      },
      {
        mapId: 2,
        name: 'The forbidden isle of Zeus',
      },
      {
        mapId: 3,
        name: 'The End of fucking world',
      },
      {
        mapId: 4,
        name: 'Not your map',
      },
      { mapId: 5, name: 'You cannot win in this one' },
    ];
    return (
      <div className={classnames(styles.dropdown)}>
        {maps.map((map, index) => (
          <div
            className={classnames(styles.dropdownItem)}
            onClick={(e) => {
              updateRequest(Request.PREVIOUS_COMMIT_MATCH);
              updateMapId(map.mapId);
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
