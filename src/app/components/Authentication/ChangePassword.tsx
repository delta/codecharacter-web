import * as authStyles from 'app/styles/Authentication.module.css';
import * as registerStyles from 'app/styles/Register.module.css';
import { changePasswordProps, ChangePasswordState } from 'app/types/Authentication/ChangePassword';
import classnames from 'classnames';
import * as React from 'react';

export class ChangePassword extends React.Component<changePasswordProps, ChangePasswordState> {
  private credentialsFormRef = React.createRef<HTMLFormElement>();
  private passwordResetToken = '';
  private userId = 0;
  constructor(props: changePasswordProps) {
    super(props);
    this.state = {
      password: '',
      passwordError: '',
      repeatPassword: '',
    };
  }

  public componentDidMount() {
    // get string from url
    const search = this.props.location.search;
    const urlParams = search.split('&');
    this.passwordResetToken = urlParams[0].split('=')[1];
    this.userId = parseInt(urlParams[1].split('=')[1], 0);
  }

  public render() {
    return (
      <div className={classnames(authStyles.registerRoot)}>
        <div className={classnames(authStyles.registerMessage)}>
          <h1 className={classnames(authStyles['register-h1'])}> Reset Password </h1>
          <p> Enter your new password </p>
        </div>
        <div className={classnames('col-sm-12', authStyles.form)}>
          <form
            className={classnames(
              'registerForm d-flex flex-wrap',
              authStyles['main-register-form'],
            )}
            noValidate
          >
            <div className={classnames(authStyles['stage-div'])}>
              <form
                className={classnames(authStyles['stage-form'])}
                noValidate
                ref={this.credentialsFormRef}
              >
                <div className={classnames(authStyles['login-label'])}> New Password </div>
                <div className={classnames(registerStyles['input-group'])}>
                  <input
                    type="password"
                    className={classnames('form-control', authStyles['register-input'])}
                    id="registerValidationPassword"
                    aria-describedby="inputGroupPrepend"
                    pattern=".{5,}"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  <div className={classnames('invalid-feedback', authStyles['register-error'])}>
                    Password should have minimum 5 characters.
                  </div>
                </div>
                <div className={classnames(authStyles['login-label'])}> Confirm Password </div>
                <div className={classnames(registerStyles['input-group'])}>
                  <input
                    type="password"
                    className={classnames('form-control', authStyles['register-input'])}
                    id="registerValidationrepeatPassword"
                    aria-describedby="inputGroupPrepend"
                    pattern=".{5,}"
                    value={this.state.repeatPassword}
                    onChange={(e) =>
                      this.setState({
                        repeatPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div
                  className={
                    this.state.passwordError !== '' || this.props.errorMessage !== ''
                      ? classnames('form-row', authStyles['register-error-active'])
                      : classnames('form-row', authStyles['register-error-inactive'])
                  }
                >
                  <div
                    className={classnames(
                      'col text-center mt -0 mb-2 errorMessage',
                      registerStyles.errorMessage,
                    )}
                  >
                    {this.state.passwordError}
                    {'\n'}
                    {this.props.errorMessage}
                  </div>
                </div>
                <div
                  className={classnames(
                    registerStyles['input-group'],
                    'd-flex justify-content-center',
                  )}
                >
                  <button
                    className={classnames(authStyles['register-button'])}
                    onClick={(e) => this.submitPassword(e)}
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </form>
        </div>
      </div>
    );
  }

  private submitPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (this.state.password === this.state.repeatPassword) {
      if (this.credentialsFormRef.current) {
        this.credentialsFormRef.current.classList.add('was-validated');
        if (this.credentialsFormRef.current.checkValidity()) {
          this.setState({
            ...this.state,
            passwordError: '',
          });
          this.props.changePassword(this.state.password, this.passwordResetToken, this.userId);
        }
      }
    } else {
      this.setState({
        ...this.state,
        passwordError: 'Password and confirm passwords have different values',
      });
    }
  };
}
