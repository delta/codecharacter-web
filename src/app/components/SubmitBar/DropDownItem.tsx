import { Tooltip } from '@material-ui/core';
import { DeltaStarCount } from 'app/components/SubmitBar/DeltaStarCount';
import * as styles from 'app/styles/SubmitBar.module.css';
import * as DropDownItemInterfaces from 'app/types/DropDownItem';
import * as React from 'react';

export class DropDownItem extends React.Component<DropDownItemInterfaces.Props, {}> {
  constructor(props: DropDownItemInterfaces.Props) {
    super(props);
  }

  public render() {
    const { level, rating, toggleStoryModeModal, setCurrentLevel } = this.props;
    return (
      <span>
        {rating !== -1 || Number(level) === 1 ? (
          <div
            onClick={(e) => {
              setCurrentLevel(Number(level), rating);
              toggleStoryModeModal(Number(level));
            }}
          >
            <span>LVL {level}</span>
            <DeltaStarCount rating={rating} />
          </div>
        ) : (
          <Tooltip title={'Unlock the previous level'} placement={'right'}>
            <div style={{ opacity: 0.2 }}>
              <span className={styles['dropdown-content-LVL']}>LVL {level}</span>
              <DeltaStarCount rating={0} />
            </div>
          </Tooltip>
        )}
      </span>
    );
  }
}
