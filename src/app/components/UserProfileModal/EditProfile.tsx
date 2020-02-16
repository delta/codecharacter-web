import * as authStyles from 'app/styles/Authentication.module.css';
import 'app/styles/ReactFlagsSelect.css';
import * as profileStyles from 'app/styles/UserProfileModal.module.css';
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
        <div className={classnames('col-sm-12', profileStyles.profileForm)}>
          <div style={{ display: 'flex' }}>
            <div className={classnames('text-dark', profileStyles.formHeading)}>User Details</div>
          </div>
          <form className={'editForm'} noValidate ref={editProfileRef} onSubmit={handleEditProfile}>
            <div className="form-row">
              <div className="col mb-3">
                <div className={classnames(authStyles['input-group'])}>
                  <label style={{ display: 'block' }} className="labeltext">
                    Username
                  </label>
                  <div className={profileStyles.inputGroup}>
                    <input
                      type="text"
                      className={classnames('form-control', authStyles['login-input'])}
                      id="editValidationUsername"
                      aria-describedby="inputGroupPrepend"
                      maxLength={50}
                      minLength={5}
                      value={currentUsername}
                      onChange={(e) => onInputChange(InputName.username, e.target.value)}
                      pattern="[a-zA-Z0-9]+"
                      required
                    />
                    <div className={classnames('invalid-feedback', authStyles['login-error'])}>
                      Username must have minimum 5 characters.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col mb-3">
                <div className={classnames(authStyles['input-group'])}>
                  <label className="labeltext">Name</label>
                  <div className={profileStyles.inputGroup}>
                    <input
                      type="text"
                      className={classnames('form-control', authStyles['login-input'])}
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
                    <div className={classnames('invalid-feedback', authStyles['login-error'])}>
                      Name must have minimum 5 characters.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row" id="react-flag">
              <div className="col sm={12} mb-3">
                <div className={classnames(authStyles['input-group'])}>
                  <label className="labeltext">Nationality</label>
                  <div className={profileStyles.inputGroup}>
                    <ReactFlagsSelect
                      searchable={true}
                      className={classnames(authStyles.customFlag, authStyles['login-input'])}
                      defaultCountry={currentCountry}
                      onSelect={(countryCode: string) =>
                        onInputChange(InputName.country, countryCode)
                      }
                      ref={reactFlagRef}
                    />
                  </div>
                  <div className={classnames('invalid-feedback', authStyles['login-error'])}>
                    Please select a country.
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col sm={12} mb-3">
                <div className={classnames(authStyles['input-group'])}>
                  <label className="labeltext">Avatar</label>
                  <div className={classnames(profileStyles['avatar-select-container'])}>
                    <section className={classnames(profileStyles['avatar-section'])}>
                      {avatars.map((avatar: string) => (
                        <div
                          key={avatar}
                          className={
                            avatar === currentAvatar
                              ? classnames(profileStyles['avatar-img-active'])
                              : classnames(profileStyles['avatar-img'])
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
                <div className={profileStyles.inputGroup}>
                  {userDetails.errorMessage !== '' ? (
                    <div
                      className={classnames(authStyles['login-error'], profileStyles.usernameError)}
                    >
                      {userDetails.errorMessage}
                    </div>
                  ) : null}
                  <button
                    className={classnames('btn btn-success', authStyles.loginButton)}
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
