import * as authStyles from 'app/styles/Authentication.module.css';
import * as registerStyles from 'app/styles/Register.module.css';
import { changePasswordProps } from 'app/types/Authentication/ChangePassword';
import classnames from 'classnames';
import * as React from 'react';

// tslint:disable-next-line: variable-name
export const ChangePassword: React.FunctionComponent<changePasswordProps> = (
  props: changePasswordProps,
) => {
  let passwordResetToken: string;
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [passwordError, setpasswordError] = React.useState('');
  const submitPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (password !== '') {
      if (password.length >= 5) {
        if (password === repeatPassword) {
          setpasswordError('');
          props.changePassword({
            passwordResetToken,
            newPassword: password,
          });
        } else {
          setpasswordError('Password and confirm passwords have different values');
        }
      } else {
        setpasswordError('Password should have minimum 5 letters');
      }
    } else {
      setpasswordError('Password cannot be empty');
    }
  };
  React.useEffect(() => {
    // get string from url
    passwordResetToken = 'token from url';
  });
  return (
    <div className={classnames(authStyles.registerRoot)}>
      <div className={classnames(authStyles.registerMessage)}>
        <h1 className={classnames(authStyles['register-h1'])}> Reset Password </h1>
        <p> Enter your new password </p>
      </div>
      <div className={classnames('col-sm-12', authStyles.form)}>
        <form
          className={classnames('registerForm d-flex flex-wrap', authStyles['main-register-form'])}
          noValidate
        >
          <div className={classnames(authStyles['stage-div'], authStyles['stage-form'])}>
            <div className={classnames(authStyles['login-label'])}> New Password </div>
            <div className={classnames(registerStyles['input-group'])}>
              <input
                type="password"
                className={classnames('form-control', authStyles['register-input'])}
                id="registerValidationPassword"
                aria-describedby="inputGroupPrepend"
                pattern=".{5,}"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </div>

            <div
              className={
                passwordError !== ''
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
                {passwordError}
                {'\n'}
                {props.errorMessage}
              </div>
            </div>
            <div
              className={classnames(registerStyles['input-group'], 'd-flex justify-content-center')}
            >
              <button
                className={classnames(authStyles['register-button'])}
                onClick={(e) => submitPassword(e)}
              >
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
