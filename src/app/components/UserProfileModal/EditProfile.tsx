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
      username:currentUsername,
      fullName:currentFullName,
      country:currentCountry,
      userDetails,
      avatar: currentAvatar,
    } = this.props;
    const avatars = Object.keys(Avatar);
    return (
      <div className="col-6">
          <div className={classnames('col-sm-12', styles.form)}>
            <div style={{display:'flex'}}>
            <div className={classnames('text-dark', styles.formHeading)}> Basic Information
           </div>
            </div>
            <form
              className={'editForm'}
              noValidate
              ref={editProfileRef}
              onSubmit={handleEditProfile}
            >
              <div className="form-row">
                <div className="col mb-3">
                  <div className="input-group">
                  <label style={{display:"block"}} className="labeltext">Username</label>
                  <div style={{display:"flex"}}>
                    <input
                      type="text"
                      className="form-control"
                      id="editValidationUsername"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      maxLength={50}
                      minLength={5}
                      value={currentUsername}
                      onChange={(e) => onInputChange(InputName.username, e.target.value)}
                      pattern="[a-zA-Z0-9]+"
                      required
                    />
                  </div>            
                    <div className="invalid-feedback">Username must have minimum 5 characters.</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col mb-3">
                  <div className="input-group">
                    <label className="labeltext">Name</label>
                      <div style={{display:"flex"}}>
                    <input
                      type="text"
                      className="form-control"
                      id="editValidationFullname"
                      placeholder="Name"
                      aria-describedby="inputGroupPrepend"
                      maxLength={50}
                      minLength={5}
                      value={currentFullName}
                      onChange={(e) => {
                        onInputChange(InputName.fullName, e.target.value)
                        console.log(InputName.fullName)}
                      }
                      required
                    />
                    <div className="invalid-feedback">Name must have minimum 5 characters.</div>
                  </div>
                  </div>
                </div>
              </div>

              <div className="form-row" id="react-flag">
                <div className="col sm={12} mb-3">
                  <div className="input-group">
                    <label className="labeltext">Flag</label>
                      <div style={{display:"flex"}}>
                    <ReactFlagsSelect
                      searchable={true}
                      placeholder="Search for a country"
                      className="customFlag"
                      defaultCountry={currentCountry}
                      onSelect={(countryCode: string) =>
                        onInputChange(InputName.country, countryCode)
                      }
                      ref={reactFlagRef}
                    />
                    </div>
                    <div className="invalid-feedback">Please select a country.</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col sm={12} mb-3">
                  <div className="input-group">
                    <div className="text-center text-light">Edit your spirit animal</div>
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
                  <button
                    className="btn btn-success"
                    type="submit"
                    style={{
                      width: '100%',
                      backgroundColor: 'rgb(70, 48, 235)',
                      borderColor: 'rgb(70, 48, 235)'
                    }}
                    disabled = {  
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
            </form>
          </div>
      </div>
    );
  }
}
