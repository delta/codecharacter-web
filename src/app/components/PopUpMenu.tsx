import { faBook, faQuestion, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/PopUpMenu.module.css';
import classnames from 'classnames';
import * as React from 'react';

interface ElementOwnProps {
  isPopUpOpen: boolean;
}

export default class PopUpMenu extends React.Component<{}, ElementOwnProps> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      isPopUpOpen: false,
    };
  }

  public togglePopUp = () => {
    this.setState({ isPopUpOpen: !this.state.isPopUpOpen });
  };
  public setPopUpToFalse = () => {
    this.setState({ isPopUpOpen: false });
  };

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
          <h1 className={classnames(styles['pop-up-heading'])}> Need Help? </h1>
          <div onClick={this.togglePopUp}>
            <FontAwesomeIcon icon={faTimes} className={classnames(styles['close-icon'])} />
          </div>
          <a href="https://code.pragyan.org/docs" target="_blank">
            <div className={classnames(styles['menu-item'], styles['menu-item-pragyan'])}>
              <div className={classnames(styles['menu-icon-documentation'])}>
                <FontAwesomeIcon icon={faBook} />
              </div>
              Documentation
            </div>
          </a>
          <a href="https://www.pragyan.org/21/" target="_blank">
            <div className={classnames(styles['menu-item'], styles['menu-item-documentation'])}>
              <div>
                <img
                  src="https://www.pragyan.org/21/cms/templates/common/site/images/favicon.ico"
                  alt="pragyan"
                  width="25px"
                  height="22px"
                />
              </div>
              Pragyan
            </div>
          </a>

          <a
            href="https://forum.pragyan.org/t/code-character-frequently-asked-questions/21"
            target="_blank"
          >
            <div className={classnames(styles['menu-item'], styles['menu-item-discourse'])}>
              <div className={classnames(styles['menu-icon-discourse'])}>
                <img
                  width="22px"
                  height="22px"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABuUlEQVRYhe3XO2sVQRgG4EdPIoIGtRaCIDZGvIGVjUqCYOFfsFW8QfQX2FpoYSeC/8BGROUQxMo6URTFS6HYK3hlPRZ7Fg7rt5ud3cU0eeFrlnkvszM7+w3rWGNsSBy/G6dxErPYiSl8wkcMcQ8ve8wIDuI+Rg3rCY70YTyFG8gSzIv6g1uYbmu+A0stjMs1xPZU8+kxsat5UU+xKSXA7RqxZVzGHLaMa278bKWGd7Op+VH5+pUFfuAcNtZwBziPnwE/w6EmAZ5VmB9vOgOcqAjxcDXigYA0wtkE8wIXKrT21JGuBYRl9a+9CgM8D/SuTg4qCx8LhO7I90QqsjG3jIU60jv/Jt7bwrzAvkDvVR3he0CY6RBgJtD7MjmgvASbA5HfHQJEP7tRXYAIuzoEmA2efU4NcKpDgGjDfagjRCfgW+0/wxeB3mJqgG/ivbEaLgVaI3lTkxTgQQvzefxqoxUFuJhgPJDPPDLPsL9NgHmcwV28x2tcwWF507JVfuAsite8qOtNZhAF6KMey9u7NQnwCNuamNOu+ayqTN7QNpp53wGGGnY/Sekq8FV+KZm8mLzpQXcd/wd/AXbcN82U8XnbAAAAAElFTkSuQmCC"
                />
              </div>
              Forum
            </div>
          </a>
        </div>
        <button className={classnames(styles['main-button'])} onClick={this.togglePopUp}>
          <FontAwesomeIcon icon={faQuestion} style={{ fontSize: 30 }} />
        </button>
      </div>
    );
  }
}
