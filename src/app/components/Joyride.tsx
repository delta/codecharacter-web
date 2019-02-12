import * as React from 'react';
// tslint:disable-next-line:import-name
import ReactJoyride, { STATUS } from 'react-joyride';

export default class Joyride extends React.Component<{}, {
  stepIndex: number,
  run?: boolean,
}> {
  private steps = [{
    content: <p>You can type your code here.<br/>Ctrl - S to save</p>,
    next: true,
    placement: 'right',
    target: '#editor_div',
    title: 'Editor',
  }, {
    content: <p>This is the editor settings panel. <br/>You can customize your editor to match your taste.</p>,
    placement: 'right',
    target: '#editor_settings_button',
    title: 'Editor Settings',
  }, {
    content: <p>This is the leaderboard panel. <br/>View the rankings of users playing!</p>,
    placement: 'right',
    target: '#leaderboard_button',
    title: 'Leaderboard',
  }];

  constructor(props: {}) {
    super(props);
    this.state = {
      stepIndex: 0,
    };
  }

  public incrementIndex = (stepIndex: number) => {
    this.setState({
      stepIndex,
    });
  }

  // @ts-ignore
  public handleJoyrideCallback = (data) => {
    const { status } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({ run: false });
    }
  };

  public render() {
    return <ReactJoyride
      callback={this.handleJoyrideCallback}
      continuous
      // @ts-ignore
      steps={this.steps}
      run={true}
      scrollToFirstStep
      showProgress
      showSkipButton
      styles={{
        options: {
          zIndex: 10000,
        }
      }}
    />
  }
}
