import * as React from 'react';
// tslint:disable-next-line:import-name
import ReactJoyride, { ACTIONS, STATUS } from 'react-joyride';

export default class Joyride extends React.Component<
  Props,
  {
    stepIndex: number;
    run?: boolean;
  }
> {
  private steps = [
    {
      content: (
        <p>
          You can type your code here.
          <br />
          Ctrl - S to save
        </p>
      ),
      disableBeacon: true,
      next: true,
      placement: 'right',
      target: '#editor_div',
      title: 'Editor',
    },
    {
      content: (
        <p>
          This is documentation panel. <br />
          Everything you need to know to understand and play the game can be found here.
        </p>
      ),
      placement: 'right',
      target: '#docs_button',
      title: 'Documentation',
    },
    {
      content: (
        <p>
          This is the editor settings panel. <br />
          You can customize your editor to match your taste.
        </p>
      ),
      placement: 'right',
      target: '#editor_settings_button',
      title: 'Editor Settings',
    },
    {
      content: (
        <p>
          This is the leaderboard panel. <br />
          View current ratings and challenge other players!
        </p>
      ),
      placement: 'right',
      target: '#leaderboard_button',
      title: 'Leaderboard',
    },
    {
      content: (
        <p>
          This is the commit log panel. <br />
          You can store a linear commit history, and checkout to old code. You can even simulate a
          match between two versions of your own code.
        </p>
      ),
      placement: 'right',
      target: '#commit_log_button',
      title: 'Commit Logs',
    },
    {
      content: (
        <p>
          This is the View Matches panel. <br />
          You can replay your previous matches and view top rated matches too. If you played a epic
          match, chances are your match will be featured here!
        </p>
      ),
      placement: 'right',
      target: '#matchView_button',
      title: 'Battle TV',
    },
    {
      content: (
        <p>
          This is the User Profile page <br />
          View and edit your details and credentials.
        </p>
      ),
      placement: 'right',
      target: '#user_profile_button',
      title: 'Profile',
    },
    {
      content: (
        <p>
          Click to toggle off the Editor or Renderer. You can also drag the split panes to adjust
          the sizes.
        </p>
      ),
      placement: 'bottom',
      target: '#toggle_button',
      title: 'Toggle Editor/Renderer',
    },
    {
      content: <p>Click here to clear the game logs, in case it's getting too messy</p>,
      placement: 'bottom',
      target: '#clear_gamelog_button',
      title: 'Clear Game Logs',
    },
    {
      content: <p>Click to compile code and run the game simulation</p>,
      placement: 'bottom',
      target: '#run_button',
      title: 'Run Game',
    },
    {
      content: (
        <p>Click to same your code. Your last saved code is the version that is compiled!</p>
      ),
      placement: 'bottom',
      target: '#save_button',
      title: 'Save',
    },
    {
      content: (
        <p>
          Create a new snapshot of your code. It will be saved forever, unless our servers get
          bombed by a nuclear explosion.
        </p>
      ),
      placement: 'bottom',
      target: '#commit_button',
      title: 'Commit',
    },
    {
      content: (
        <p>
          This will submit your code as your current competitive AI. All your challenges with other
          players will be played using this code.
          <br />
          You have to submit your code before challenging an opponent.
        </p>
      ),
      placement: 'bottom',
      target: '#submit_button',
      title: 'Submit',
    },
    {
      content: (
        <p>
          Log out of your Code Character account. It's good to take a break once in a while 😀 !
        </p>
      ),
      placement: 'right',
      target: '#logout_button',
      title: 'Logout',
    },
    {
      content: <p>Take this tour again, in case you forget what's where</p>,
      placement: 'right',
      target: '#joyride_button',
      title: 'Help',
    },
  ];

  constructor(props: Props) {
    super(props);
    this.state = {
      stepIndex: 0,
    };
  }

  public incrementIndex = (stepIndex: number) => {
    this.setState({
      stepIndex,
    });
  };

  // @ts-ignore
  public handleJoyrideCallback = (data) => {
    const { status, action } = data;

    if ([ACTIONS.CLOSE].includes(action)) {
      this.setState({ run: false });
      this.props.toggleJoyRide();
    }

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({ run: false });
      this.props.toggleJoyRide();
    }
  };

  public render() {
    return (
      <ReactJoyride
        callback={this.handleJoyrideCallback}
        continuous
        // @ts-ignore
        steps={this.steps}
        run={this.state.run}
        scrollToFirstStep
        showProgress
        showSkipButton
        styles={{
          options: {
            arrowColor: '#f1ed7f',
            backgroundColor: '#f1ed7f',
            beaconSize: 36,
            primaryColor: '#ce5656',
            zIndex: 100000,
          },
        }}
      />
    );
  }
}

export interface Props {
  toggleJoyRide: () => void;
}
