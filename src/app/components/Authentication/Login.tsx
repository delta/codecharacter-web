import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Routes } from 'app/routes';
import * as styles from 'app/styles/Authentication.module.css';
import { AuthType } from 'app/types/Authentication/';
import * as LoginInterfaces from 'app/types/Authentication/Login';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export class Login extends React.Component<LoginInterfaces.Props, LoginInterfaces.State> {
  private loginRef = React.createRef<HTMLFormElement>();

  constructor(props: LoginInterfaces.Props) {
    super(props);

    this.state = {
      password: '',
      username: '',
    };
  }

  public componentCleanup = () => {
    const { updateErrorMessage } = this.props;
    updateErrorMessage('');
  };

  public componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
  }

  public componentWillReceiveProps(newProps: LoginInterfaces.Props) {
    const { errorMessage } = newProps;
    const form = this.loginRef.current;
    if (form && errorMessage) {
      this.setState(
        {
          password: '',
          username: '',
        },
        () => {
          form.classList.remove('was-validated');
        },
      );
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  public render() {
    const { username, password } = this.state;
    const { errorMessage, updateErrorMessage, isLoginLoading, isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to={Routes.ROOT} />;
    }

    return (
      <div className={classnames(styles.root)}>
        <div className={classnames(styles.welcomeBack)}>
          <h1> Welcome! </h1>
          <p> Log in to access your dashboard and profile </p>
        </div>

        <Row>
          <div className={classnames('col-sm-10 offset-sm-1', styles.form)}>
            <form
              className={classnames(styles.loginForm)}
              noValidate
              ref={this.loginRef}
              onSubmit={this.handleLogin}
            >
              <div className="form-row">
                <div className="col mb-4">
                  <div
                    className="text-center text-dark mb-2"
                    style={{
                      fontFamily: 'Overpass',
                      fontSize: '12px',
                    }}
                  >
                    You can use your{' '}
                    <a
                      target="blank"
                      href="https://pragyan.org"
                      style={{
                        color: '#4630eb',
                        textDecoration: 'none',
                      }}
                    >
                      Pragyan
                    </a>{' '}
                    account credentials to login.
                  </div>
                  <div className="input-group">
                    <input
                      type="email"
                      className={classnames('form-control', styles['login-input'])}
                      id="validationUsername"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      required
                      value={username}
                      onChange={(e) =>
                        this.setState({
                          username: e.target.value,
                        })
                      }
                    />
                    <div className={classnames('invalid-feedback', styles['login-error'])}>
                      {' '}
                      Please enter a valid Email.{' '}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col mb-1">
                  <div className="input-group">
                    <input
                      type="password"
                      className={classnames('form-control', styles['login-input'])}
                      id="validationPassword"
                      placeholder="Password"
                      aria-describedby="inputGroupPrepend"
                      minLength={5}
                      value={password}
                      onChange={(e) =>
                        this.setState({
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <div className={classnames('invalid-feedback', styles['login-error'])}>
                      Please enter the correct password.
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="input-group" />
                <div className="col text-center mt -0 mb-2 errorMessage">{errorMessage}</div>
              </div>
              <div className="form-row">
                <div className="col text-center">
                  <button
                    className={classnames('btn btn-info', styles.loginButton)}
                    type="submit"
                    style={{
                      width: '100%',
                    }}
                  >
                    Login &nbsp;
                    {isLoginLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Row>
        <Row>
          <Col className="text-center my-3 ml-auto mr-auto">
            <div className="text-dark">
              Don't have an account?{' '}
              <a
                href={Routes.REGISTER}
                style={{
                  color: '#4630eb',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  updateErrorMessage('');
                  this.props.handleSelectPanel(AuthType.REGISTER);
                }}
              >
                Create one
              </a>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  private handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    const { login } = this.props;
    const { username, password } = this.state;
    const form = this.loginRef.current;
    event.preventDefault();
    if (form) {
      if (form.checkValidity()) {
        login(username, password);
      }
      form.classList.add('was-validated');
    }
  };
}
