import * as styles from 'app/styles/DeltaStarCount.module.css';
import * as DeltaStarCountInterfaces from 'app/types/DeltaStarCount';
import classnames from 'classnames';
import * as React from 'react';

export class DeltaStarCount extends React.Component<DeltaStarCountInterfaces.Props, {}> {
  constructor(props: DeltaStarCountInterfaces.Props) {
    super(props);
  }

  public render() {
    return <span>{this.mapStars()}</span>;
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
      <img
        src={`assets/img/deltaLogoGreen.png`}
        className={classnames(styles.deltaStar)}
        height={17}
        width={17}
      />
    ) : (
      <img
        src={`assets/img/deltaLogo.png`}
        className={classnames(styles.deltaStar)}
        height={17}
        width={17}
      />
    );
  }
}
