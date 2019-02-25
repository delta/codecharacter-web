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
          View the rankings of users playing!
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
          You can store different versions of your code and view or fork and use them at your wish.
        </p>
      ),
      placement: 'right',
      target: '#commit_log_button',
      title: 'Commit Logs',
    },
    {
      content: (
        <p>
          This is the view matches panel. <br />
          You can replay your previous matches and view top rated matches too. If you played a epic
          match, chances are your match will be featured here.
        </p>
      ),
      placement: 'right',
      target: '#matchView_button',
      title: 'Battle TV',
    },
    {
      content: (
        <p>
          This is the notifications panel. <br /> You can view you your notifications based on their
          types and delete them.
        </p>
      ),
      placement: 'right',
      target: '#notifications_button',
      title: 'Notifications',
    },
    {
      content: (
        <p>
          This is the user profile. <br />
          View and edit your details and credentials.
        </p>
      ),
      placement: 'right',
      target: '#user_profile_button',
      title: 'Profile',
    },
    {
      content: (
        <p>Click to toggle off the Editor or Renderer. You can also drag to adjust the sizes.</p>
      ),
      placement: 'bottom',
      target: '#toggle_button',
      title: 'Toggle Editor/Renderer',
    },
    {
      content: <p>Click to clear the gamelogs of previous games.</p>,
      placement: 'bottom',
      target: '#clear_gamelog_button',
      title: 'Clear Game Logs',
    },
    {
      content: <p>Click to compile code and run the game simulation.</p>,
      placement: 'bottom',
      target: '#run_button',
      title: 'Run Game',
    },
    {
      content: <p>Saves your code and prevents you from losing your progress.</p>,
      placement: 'bottom',
      target: '#save_button',
      title: 'Save',
    },
    {
      content: (
        <p>Creates a snapshot of your code and lets you keep different versions of your code.</p>
      ),
      placement: 'bottom',
      target: '#commit_button',
      title: 'Commit',
    },
    {
      content: (
        <p>
          Submits current version of code as default code for playing against opponents.
          <br />
          You have to submit your code before choosing your opponent.
        </p>
      ),
      placement: 'bottom',
      target: '#submit_button',
      title: 'Submit',
    },
    {
      content: (
        <p>
          Renders the game simulation. <br /> Lets you pause, play your simulation at different
          speeds too.
        </p>
      ),
      placement: 'bottom',
      target: '#renderer',
      title: 'Renderer',
    },
    {
      content: <p>View the game logs at each step of your game.</p>,
      placement: 'top',
      target: '#game_log_div',
      title: 'Logger',
    },
    {
      content: <p>Log out of your CodeCharacter account, take a break and come back soon 😀 !</p>,
      placement: 'right',
      target: '#logout_button',
      title: 'Logout',
    },
    {
      content: <p>Click to take a tour to explore the available features.</p>,
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
