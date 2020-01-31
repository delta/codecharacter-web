import { FaqElement } from 'app/components/FaqElement';
import * as styles from 'app/styles/LandingPage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import classnames from 'classnames';
import * as React from 'react';

export class LandingPage extends React.Component<{}, { isNavBarDown: boolean }> {
  public constructor(props: {}) {
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
            <div className="col-lg-6 col-sm-12">
              <FaqElement
                question={'LOREM IPSUM'}
                answer={
                  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
                }
              />
            </div>
            <div className="col-lg-6 col-sm-12">
              <FaqElement question={'HELLO WORLD'} answer={'HELLLLLLLOOOOO'} />
            </div>
            <div className="col-lg-6 col-sm-12">
              <FaqElement question={'HELLO WORLD'} answer={'HELLLLLLLOOOOO'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
