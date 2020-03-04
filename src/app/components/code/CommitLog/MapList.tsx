import { Props } from 'app/containers/code/MapList';
import * as styles from 'app/styles/CommitLog.module.css';
import { Map, Request } from 'app/types/code/Submission';
import classnames from 'classnames';
import * as React from 'react';

export class MapList extends React.Component<Props, {}> {
  public render() {
    const { updateMapId, updateRequest, updateCommitHash, commitHash } = this.props;
    const maps: Map[] = [
      {
        mapId: 1,
        name: 'Sands of Time',
      },
      {
        mapId: 2,
        name: 'Sector',
      },
      {
        mapId: 3,
        name: 'Revival',
      },
    ];
    return (
      <div className={classnames(styles.dropdown)}>
        {maps.map((map, index) => (
          <div
            className={classnames(styles.dropdownItem)}
            onClick={async (e) => {
              await updateMapId(map.mapId);
              await updateCommitHash(commitHash);
              updateRequest(Request.PREVIOUS_COMMIT_MATCH);
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
