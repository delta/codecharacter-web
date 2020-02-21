import { FaqElement } from 'app/components/FaqElement';
import { FAQ } from 'app/FAQ';
import * as styles from 'app/styles/LandingPage.module.css';
import * as LandingPageInterfaces from 'app/types/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import classnames from 'classnames';
import * as React from 'react';

export class LandingPage extends React.Component<LandingPageInterfaces.Props, {}> {
  public constructor(props: LandingPageInterfaces.Props) {
    super(props);
  }

  public render() {
    return (
      <div className={classnames(styles.root)}>
        <div className={classnames(styles.nav)}>
          <input type="checkbox" className={classnames(styles['nav-check'])} id="nav-check" />
          <div className={classnames(styles['nav-header'])}>
            <div className={classnames(styles['nav-title'])}>CodeCharacter</div>
          </div>
          <div className={classnames(styles['nav-btn'])}>
            <label htmlFor="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <div className={classnames(styles['nav-links'])}>
            <a href="//github.io/jo_geek" target="_blank">
              Github
            </a>
            <a href="http://stackoverflow.com/users/4084003/" target="_blank">
              Stackoverflow
            </a>
            <a href="https://in.linkedin.com/in/jonesvinothjoseph" target="_blank">
              LinkedIn
            </a>
            <a href="https://codepen.io/jo_Geek/" target="_blank">
              Codepen
            </a>
          </div>
        </div>

        <div className={classnames('container', styles['first-cont'])}>
          <div className="row">
            <h1 className={classnames(styles['landing-heading'])}> Code Character </h1>
          </div>

          <div className="row">
            <div className="col-lg-6 col-sm-12">
              {FAQ.map((element, index) => {
                if (index % 2 === 0) {
                  return (
                    <FaqElement key={index} question={element.question} answer={element.answer} />
                  );
                }
                return null;
              })}
            </div>
            <div className="col-lg-6 col-sm-12">
              {FAQ.map((element, index) => {
                if (index % 2 === 1) {
                  return (
                    <FaqElement key={index} question={element.question} answer={element.answer} />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
