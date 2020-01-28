import { faLock, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
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
      <div>
        <Row>
          <div className={classnames('col-sm-10 offset-sm-1', styles.form)}>
            <form
              className={classnames('loginForm')}
              noValidate
              ref={this.loginRef}
              onSubmit={this.handleLogin}
            >
              <div className="form-row">
                <div className="col mb-4">
                  <div
                    className="text-center text-dark mb-2"
                    style={{
                      fontSize: '12px',
                    }}
                  >
                    You can use your{' '}
                    <a
                      target="blank"
                      href="https://pragyan.org"
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      Pragyan
                    </a>{' '}
                    account credentials to login.
                  </div>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
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
                    <div className="invalid-feedback">Please enter a valid Email.</div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col mb-1">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
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
                    <div className="invalid-feedback">Please enter the correct password.</div>
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
                    className="btn btn-info"
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
        <Row
          style={{
            borderTop: '2px solid #999',
          }}
        >
          <Col className="text-center my-3 ml-auto mr-auto">
            <div className="text-dark">
              Don't have an account?{' '}
              <a
                href={Routes.REGISTER}
                className="text-primary"
                style={{
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
