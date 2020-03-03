import { Routes } from 'app/routes';
import * as styles from 'app/styles/Authentication.module.css';
import * as registerStyles from 'app/styles/Register.module.css';
import { AuthType } from 'app/types/Authentication';
import * as LoginInterfaces from 'app/types/Authentication/Login';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

// tslint:disable-next-line: variable-name
const ForgotPassword = (props: LoginInterfaces.ForgotPasswordProps) => {
  const forgotPasswordRef = React.createRef<HTMLFormElement>();

  const handleForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {
    const form = forgotPasswordRef.current;

    event.preventDefault();
    if (form) {
      if (form.checkValidity()) {
        props.forgotPassword(props.username);
      }
      form.classList.add('was-validated');
    }
  };

  return (
    <div>
      <div className={classnames(styles.loginRoot)}>
        <div className={classnames(styles.welcomeBack)}>
          <h1> Forgot your password? </h1>
        </div>
        <Row>
          <Col className="text-center my-3 ml-auto mr-auto">
            <div className="text-dark">
              <Row>
                <div className={classnames('col-sm-10', styles.form)}>
                  <form
                    className={classnames(styles.loginForm)}
                    noValidate
                    ref={forgotPasswordRef}
                    onSubmit={handleForgotPassword}
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
                            value={props.username}
                            onChange={(e) => props.setUsername(e.target.value)}
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
                          !props.errorMessage
                            ? classnames(
                                'col text-center mt-0 mb-2 ',
                                styles['register-error-inactive'],
                                registerStyles.errorMessage,
                              )
                            : classnames(
                                'col text-center mt-0 mb-2 errorMessage',
                                styles['register-error-active'],
                                registerStyles.errorMessageLogin,
                                styles['login-error-active'],
                              )
                        }
                      >
                        {props.errorMessage}
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
              onClick={() => props.closeForgotPassword()}
            >
              Back{' '}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center my-3 ml-auto mr-auto">
            <div className="text-dark">
              Don't have an account?{' '}
              <a
                href={Routes.REGISTER}
                className={classnames(styles['create-one-button'])}
                onClick={() => {
                  props.updateErrorMessage('');
                  props.handleSelectPanel(AuthType.REGISTER);
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
};

export default ForgotPassword;
