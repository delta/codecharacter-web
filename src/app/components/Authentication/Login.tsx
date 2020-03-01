import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Routes } from 'app/routes';
import * as styles from 'app/styles/Authentication.module.css';
import * as registerStyles from 'app/styles/Register.module.css';
import { AuthType } from 'app/types/Authentication/';
import * as LoginInterfaces from 'app/types/Authentication/Login';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { API_BASE_URL } from '../../../config/config';

export enum OAUTH_ROUTES {
  GOOGLE = 'login/google',
  GITHUB = 'login/github',
}
export class Login extends React.Component<LoginInterfaces.Props, LoginInterfaces.State> {
  private loginRef = React.createRef<HTMLFormElement>();
  private forgotPasswordRef = React.createRef<HTMLFormElement>();

  constructor(props: LoginInterfaces.Props) {
    super(props);

    this.state = {
      isForgotPassword: false,
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
    const { username, password, isForgotPassword } = this.state;
    const { errorMessage, updateErrorMessage, isLoginLoading, isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to={Routes.ROOT} />;
    }
    if (!isForgotPassword) {
      return (
        <div className={classnames(styles.loginRoot)}>
          <div className={classnames(styles.welcomeBack)}>
            <h1> Welcome! </h1>
            <p> Log in to access your dashboard and profile </p>
            <div className={classnames('text-center text-dark mb-2', styles['pragyan-login'])}>
              You can use your{' '}
              <a
                target="blank"
                href="https://pragyan.org"
                className={classnames(styles['create-one-button'])}
              >
                Pragyan
              </a>{' '}
              account credentials to login.
            </div>
          </div>
          <div className={classnames('container px-0 justify-content-center', styles.loginForm)}>
            <Row
              onClick={(e) => {
                window.location.href = `${API_BASE_URL}${OAUTH_ROUTES.GOOGLE}`;
              }}
              className={classnames(
                styles['google-btn'],
                'border justify-content-center my-3',
                styles.oauth_btn,
                styles.no_margin,
              )}
            >
              <div className={classnames('col-auto my-2', styles.img_div)}>
                <img src="assets/img/google.png" height="24" width="24" />
              </div>
              <p className="col-auto">Log in with Google</p>
            </Row>
            <Row
              onClick={(e) => {
                window.location.href = `${API_BASE_URL}${OAUTH_ROUTES.GITHUB}`;
              }}
              className={classnames(
                'justify-content-center',
                styles['github-btn'],
                styles.oauth_btn,
                styles.no_margin,
              )}
            >
              <div className={classnames('col-auto my-2', styles.img_div)}>
                <img src="assets/img/github.png" height="24" width="24" />
              </div>
              <p className="col-auto">Log in with Github</p>
            </Row>
            <Row className={classnames(styles.no_margin)}>
              <div className={classnames(styles.separator)}>
                <div className={classnames(styles.wordWithLine)}>
                  <span className={classnames(styles.text)}>or</span>
                </div>
              </div>
            </Row>
          </div>
          <Row className={classnames(styles.no_margin)}>
            <div className={classnames('col-sm-10 offset-sm-1', styles.form)}>
              <form
                className={classnames(styles.loginForm)}
                noValidate
                ref={this.loginRef}
                onSubmit={this.handleLogin}
              >
                <div className="form-row">
                  <div className="col mb-4">
                    <div className={classnames(styles['login-label'])}> Email </div>
                    <div className="input-group">
                      <input
                        type="email"
                        className={classnames('form-control', styles['login-input'])}
                        id="validationUsername"
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
                    <div className={classnames(styles['login-label'])}> Password </div>
                    <div className="input-group">
                      <input
                        type="password"
                        className={classnames('form-control', styles['login-input'])}
                        id="validationPassword"
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
                <div className={classnames('form-row', styles['error-row'])}>
                  <div
                    className={
                      !errorMessage
                        ? classnames(
                            'col text-center mt -0 mb-2 ',
                            styles['register-error-inactive'],
                            registerStyles.errorMessage,
                          )
                        : classnames(
                            'col text-center mt -0 mb-2 errorMessage',
                            styles['register-error-active'],
                            registerStyles.errorMessageLogin,
                            styles['login-error-active'],
                          )
                    }
                  >
                    {errorMessage}
                  </div>
                </div>
                <div className="form-row">
                  <div className="col text-center">
                    <button
                      className={classnames('btn btn-info', styles.loginButton)}
                      type="submit"
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
              <div
                className={classnames('text-dark', styles['forgot-your-password'])}
                onClick={() => this.setState({ isForgotPassword: true })}
              >
                Forgot Your Password?{' '}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center my-3 ml-auto mr-auto">
              <div className="text-dark">
                Don't have an account?
                <a
                  href={Routes.REGISTER}
                  className={classnames(styles['create-one-button'])}
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
    return (
      <div>
        <div className={classnames(styles.loginRoot)}>
          <div className={classnames(styles.welcomeBack)}>
            <h1> Forgot your password? </h1>
          </div>
          <Row>
            <Col className="text-center my-3 ml-auto mr-auto">
              <div className="text-dark">
                Don't have an account?
                <a
                  href={Routes.REGISTER}
                  className={classnames(styles['create-one-button'])}
                  onClick={() => {
                    updateErrorMessage('');
                    this.props.handleSelectPanel(AuthType.REGISTER);
                  }}
                >
                  Create one
                </a>
                <Row>
                  <div className={classnames('col-sm-10', styles.form)}>
                    <form
                      className={classnames(styles.loginForm)}
                      noValidate
                      ref={this.forgotPasswordRef}
                      onSubmit={this.handleForgotPassword}
                    >
                      <div className="form-row">
                        <div className="col mb-4">
                          <div className={classnames(styles['login-label'])}> Your Email: </div>
                          <div className="input-group">
                            <input
                              type="email"
                              className={classnames('form-control', styles['login-input'])}
                              id="validationUsername"
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
                      <div className={classnames('form-row', styles['error-row'])}>
                        <div
                          className={
                            !errorMessage
                              ? classnames(
                                  'col text-center mt -0 mb-2 ',
                                  styles['register-error-inactive'],
                                  registerStyles.errorMessage,
                                )
                              : classnames(
                                  'col text-center mt -0 mb-2 errorMessage',
                                  styles['register-error-active'],
                                  registerStyles.errorMessageLogin,
                                  styles['login-error-active'],
                                )
                          }
                        >
                          {errorMessage}
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col text-center">
                          <button
                            className={classnames('btn btn-info', styles.loginButton)}
                            type="submit"
                          >
                            Reset Password&nbsp;
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center my-3 ml-auto mr-auto">
              <div
                className={classnames('text-dark', styles['forgot-your-password'])}
                onClick={() => this.setState({ isForgotPassword: false })}
              >
                Back{' '}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center my-3 ml-auto mr-auto">
              <div className="text-dark">
                Don't have an account?
                <a
                  href={Routes.REGISTER}
                  className={classnames(styles['create-one-button'])}
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
      </div>
    );
  }

  private handleForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {
    const { username } = this.state;
    const { forgotPassword } = this.props;
    const form = this.forgotPasswordRef.current;

    event.preventDefault();
    if (form) {
      if (form.checkValidity()) {
        forgotPassword(username);
      }
      form.classList.add('was-validated');
    }
  };

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
