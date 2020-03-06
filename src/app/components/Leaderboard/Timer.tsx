import { TimerProps, TimerState } from 'app/types/Leaderboard';
import * as React from 'react';
export class Timer extends React.Component<TimerProps, TimerState> {
  public secondsRemaining = 0;
  public intervalHandle = 0;
  constructor(props: TimerProps) {
    super(props);

    this.state = {
      seconds: this.props.timerData,
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
    const { seconds } = this.state;
    return (
      <span>
        {seconds > 0
          ? `Please wait ${Math.floor(seconds)} seconds to initiate a match.`
          : seconds === 0
          ? 'Ready to initiate Match'
          : 'Something went wrong'}
      </span>
    );
  }

  private tick = (): void => {
    const { seconds } = this.state;
    const sec = Math.floor(seconds - Math.floor(seconds / 60) * 60);

    this.setState({
      seconds: seconds <= 0 ? 0 : seconds - 1,
    });

    if (sec === 0) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = 0;
      this.props.setTimer(0);
      this.props.getTimer();
    }
  };
}
