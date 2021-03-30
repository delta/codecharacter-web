import * as styles1 from 'app/styles/Authentication.module.css';
import * as styles from 'app/styles/UserProfileModal.module.css';
import { InputName } from 'app/types/UserProfileModal';
import * as EditPasswordInterfaces from 'app/types/UserProfileModal/EditPassword';
import classnames from 'classnames';
import * as React from 'react';
import { Row } from 'react-bootstrap';

export class EditPassword extends React.Component<EditPasswordInterfaces.Props, {}> {
  public render() {
    const { handleEditPassword, onInputChange } = this.props;
    const { editPasswordRef } = this.props;
    const { oldPassword, password, repeatPassword } = this.props;
    return (
      <Row className={classnames('mb-3')}>
        <div className="col-sm-2 col-md-3 col-lg-4"></div>
        <div className={classnames('col-sm-8 col-md-6 col-lg-4', styles.passwordForm)}>
          <div
            className={classnames('text-dark', styles.formHeading)}
            style={{
              marginBottom: '5%',
              marginLeft: '-1px',
              textAlign: 'center',
            }}
          >
            User Credentials
          </div>
          <form
            className={'editpasswordForm'}
            noValidate
            ref={editPasswordRef}
            onSubmit={handleEditPassword}
          >
            <div className="form-row">
              <div className="col mb-3">
                <div className={classnames(styles1['input-group'])}>
                  <label className="labeltext">Old Password</label>
                  <div className={classnames('input-group-prepend', styles.inputGroup)}>
                    <input
                      type="password"
                      className={classnames('form-control', styles1['login-input'])}
                      id="editValidationOldPassword"
                      aria-describedby="inputGroupPrepend"
                      minLength={5}
                      value={oldPassword}
                      onChange={(e) => onInputChange(InputName.oldPassword, e.target.value)}
                      required
                    />
                    <div className={classnames('invalid-feedback', styles1['login-error'])}>
                      Password should have minimum 5 characters.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col mb-3">
                <div className={classnames(styles1['input-group'])}>
                  <label className="labeltext">New Password</label>
                  <div className={classnames('input-group-prepend', styles.inputGroup)}>
                    <input
                      type="password"
                      className={classnames('form-control', styles1['login-input'])}
                      id="editValidationPassword"
                      aria-describedby="inputGroupPrepend"
                      minLength={5}
                      value={password}
                      onChange={(e) => onInputChange(InputName.password, e.target.value)}
                      required
                    />
                    <div className={classnames('invalid-feedback', styles1['login-error'])}>
                      Password should have minimum 5 characters.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col mb-3">
                <div className={classnames(styles1['input-group'])}>
                  <label className="labeltext">Confirm Password</label>
                  <div className={classnames('input-group-prepend', styles.passwordInput)}>
                    <input
                      type="password"
                      className={classnames('form-control', styles1['login-input'])}
                      id="editValidationRepeatPassword"
                      aria-describedby="inputGroupPrepend"
                      minLength={5}
                      value={repeatPassword}
                      onChange={(e) => onInputChange(InputName.repeatPassword, e.target.value)}
                      required
                    />
                    <div className={classnames('invalid-feedback', styles1['login-error'])}>
                      Passwords should match.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-12 text-center">
                <button
                  className={classnames('btn btn-success', styles1.loginButton, styles.loginButton)}
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-2 col-md-3 col-lg-4"></div>
      </Row>
    );
  }
}
