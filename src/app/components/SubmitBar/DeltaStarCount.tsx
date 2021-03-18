import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/DeltaStarCount.module.css';
import * as DeltaStarCountInterfaces from 'app/types/DeltaStarCount';
import classnames from 'classnames';
import * as React from 'react';

enum StarType {
  GOLD = 'gold',
  GRAY = 'gray',
}

export class DeltaStarCount extends React.Component<DeltaStarCountInterfaces.Props, {}> {
  constructor(props: DeltaStarCountInterfaces.Props) {
    super(props);
  }

  public render() {
    const starsArray = [0, 0, 0];
    for (let index = 0; index < this.props.rating; index += 1) starsArray[index] = 1;
    return (
      <span className={classnames(styles.deltaStarSpan)}>
        {starsArray.map((value) => (
          <FontAwesomeIcon
            className={classnames(styles.deltaStar)}
            icon={faStar}
            style={value === 1 ? { color: StarType.GOLD } : { color: StarType.GRAY }}
          />
        ))}
      </span>
    );
  }
}
