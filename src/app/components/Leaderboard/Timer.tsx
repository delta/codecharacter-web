import * as React from 'react';

export class Timer extends React.Component<Props, State> {
  public secondsRemaining = 0;
  public intervalHandle = 0;
  constructor(props: Props) {
    super(props);

    this.state = {
      minutes: 0,
      seconds: 0,
      totalSeconds: this.props.timerData,
    };
  }

  public render() {
    if (this.intervalHandle === 0) {
      // @ts-ignore
      this.intervalHandle = setInterval(this.tick, 1000);
    }
    const { minutes, seconds } = this.state;
    return <span>{`Please wait ${minutes} minutes, ${seconds} seconds to initiate a match.`}</span>;
  }

  private tick = (): void => {
    const { totalSeconds } = this.state;
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds - Math.floor(totalSeconds / 60) * 60;

    this.setState({
      minutes: min,
      seconds: sec,
      totalSeconds: totalSeconds <= 0 ? 0 : totalSeconds - 1,
    });

    if (min === 0 && sec === 0) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = 0;
      this.props.setTimer(0);
      this.props.getTimer();
    }
  };
}

export interface Props {
  timerData: number;
  getTimer: () => void;
  setTimer: (timerData: number) => void;
}

export interface State {
  totalSeconds: number;
  seconds: number;
  minutes: number;
}
