import * as styles1 from 'app/styles/Authentication.module.css';
import * as styles from 'app/styles/UserProfileModal.module.css';
import { InputName } from 'app/types/UserProfileModal';
import * as EditPasswordInterfaces from 'app/types/UserProfileModal/EditPassword';
import classnames from 'classnames';
import * as React from 'react';
import { Row } from 'react-bootstrap';

export class EditPassword extends React.Component<
  EditPasswordInterfaces.Props,
  { isClicked: boolean }
> {
  // tslint:disable-next-line
  public constructor(props: any) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }
  public render() {
    const { handleEditPassword, onInputChange } = this.props;
    const { editPasswordRef } = this.props;
    const { oldPassword, password, repeatPassword } = this.props;
    return (
      <div className="col-5">
        <Row className={classnames('mb-3')}>
          <div className={classnames('col-sm-12', styles.form)}>
            <div
              className={classnames('text-dark', styles.formHeading)}
              style={{
                display: 'flex',
                marginBottom: '5%',
                marginLeft: '10%',
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
                  <div className="input-group">
                    <label className="labeltext">Old Password</label>
                    <div
                      className="input-group-prepend"
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
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
                  <div className="input-group">
                    <label className="labeltext">New Password</label>
                    <div
                      className="input-group-prepend"
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
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
                  <div className="input-group">
                    <label className="labeltext">Confirm Password</label>
                    <div
                      className="input-group-prepend"
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
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
                    className={classnames('btn btn-success', styles1.loginButton)}
                    type="submit"
                    style={{
                      backgroundColor: 'rgb(70, 48, 235)',
                      borderColor: 'rgb(70, 48, 235)',
                      marginBottom: '10px',
                      width: '100%',
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Row>
      </div>
    );
  }
}
