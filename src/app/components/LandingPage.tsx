import { FaqElement } from 'app/components/FaqElement';
import { FAQ } from 'app/FAQ';
import * as styles from 'app/styles/LandingPage.module.css';
import * as LandingPageInterfaces from 'app/types/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import classnames from 'classnames';
import * as React from 'react';

export class LandingPage extends React.Component<
  LandingPageInterfaces.Props,
  LandingPageInterfaces.State
> {
  public constructor(props: LandingPageInterfaces.Props) {
    super(props);
    this.state = {
      isNavBarDown: false,
    };
  }

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  public handleScroll = (): void => {
    if (window.pageYOffset > 100) {
      this.setState({ isNavBarDown: true });
    } else {
      this.setState({ isNavBarDown: false });
    }
  };

  public render() {
    return (
      <div className={classnames(styles.root)}>
        <nav
          className={
            !this.state.isNavBarDown
              ? classnames('navbar navbar-expand-lg navbar-light ', styles['main-nav'])
              : classnames('navbar navbar-expand-lg navbar-light ', styles['main-nav-down'])
          }
        >
          <a className={classnames('navbar-brand', styles['main-title'])} href="#">
            CodeCharacter
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  SignUp
                </a>
              </li>
            </ul>
          </div>
        </nav>

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
              })}
            </div>
            <div className="col-lg-6 col-sm-12">
              {FAQ.map((element, index) => {
                if (index % 2 === 1) {
                  return (
                    <FaqElement key={index} question={element.question} answer={element.answer} />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
