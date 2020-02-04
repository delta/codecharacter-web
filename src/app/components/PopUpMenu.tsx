import { faBook, faQuestion, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/PopUpMenu.module.css';
import classnames from 'classnames';
import * as React from 'react';

// tslint:disable-next-line:variable-name
const SlackSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="25"
      height="25"
      viewBox="0 0 48 48"
      style={{ fill: '#000000' }}
    >
      <path
        fill="#FFB300"
        d="M31.2,10.6l-6.6,2.3l-1.4-4.3c-0.6-1.8,0.3-3.8,2.2-4.4c1.8-0.6,3.8,0.3,4.4,2.2L31.2,10.6z M29.2,26.6l6.6-2.3l-2.3-7.1l-6.6,2.3L29.2,26.6z M32.6,36.8c0.5,1.4,1.9,2.4,3.3,2.4c0.4,0,0.8-0.1,1.1-0.2c1.8-0.6,2.8-2.6,2.2-4.4L38,31l-6.6,2.3L32.6,36.8z"
      ></path>
      <path
        fill="#00BFA5"
        d="M17.2,15.5l-6.6,2.3l-1.4-4.2c-0.6-1.8,0.3-3.8,2.2-4.4c1.8-0.6,3.8,0.3,4.4,2.2L17.2,15.5z M18.6,41.8c0.5,1.4,1.9,2.4,3.3,2.4c0.4,0,0.8-0.1,1.1-0.2c1.8-0.6,2.8-2.6,2.2-4.4l-1.2-3.7l-6.6,2.3L18.6,41.8z M19.4,22.2l-6.6,2.3l2.3,7.1l6.6-2.3L19.4,22.2z"
      ></path>
      <path
        fill="#00BCD4"
        d="M33.4,17.3l-2.2-6.6l4.1-1.4c1.8-0.6,3.8,0.3,4.4,2.2c0.6,1.8-0.3,3.8-2.2,4.4L33.4,17.3z M26.8,19.6l-2.2-6.6l-7.4,2.6l2.2,6.6L26.8,19.6z M6.4,19.3c-1.8,0.6-2.8,2.6-2.2,4.4c0.5,1.5,1.9,2.4,3.3,2.4c0.4,0,0.8-0.1,1.1-0.2l4.1-1.4l-2.2-6.6L6.4,19.3z"
      ></path>
      <path
        fill="#E91E63"
        d="M15.1,31.5l2.2,6.6l-4.7,1.6c-0.4,0.1-0.8,0.2-1.1,0.2c-1.5,0-2.8-0.9-3.3-2.4c-0.6-1.8,0.3-3.8,2.2-4.4L15.1,31.5z M43.7,25.3c-0.6-1.8-2.6-2.8-4.4-2.2l-3.5,1.2L38,31l3.6-1.2C43.4,29.1,44.4,27.1,43.7,25.3z M21.7,29.2l2.2,6.6l7.4-2.6l-2.2-6.6L21.7,29.2z"
      ></path>
      <path fill="#388E3C" d="M33.4 17.3L31.2 10.6 24.6 12.9 26.8 19.6z"></path>
      <path fill="#00897B" d="M17.2 15.5L10.6 17.8 12.8 24.5 19.4 22.2z"></path>
      <path fill="#BF360C" d="M29.2 26.6L31.4 33.3 38 31 35.8 24.3z"></path>
      <path fill="#4E342E" d="M15.1 31.5L17.3 38.2 23.9 35.9 21.7 29.2z"></path>
    </svg>
  );
};
// tslint:disable-next-line:variable-name
const GitHubSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="25"
      height="25"
      viewBox="0 0 48 48"
      style={{ fill: '#000000' }}
    >
      <path
        fill="#455A64"
        d="M40.3,15.7c0.6-1.7,1.2-5-0.4-8.7c-4.5,0-8.3,3.2-8.9,3.8c-2.2-0.5-4.6-0.7-7-0.7c-2.5,0-4.9,0.3-7.2,0.8C13.7,7.7,9.6,7,8,7c0,0-0.9,1.8-0.9,5c0,2,0.5,3.2,0.8,3.8C5.5,18.3,4,21.7,4,26.1c0,11.2,7.1,15,20,15s20-3.8,20-15C44,21.5,42.6,18.1,40.3,15.7z"
      ></path>
      <path
        fill="#FFCCBC"
        d="M24,39c-8.2,0-15-1.4-15-9c0-2.9,1.6-4.5,2.7-5.5c2.5-2.2,6.7-1.2,12.3-1.2c4.1,0,7.6-0.7,10.4,0.2c2.8,0.9,4.6,3.5,4.6,6.3C39,37.7,35,39,24,39z"
      ></path>
      <path
        fill="#D84315"
        d="M25,34c0,0.6-0.4,1-1,1s-1-0.4-1-1s0.4-1,1-1S25,33.4,25,34z M26.5,36.5c0.2-0.2,0.2-0.5,0-0.7s-0.5-0.2-0.7,0c-0.9,0.9-2.6,0.9-3.5,0c-0.2-0.2-0.5-0.2-0.7,0s-0.2,0.5,0,0.7c0.7,0.7,1.5,1,2.5,1S25.8,37.1,26.5,36.5z"
      ></path>
      <path
        fill="#FFF"
        d="M19,29.5c0,2.5-1.3,4.5-3,4.5s-3-2-3-4.5s1.3-4.5,3-4.5S19,27,19,29.5z M32,25c-1.7,0-3,2-3,4.5s1.3,4.5,3,4.5c1.7,0,3-2,3-4.5S33.7,25,32,25z"
      ></path>
      <path
        fill="#6D4C41"
        d="M34,30c0,1.7-0.9,3-2,3s-2-1.3-2-3c0-0.2,0-0.5,0.1-0.7c0.1,0.4,0.5,0.7,0.9,0.7c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1c-0.2,0-0.4,0.1-0.6,0.2c0.4-0.7,0.9-1.2,1.6-1.2C33.1,27,34,28.3,34,30z M16,27c-0.7,0-1.2,0.5-1.6,1.2c0.2-0.1,0.4-0.2,0.6-0.2c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1c-0.4,0-0.8-0.3-0.9-0.7c0,0.2-0.1,0.5-0.1,0.7c0,1.7,0.9,3,2,3s2-1.3,2-3S17.1,27,16,27z"
      ></path>
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
          <div onClick={this.togglePopUp}>
            <FontAwesomeIcon icon={faTimes} className={classnames(styles['close-icon'])} />
          </div>
          <div className={classnames(styles['menu-item'], styles['menu-item-github'])}>
            <GitHubSvg />
            Github
          </div>
          <div className={classnames(styles['menu-item'], styles['menu-item-documentation'])}>
            <FontAwesomeIcon icon={faBook} className={classnames(styles['menu-icon'])} />
            Documentation
          </div>
          <div className={classnames(styles['menu-item'], styles['menu-item-slack'])}>
            <div className={classnames(styles['menu-icon'], styles['menu-icon-slack'])}>
              <SlackSvg />
            </div>
            Slack
          </div>
        </div>
        <button className={classnames(styles['main-button'])} onClick={this.togglePopUp}>
          <FontAwesomeIcon icon={faQuestion} style={{ fontSize: 30 }} />
        </button>
      </div>
    );
  }
}
