import { TimerProps, TimerState } from 'app/types/Leaderboard';
import * as React from 'react';
export class Timer extends React.Component<TimerProps, TimerState> {
  public secondsRemaining = 0;
  public intervalHandle = 0;
  constructor(props: TimerProps) {
    super(props);

    this.state = {
      minutes: 0,
      seconds: 0,
      totalSeconds: this.props.timerData,
    };
  }

  public componentWillUnmount() {
    if (this.intervalHandle !== 0) {
      clearInterval(this.intervalHandle);
    }
  }

  public render() {
    if (this.intervalHandle === 0) {
      // @ts-ignore
      this.intervalHandle = setInterval(this.tick, 1000);
    }
    const { minutes, seconds } = this.state;
    return (
      <span>{`Please wait ${minutes} minutes, ${Math.floor(
        seconds,
      )} seconds to initiate a match.`}</span>
    );
  }

  private tick = (): void => {
    const { totalSeconds } = this.state;
    const min = Math.floor(totalSeconds / 60);
    const sec = Math.floor(totalSeconds - Math.floor(totalSeconds / 60) * 60);

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
