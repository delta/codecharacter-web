import * as styles from 'app/styles/ReactTour.module.css';
import classnames from 'classnames';
import * as React from 'react';
// tslint:disable-next-line:import-name
import Tour, { ReactourStep } from 'reactour';

const tourConfig: ReactourStep[] = [
  {
    content: () => (
      <div>
        <h6>Editor</h6>
        <p className={classnames(styles['step-description'])}>
          You can type your code here.
          <br />
          Ctrl - S to save
        </p>
      </div>
    ),
    selector: '[name="editor_div"]',
  },
  {
    content: () => (
      <div>
        <h6>Documentation</h6>
        <p className={classnames(styles['step-description'])}>
          This is documentation panel. <br />
          Everything you need to know to understand and play the game can be found here.
        </p>
      </div>
    ),
    selector: '[id="docs_button"]',

    style: {},
  },
  {
    content: () => (
      <div>
        <h6>Editor Settings</h6>
        <p className={classnames(styles['step-description'])}>
          This is the editor settings panel. <br />
          You can customize your editor to match your taste.
        </p>
      </div>
    ),
    selector: '[id="editor_settings_button"]',
  },
  {
    content: () => (
      <div>
        <h6>Leaderboard</h6>
        <p className={classnames(styles['step-description'])}>
          This is the leaderboard panel. <br />
          View current ratings and challenge other players!
        </p>
      </div>
    ),
    selector: '[id="leaderboard_button"]',
  },
  {
    content: () => (
      <div>
        <h6>Commit Logs</h6>
        <p className={classnames(styles['step-description'])}>
          This is the commit log panel. <br />
          You can store a linear commit history, and checkout to old code. You can even simulate a
          match between two versions of your own code.
        </p>
      </div>
    ),
    selector: '[id="commit_log_button"]',
  },
  {
    content: () => (
      <div>
        <h6>Battle TV</h6>
        <p className={classnames(styles['step-description'])}>
          This is the View Matches panel. <br />
          You can replay your previous matches and view top rated matches too. If you played a epic
          match, chances are your match will be featured here!
        </p>
      </div>
    ),
    selector: '[id="matchView_button"]',
  },
  {
    content: () => (
      <div>
        <h6>Profile</h6>
        <p className={classnames(styles['step-description'])}>
          This is the User Profile page <br />
          View and edit your details and credentials.
        </p>
      </div>
    ),
    selector: '[id="user_profile_button"]',
  },
  {
    content: () => (
      <div>
        <h6>Toggle Editor/Renderer</h6>
        <p className={classnames(styles['step-description'])}>
          Click to toggle off the Editor or Renderer. You can also drag the split panes to adjust
          the sizes.
        </p>
      </div>
    ),
    position: 'bottom',
    selector: '[id="toggle_button"]',

    style: {},
  },
  {
    content: () => (
      <div>
        <h6>Clear Game Logs</h6>
        <p className={classnames(styles['step-description'])}>
          Click here to clear the game logs, in case it's getting too messy
        </p>
      </div>
    ),
    position: 'bottom',
    selector: '[id="clear_gamelog_button"]',
  },
  {
    content: () => (
      <div>
        <h6>Run Game</h6>
        <p className={classnames(styles['step-description'])}>
          Click to compile code and run the game simulation
        </p>
      </div>
    ),
    position: 'bottom',
    selector: '[id="run_button"]',
  },
  {
    content: () => (
      <div>
        <h6>Save</h6>
        <p className={classnames(styles['step-description'])}>
          Click to save your code. Your last saved code is the version that is compiled!
        </p>
      </div>
    ),
    position: 'bottom',
    selector: '[id="save_button"]',
  },
  {
    content: () => (
      <div>
        <h6>Commit</h6>
        <p className={classnames(styles['step-description'])}>
          Create a new snapshot of your code. It will be saved forever, unless our servers get
          bombed by a nuclear explosion.
        </p>
      </div>
    ),
    position: 'bottom',
    selector: '[id="commit_button"]',
  },
  {
    content: () => (
      <div>
        <h6>Submit</h6>
        <p className={classnames(styles['step-description'])}>
          This will submit your code as your current competitive AI. All your challenges with other
          players will be played using this code.
          <br />
          You have to submit your code before challenging an opponent.
        </p>
      </div>
    ),
    position: 'bottom',
    selector: '[id="submit_button"]',
  },
  {
    content: () => (
      <div>
        <h6>Logout</h6>
        <p className={classnames(styles['step-description'])}>
          Log out of your Code Character account. It's good to take a break once in a while 😀 !
        </p>
      </div>
    ),
    position: 'right',
    selector: '[id="logout_button"]',
  },
  {
    content: () => (
      <div>
        <h6>Help</h6>
        <p className={classnames(styles['step-description'])}>
          Take this tour again, in case you forget what's where
        </p>
      </div>
    ),
    position: 'right',
    selector: '[id="joyride_button"]',
  },
];

export default class ReactTour extends React.Component<
  { toggleJoyRide: () => void },
  { isTourOpen: boolean }
> {
  /* tslint:disable-next-line */
  public constructor(props: any) {
    super(props);
    this.state = {
      isTourOpen: false,
    };
    this.closeTour = this.closeTour.bind(this);
    this.openTour = this.openTour.bind(this);
  }
  public closeTour = () => {
    this.props.toggleJoyRide();
    this.setState({ isTourOpen: false });
  };

  public openTour = () => {
    this.setState({ isTourOpen: true });
  };
  public componentDidMount = () => {
    this.setState({ isTourOpen: true });
  };

  public render() {
    const { isTourOpen } = this.state;

    return (
      <Tour
        accentColor={'#5b5656'}
        className="helper"
        isOpen={isTourOpen}
        maskClassName="mask"
        onRequestClose={this.closeTour}
        rounded={5}
        steps={tourConfig}
      />
    );
  }
}
