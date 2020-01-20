import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/Login.module.css';
import * as LoginInterfaces from 'app/types/Authentication/Login';
import classnames from 'classnames';
import * as React from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component<LoginInterfaces.Props, LoginInterfaces.State> {
  private loginRef = React.createRef<HTMLFormElement>();

  /* tslint:disable-next-line */
  public constructor(props: any) {
    super(props);
    this.state = {
      password: '',
      username: '',
    };
  }

  public render() {
    const { username, password } = this.state;
    const { errorMessage, updateErrorMessage, isLoginLoading, isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect from="/login" to="/" />;
    }

    return (
      <div>
        <div className={classnames(styles['bg-image'])}>
          <form ref={this.loginRef} onSubmit={this.handleLogin}>
            <div className={classnames(styles['login-form'])}>
              <h1> LOGIN </h1>
              <input
                type="email"
                placeholder="Email"
                className={classnames(styles['login-input'])}
                value={username}
                onChange={(e) =>
                  this.setState({
                    username: e.target.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="Password"
                minLength={5}
                value={password}
                className={classnames(styles['login-input'])}
                required
                onChange={(e) =>
                  this.setState({
                    password: e.target.value,
                  })
                }
              />
              {/*   {this.state.password.length<5&&<p className={classnames(styles['error-message'])} >Password Should have atleast 5 Characters</p>} */}

              <div className={classnames(styles['error-message-div'])}>{errorMessage}</div>

              <button className={classnames(styles['login-button'])} type="submit">
                {' '}
                Login &nbsp;
                {isLoginLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : null}{' '}
              </button>
              <p className={classnames(styles['error-message-div'])}>
                Don't have an account?{' '}
                <a
                  style={{
                    color: '#be8abf',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    updateErrorMessage('');
                  }}
                  href="/register"
                >
                  Create one
                </a>{' '}
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  private handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { login } = this.props;
    const { username, password } = this.state;
    const form = this.loginRef.current;

    if (form) {
      if (form.checkValidity()) {
        login(username, password);
      }
      form.classList.add('was-validated');
    }
  };
}
