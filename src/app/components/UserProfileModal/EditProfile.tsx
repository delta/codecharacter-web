import * as styles1 from 'app/styles/Authentication.module.css';
import 'app/styles/Flags.css';
import * as styles from 'app/styles/UserProfileModal.module.css';
import { Avatar } from 'app/types/Authentication/Register';
import { InputName } from 'app/types/UserProfileModal';
import * as EditProfileInterfaces from 'app/types/UserProfileModal/EditProfile';
import classnames from 'classnames';
import * as React from 'react';
// tslint:disable-next-line:import-name
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';

export class EditProfile extends React.Component<EditProfileInterfaces.Props, {}> {
  public render() {
    const { handleEditProfile, onInputChange } = this.props;
    const { editProfileRef, reactFlagRef } = this.props;
    const {
      username: currentUsername,
      fullName: currentFullName,
      country: currentCountry,
      userDetails,
      avatar: currentAvatar,
    } = this.props;
    const avatars = Object.keys(Avatar);
    return (
      <div className="col-6">
        <div className={classnames('col-sm-12', styles.form1)}>
          <div style={{ display: 'flex' }}>
            <div className={classnames('text-dark', styles.formHeading)}>User Details</div>
          </div>
          <form className={'editForm'} noValidate ref={editProfileRef} onSubmit={handleEditProfile}>
            <div className="form-row">
              <div className="col mb-3">
                <div className={classnames(styles1['input-group'])}>
                  <label style={{ display: 'block' }} className="labeltext">
                    Username
                  </label>
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      className={classnames('form-control', styles1['login-input'])}
                      id="editValidationUsername"
                      aria-describedby="inputGroupPrepend"
                      maxLength={50}
                      minLength={5}
                      value={currentUsername}
                      onChange={(e) => onInputChange(InputName.username, e.target.value)}
                      pattern="[a-zA-Z0-9]+"
                      required
                    />
                    <div className={classnames('invalid-feedback', styles1['login-error'])}>
                      Username must have minimum 5 characters.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col mb-3">
                <div className={classnames(styles1['input-group'])}>
                  <label className="labeltext">Name</label>
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      className={classnames('form-control', styles1['login-input'])}
                      id="editValidationFullname"
                      aria-describedby="inputGroupPrepend"
                      maxLength={50}
                      minLength={5}
                      value={currentFullName}
                      onChange={(e) => {
                        onInputChange(InputName.fullName, e.target.value);
                      }}
                      required
                    />
                    <div className={classnames('invalid-feedback', styles1['login-error'])}>
                      Name must have minimum 5 characters.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row" id="react-flag">
              <div className="col sm={12} mb-3">
                <div className={classnames(styles1['input-group'])}>
                  <label className="labeltext">Nationality</label>
                  <div className={styles.inputGroup}>
                    <ReactFlagsSelect
                      searchable={true}
                      className={classnames('customFlag', styles1['login-input'])}
                      defaultCountry={currentCountry}
                      onSelect={(countryCode: string) =>
                        onInputChange(InputName.country, countryCode)
                      }
                      ref={reactFlagRef}
                    />
                  </div>
                  <div className={classnames('invalid-feedback', styles1['login-error'])}>
                    Please select a country.
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col sm={12} mb-3">
                <div className={classnames(styles1['input-group'])}>
                  <label className="labeltext">Avatar</label>
                  <div className={classnames(styles['avatar-select-container'])}>
                    <section className={classnames(styles['avatar-section'])}>
                      {avatars.map((avatar: string) => (
                        <div
                          key={avatar}
                          className={
                            avatar === currentAvatar
                              ? classnames(styles['avatar-img-active'])
                              : classnames(styles['avatar-img'])
                          }
                          onClick={() => {
                            onInputChange(InputName.avatar, avatar);
                          }}
                          title={avatar}
                        >
                          {
                            // @ts-ignore
                            <img width={50} height={50} src={Avatar[avatar]} />
                          }
                        </div>
                      ))}
                    </section>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col text-center mb-2">
                <div className={styles.inputGroup}>
                  {userDetails.errorMessage !== '' ? (
                    <div className={classnames(styles1['login-error'], styles.usernameError)}>
                      {userDetails.errorMessage}
                    </div>
                  ) : null}
                  <button
                    className={classnames('btn btn-success', styles1.loginButton)}
                    type="submit"
                    style={{
                      backgroundColor: 'rgb(70, 48, 235)',
                      borderColor: 'rgb(70, 48, 235)',
                      margin: '0px',
                      width: '100%',
                    }}
                    disabled={
                      currentAvatar === userDetails.avatar &&
                      currentFullName === userDetails.fullName &&
                      currentUsername === userDetails.username &&
                      currentCountry === userDetails.country
                    }
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
