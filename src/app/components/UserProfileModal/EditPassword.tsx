import { faLock, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/UserProfileModal.module.css';
import { InputName, InputState } from 'app/types/UserProfileModal';
import * as EditPasswordInterfaces from 'app/types/UserProfileModal/EditPassword';
import classnames from 'classnames';
import * as React from 'react';
import { Button, Row } from 'react-bootstrap';

export class EditPassword extends React.Component<EditPasswordInterfaces.Props, {}> {
  public render() {
    const { handleEditPassword, onInputChange, inputEnabler } = this.props;
    const { editPasswordRef } = this.props;
    const { listDisabled, oldPassword, password, repeatPassword } = this.props;
    return (
      <div className="col-6">
        <Row className={classnames('mb-4')}>
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
                className={classnames(styles.editPen, 'ml-auto p-0', {
                  [`${styles.editPenActive}`]: !listDisabled.isPasswordDisabled,
                })}
                onClick={() => {
                  inputEnabler(InputState.isPasswordDisabled, !listDisabled.isPasswordDisabled);
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
                <div className="col mb-4">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
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
                    <div className="invalid-feedback">
                      Password should have minimum 5 characters.
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col mb-4">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
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
                    {listDisabled.isPasswordDisabled ? (
                      <div className="invalid-feedback">Passwords should match.</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col mb-4">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
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
                    {listDisabled.isPasswordDisabled ? (
                      <div className="invalid-feedback">Passwords should match.</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div
                className="form-row"
                style={{
                  marginTop: '112px',
                }}
              >
                <div className="col-12 text-center">
                  <button
                    className="btn btn-info"
                    type="submit"
                    style={{
                      marginTop: '24px',
                      width: '100%',
                    }}
                  >
                    Edit Credentials
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
