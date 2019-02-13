import * as React from 'react';

export class Timer extends React.Component<Props, State> {
  public secondsRemaining = 0;
  public intervalHandle = 0;
  constructor(props: { timerData: number; getTimer: () => void }) {
    super(props);

    this.state = {
      minutes: Math.floor(this.props.timerData / 60),
      seconds: this.props.timerData - Math.floor(this.props.timerData / 60) * 60,
      totalSeconds: this.props.timerData,
    };
  }

  public componentDidMount() {
    // @ts-ignore
    this.intervalHandle = setInterval(this.tick, 1000);
  }

  public render() {
    const { minutes, seconds } = this.state;
    return (
      <span>{`Please wait ${minutes} minutes and ${seconds} seconds to initiate a match.`}</span>
    );
  }

  private tick = (): void => {
    const { totalSeconds } = this.state;
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds - Math.floor(totalSeconds / 60) * 60;
    this.setState({
      minutes: min,
      seconds: sec,
      totalSeconds: totalSeconds - 1,
    });
    if (min === 0 && sec === 0) {
      clearInterval(this.intervalHandle);
      this.props.getTimer();
    }
  };
}

export interface Props {
  timerData: number;
  getTimer: () => void;
}

export interface State {
  totalSeconds: number;
  seconds: number;
  minutes: number;
}
