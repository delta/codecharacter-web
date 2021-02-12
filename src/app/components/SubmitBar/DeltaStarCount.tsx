import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/DeltaStarCount.module.css';
import * as DeltaStarCountInterfaces from 'app/types/DeltaStarCount';

import classnames from 'classnames';
import * as React from 'react';

export class DeltaStarCount extends React.Component<DeltaStarCountInterfaces.Props, {}> {
  constructor(props: DeltaStarCountInterfaces.Props) {
    super(props);
  }

  public render() {
    return <span className={classnames(styles.starSpan)}>{this.mapStars()}</span>;
  }

  private whiteStars() {
    const { rating } = this.props;
    const maxRating = 3;
    return maxRating - rating;
  }

  private mapStars() {
    const starsArray = [1, 1, 1];
    for (let index = 1; index <= this.whiteStars(); index += 1) starsArray[index - 1] = 0;
    const stars = starsArray.map((starValue) => this.starImage(starValue));
    return stars;
  }

  private starImage(value: number) {
    return value ? (
      <FontAwesomeIcon
        className={classnames(styles.star)}
        icon={faStar}
        style={{ color: 'gold' }}
      />
    ) : (
      <FontAwesomeIcon
        className={classnames(styles.star)}
        icon={faStar}
        style={{ color: 'gray' }}
      />
    );
  }
}
