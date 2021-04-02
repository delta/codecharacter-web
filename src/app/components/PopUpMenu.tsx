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
          <a href="https://code.pragyan.org/docs/" target="_blank">
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
                  src="https://www.pragyan.org/21/cms/templates/common/favicon.ico"
                  alt="pragyan"
                  width="25px"
                  height="22px"
                />
              </div>
              Pragyan
            </div>
          </a>

          <a href="https://discord.gg/fgT7ejYk" target="_blank">
            <div className={classnames(styles['menu-item'], styles['menu-item-discord'])}>
              <div className={classnames(styles['menu-icon-discord'])}>
                <img
                  width="22px"
                  height="22px"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD+klEQVR4Xu3aWch1YxQH8N9nljFcUIYoZSjzPCUuzEO5+CSUCy4MJUq4MBY3IiFDSClcUMa4kHkmkkKZckPuzGOG/p/n9Z1O+xz7nLPf/e63s1edTmef51nPWv+91nrWWs+zwpzTijnXXw9AbwFzjkDvAnNuAH0Q7F2gd4E5R6B3gQYMYEPsiDUb4DUJiz/xCX6cZNLw2FksYGfchYOwxixCzDD3L7yGc/DRNHymBWAXvIP1p1l0Eeb8gr2nAWFaAF7BwYugyCwsI9OhkzKYBoCN8B2dS6LiDptMGhOmAWBPvDsp0i2N3wvvTbLWNADsg7cnWaTFsfuW2FR7yR6A2lCtHthbQO8CfQyYOAi+jifwDU7AySNc7znci21wLA6ZcLvtXBB8EZdg86L032WbStr6w0A+sTG2xv7YFV/ibiTfvwKn1oxVnQLgRlyJ3fH7hHFjHZyEn/BssZqHa4DQGQAieN5o3nLe4iy0QQHieRz+P4w6A8BtOH8WrSvmnojHlgsAKZU/bhiAlNyfYvsxfDthAR+WQNaw/qvY3YCLuw7A9bh8MbQv5e5LXQfgQLxRIWT2/zOwHq6pKFp2w7VYC1fjrQoecYPkEluMAGHJXeAPpEeYbW+QjsQzRbk8/7b4cr5D6+ILbFV+5/l2+L5C0adxdFcBeB97VAh3Z+nbDf6VLO/V8qCqx3AEsvUNU1zs0q4CcB/OqhDudNw/8Pw3bIafy7Nkil9j7fI7GWOifTLCYVqJh7oKQHz3qgrh0jK/pVhBlD4Tjw6NOxs3l/b6ZUgmWUX74c2uAnABbh0hXB5vinRwYwFVlFiQJs2vY3jEMj7vKgCn4cEB4ZLTx9fTsR0OjGN0/O+vxIHPhlwhTdmq4JhJS74LVKXAKW0TBNNIfaqYbzq4oyjR/zgchdvL7jE4Nu34AFpFSw5AhMpeniowgWyBYtbH46bSun4ZX5U9PS6xZfmkctwB5xVLGnaVw/AkYgWdBSCCRcELh9rnaVnnzdU5TbqogLWgZKwiW1+OwMYdw3XCAgbfTOqCKJ0tLtvjtnUcv5TQ9yCl8E7l2KvO1M4BUEfoJsf0APQHI/+eWtem/mSoNlSrB3b5cLSVGJByN5nYNNYzBd6rprxQoyGaca0AkIXaviCRBmsuP6QSHEetAdD2FZnHcQoeQbrDo6g1ACJAOr/J8ZObL/YlqdwES/8gbvdAAWPJUuHhhdu6JvdBKaMD9h1I/2CYWrWAaQNaU/OuQxongzRXAETxc0unacEF5w6AgJBD1DRhUmXOJQAB4YBy/+CYNmqBpny4aT65r5y2W1UneeRabWZzTSvcCL8egEZgXMZMegtYxi+vEdF7C2gExmXM5B8FnNRB6ACkgwAAAABJRU5ErkJggg=="
                />
              </div>
              Discord
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
