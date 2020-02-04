import { faLock, faPen ,faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/UserProfileModal.module.css';
import { InputName, InputState } from 'app/types/UserProfileModal';
import * as EditPasswordInterfaces from 'app/types/UserProfileModal/EditPassword';
import classnames from 'classnames';
import * as React from 'react';
import { Button, Row } from 'react-bootstrap';

export class EditPassword extends React.Component<EditPasswordInterfaces.Props, {isClicked:boolean}> {
  public constructor(props:any){
    super(props);
    this.state={
      isClicked:false,
    }
  }
  public render() {
    const { handleEditPassword, onInputChange, inputEnabler } = this.props;
    const { editPasswordRef } = this.props;
    const { listDisabled, oldPassword, password, repeatPassword } = this.props;
    return (
      <div className="col-5">
        <Row className={classnames('mb-3')}>
          <div className={classnames('col-sm-12', styles.form)}>
            <div
              className={classnames('text-dark', styles.formHeading)}
              style={{
                display: 'flex',
              }}
            >
              {' '}
              Credentials
              <Button
                style={{
                  'color':'grey',
                }}
                className={classnames(styles.editPen2, 'ml-auto p-0', {
                  [`${styles.editPen2Active}`]: !listDisabled.isPasswordDisabled,
                })}
                onClick={() => {
                  inputEnabler(InputState.isPasswordDisabled, !listDisabled.isPasswordDisabled);
                  this.setState( (prevState) => ({
                    isClicked:!prevState.isClicked
                  }))
                }}
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>
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
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        {this.state.isClicked?<FontAwesomeIcon icon={faUnlock} />:<FontAwesomeIcon icon={faLock} />}
                      </span>
                    <input
                      type="password"
                      className="form-control"
                      id="editValidationOldPassword"
                      placeholder="Old Password"
                      aria-describedby="inputGroupPrepend"
                      minLength={5}
                      value={oldPassword}
                      onChange={(e) => onInputChange(InputName.oldPassword, e.target.value)}
                      required
                      disabled={listDisabled.isPasswordDisabled}
                    />
                    </div>
                    <div className="invalid-feedback">
                      Password should have minimum 5 characters.
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col mb-3">
                  <div className="input-group">
                  <label className="labeltext">New Password</label>
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        {this.state.isClicked?<FontAwesomeIcon icon={faUnlock} />:<FontAwesomeIcon icon={faLock} />}
                      </span>
                    <input
                      type="password"
                      className="form-control"
                      id="editValidationPassword"
                      placeholder="New Password"
                      aria-describedby="inputGroupPrepend"
                      minLength={5}
                      value={password}
                      onChange={(e) => onInputChange(InputName.password, e.target.value)}
                      required
                      disabled={listDisabled.isPasswordDisabled}
                    />
                    </div>
                    {listDisabled.isPasswordDisabled ? (
                      <div className="invalid-feedback">Passwords should match.</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col mb-3">
                  <div className="input-group">
                  <label className="labeltext">Confirm Password</label>
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        {this.state.isClicked?<FontAwesomeIcon icon={faUnlock} />:<FontAwesomeIcon icon={faLock} />}
                      </span>
                    <input
                      type="password"
                      className="form-control"
                      id="editValidationRepeatPassword"
                      placeholder="Confirm Password"
                      aria-describedby="inputGroupPrepend"
                      minLength={5}
                      value={repeatPassword}
                      onChange={(e) => onInputChange(InputName.repeatPassword, e.target.value)}
                      required
                      disabled={listDisabled.isPasswordDisabled}
                    />
                    </div>
                    {listDisabled.isPasswordDisabled ? (
                      <div className="invalid-feedback">Passwords should match.</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-12 text-center">
                  <button
                    className="btn btn-success"
                    type="submit"
                    style={{
                      marginBottom: '10px',
                      width: '100%',
                      backgroundColor:'rgb(70, 48, 235)',
                      borderColor:'rgb(70, 48, 235)',
                    }}
                    disabled={listDisabled.isPasswordDisabled}
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
