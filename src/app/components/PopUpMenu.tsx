/* tslint:disable-next-line:import-name */
import CastConnectedIcon from '@material-ui/icons/CastConnected';
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
            <DescriptionIcon className={classnames(styles['menu-icon'])} />
            Documentation
          </div>
          <div className={classnames(styles['menu-item'], styles['menu-item-slack'])}>
            <CastConnectedIcon className={classnames(styles['menu-icon'])} />
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
