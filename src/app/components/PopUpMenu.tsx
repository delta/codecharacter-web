/* tslint:disable-next-line:import-name */
import ClearIcon from '@material-ui/icons/Clear';
/* tslint:disable-next-line:import-name */
import DescriptionIcon from '@material-ui/icons/Description';
/* tslint:disable-next-line:import-name */
import GitHubIcon from '@material-ui/icons/GitHub';
/* tslint:disable-next-line:import-name */
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import * as styles from 'app/styles/PopUpMenu.module.css';
import classnames from 'classnames';
import * as React from 'react';

const slackSvg = () => {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      height="30px"
      width="30px"
      fill="white"
    >
      <title />
      <g id="Slack">
        <path d="M13,23.17a2.52,2.52,0,1,1-2.52-2.53H13Zm1.27,6.31a2.53,2.53,0,0,0,5,0V23.17a2.53,2.53,0,1,0-5,0Zm5-16.44V10.52A2.53,2.53,0,1,0,16.83,13Zm-8.84,1.27a2.53,2.53,0,0,0,0,5h6.31a2.53,2.53,0,1,0,0-5Zm16.44,5h2.52A2.53,2.53,0,1,0,27,16.83Zm-1.27-8.84a2.53,2.53,0,0,0-5.05,0v6.31a2.53,2.53,0,1,0,5.05,0ZM20.64,27v2.52A2.53,2.53,0,1,0,23.17,27Zm8.84-1.27a2.53,2.53,0,0,0,0-5.05H23.17a2.53,2.53,0,1,0,0,5.05Z" />
      </g>
    </svg>
  );
};

export default class PopUpMenu extends React.Component<{}, { isPopUpOpen: boolean }> {
  /* tslint:disable-next-line */
  public constructor(props: any) {
    super(props);
    this.state = {
      isPopUpOpen: false,
    };
    this.togglePopUp = this.togglePopUp.bind(this);
    this.setPopUpToFalse = this.setPopUpToFalse.bind(this);
  }
  public togglePopUp() {
    this.setState({ isPopUpOpen: !this.state.isPopUpOpen });
  }
  public setPopUpToFalse() {
    this.setState({ isPopUpOpen: false });
  }

  public render() {
    return (
      <div>
        <div
          className={
            !this.state.isPopUpOpen
              ? classnames(styles['pop-up-display-none'])
              : classnames(styles['pop-up'])
          }
        >
          <ClearIcon className={classnames(styles['close-icon'])} onClick={this.togglePopUp} />
          <div className={classnames(styles['menu-item'], styles['menu-item-github'])}>
            <GitHubIcon className={classnames(styles['menu-icon'])} />
            Github
          </div>
          <div className={classnames(styles['menu-item'], styles['menu-item-documentation'])}>
            <DescriptionIcon className={classnames(styles['menu-icon'], styles['menu-icon-doc'])} />
            Documentation
          </div>
          <div className={classnames(styles['menu-item'], styles['menu-item-slack'])}>
            <div className={classnames(styles['menu-icon'], styles['menu-icon-slack'])}>
              <slackSvg />
            </div>
            Slack
          </div>
        </div>
        <button className={classnames(styles['main-button'])} onClick={this.togglePopUp}>
          <HelpOutlineIcon style={{ fontSize: 30 }} />
        </button>
      </div>
    );
  }
}
