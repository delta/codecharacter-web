import {
  faEnvelope,
  faFlag,
  faLock,
  faPen,
  faTimes,
  faUser,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/UserProfileModal.module.css';
import * as UserProfileInterfaces from 'app/types/UserProfileModal';
import classnames from 'classnames';
import * as React from 'react';
import { Button, Grid, Row } from 'react-bootstrap';

// tslint:disable-next-line:import-name
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
export class UserProfileModal extends React.Component<
  UserProfileInterfaces.Props,
  UserProfileInterfaces.State
> {
  private editProfileRef = React.createRef<HTMLFormElement>();
  private reactFlag = React.createRef<ReactFlagsSelect>();

  constructor(props: UserProfileInterfaces.Props) {
    super(props);
    const { userDetails } = this.props;
    this.state = {
      country: userDetails.country,
      email: userDetails.email,
      fullName: userDetails.fullName,
      listDisabled: {
        isEmailDisabled: true,
        isFlagSelectDisabled: true,
        isFullNameDisabled: true,
        isPasswordDisabled: true,
        isRepeatPasswordDisabled: true,
        isUserNameDisabled: true,
      },
      password: '',
      repeatPassword: '',
      username: userDetails.username,
    };
    this.props.getUserDetails();
  }

  public componentWillReceiveProps(nextProps: UserProfileInterfaces.Props) {
    const { country, username, fullName } = this.state;
    const { userDetails } = nextProps;
    this.setState({
      country: userDetails.country !== country ? userDetails.country : country,
      fullName: userDetails.fullName !== fullName ? userDetails.fullName : fullName,
      username: userDetails.username !== country ? username : userDetails.username,
    });
    if (this.reactFlag.current) {
      this.reactFlag.current.updateSelected(
        userDetails.country !== country ? userDetails.country : country,
      );
    }
  }

  public render() {
    const {
      email,
      password,
      fullName,
      repeatPassword,
      username,
      country,
      listDisabled,
    } = this.state;
    const { checkUsernameExists, isUserProfileModalOpen, toggleUserProfileModal } = this.props;
    return (
      <div
        className={classnames(styles.UserProfileModal, {
          [`${styles.modalOpen}`]: !isUserProfileModalOpen,
        })}
      >
        <Grid
          fluid={true}
          className={classnames(styles.modal, {
            [`${styles.slideEnter}`]: !isUserProfileModalOpen,
          })}
        >
          <div>
            <Row>
              <div className="col" />
              <div className="col-sm-auto p-0 m-0">
                <Button
                  className={classnames(styles.customBtn)}
                  onClick={() => {
                    toggleUserProfileModal(false);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} color={'black'} />
                </Button>
              </div>
            </Row>
            <Row>
              <div className="col text-center">
                <h3 className="text-dark my-0">Edit Profile</h3>
              </div>
            </Row>
            <Row className="mb-3">
              <div className={classnames('col-sm-10 offset-sm-1', styles.form)}>
                <form
                  className={'editForm'}
                  noValidate
                  ref={this.editProfileRef}
                  onSubmit={this.handleEditProfile}
                >
                  <div className="form-row">
                    <div className="col mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroupPrepend">
                            <FontAwesomeIcon icon={faUser} />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="editValidationUsername"
                          placeholder="Username"
                          aria-describedby="inputGroupPrepend"
                          maxLength={50}
                          minLength={5}
                          value={username}
                          onChange={(e) => {
                            checkUsernameExists(e.target.value);
                            this.setState({
                              username: e.target.value,
                            });
                          }}
                          required
                          disabled={listDisabled.isUserNameDisabled}
                        />
                        <div className="input-group-append">
                          <span
                            className={classnames('input-group-text', styles.editPen, {
                              [`${styles.editPenActive}`]: !listDisabled.isUserNameDisabled,
                            })}
                            onClick={() => {
                              this.setState({
                                listDisabled: {
                                  ...listDisabled,
                                  isUserNameDisabled: !listDisabled.isUserNameDisabled,
                                },
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </span>
                        </div>
                        <div className="invalid-feedback">
                          Username must have minimum 5 characters.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroupPrepend">
                            <FontAwesomeIcon icon={faUserTie} />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="editValidationFullname"
                          placeholder="Name"
                          aria-describedby="inputGroupPrepend"
                          maxLength={50}
                          minLength={5}
                          value={fullName}
                          onChange={(e) =>
                            this.setState({
                              fullName: e.target.value,
                            })
                          }
                          required
                          disabled={listDisabled.isFullNameDisabled}
                        />
                        <div className="input-group-append">
                          <span
                            className={classnames('input-group-text', styles.editPen, {
                              [`${styles.editPenActive}`]: !listDisabled.isFullNameDisabled,
                            })}
                            onClick={() => {
                              this.setState({
                                listDisabled: {
                                  ...listDisabled,
                                  isFullNameDisabled: !listDisabled.isFullNameDisabled,
                                },
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </span>
                        </div>
                        <div className="invalid-feedback">Name must have minimum 5 characters.</div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroupPrepend">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          id="editValidationEmail"
                          placeholder="Email"
                          aria-describedby="inputGroupPrepend"
                          value={email}
                          onChange={(e) =>
                            this.setState({
                              email: e.target.value,
                            })
                          }
                          required
                          disabled={listDisabled.isEmailDisabled}
                        />
                        <div className="input-group-append">
                          <span
                            className={classnames('input-group-text', styles.editPen, {
                              [`${styles.editPenActive}`]: !listDisabled.isEmailDisabled,
                            })}
                            onClick={() => {
                              this.setState({
                                listDisabled: {
                                  ...listDisabled,
                                  isEmailDisabled: !listDisabled.isEmailDisabled,
                                },
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </span>
                        </div>
                        <div className="invalid-feedback">Please enter a valid Email ID.</div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col sm={12} mb-3">
                      <div className="input-group-prepend">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroupPrepend">
                            <FontAwesomeIcon icon={faFlag} />
                          </span>
                        </div>
                        <ReactFlagsSelect
                          searchable={true}
                          placeholder="Search for a country"
                          className="customFlag"
                          defaultCountry={country}
                          onSelect={this.onSelectFlag}
                          ref={this.reactFlag}
                          disabled={listDisabled.isFlagSelectDisabled}
                        />
                        <div className="input-group-append">
                          <span
                            className={classnames('input-group-text', styles.editPen, {
                              [`${styles.editPenActive}`]: !listDisabled.isFlagSelectDisabled,
                            })}
                            onClick={() => {
                              this.setState({
                                listDisabled: {
                                  ...listDisabled,
                                  isFlagSelectDisabled: !listDisabled.isFlagSelectDisabled,
                                },
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </span>
                        </div>
                        <div className="invalid-feedback">Please select a country.</div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col mb-3">
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
                          placeholder="Password"
                          aria-describedby="inputGroupPrepend"
                          minLength={5}
                          value={password}
                          onChange={(e) =>
                            this.setState({
                              password: e.target.value,
                            })
                          }
                          required
                          disabled={listDisabled.isPasswordDisabled}
                        />
                        <div className="input-group-append">
                          <span
                            className={classnames('input-group-text', styles.editPen, {
                              [`${styles.editPenActive}`]: !listDisabled.isPasswordDisabled,
                            })}
                            onClick={() => {
                              this.setState({
                                listDisabled: {
                                  ...listDisabled,
                                  isPasswordDisabled: !listDisabled.isPasswordDisabled,
                                },
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </span>
                        </div>
                        <div className="invalid-feedback">
                          Password should have minimum 5 characters.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col mb-1">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroupPrepend">
                            <FontAwesomeIcon icon={faLock} />
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          id="editValidationrepeatPassword"
                          placeholder="Confirm Password"
                          aria-describedby="inputGroupPrepend"
                          minLength={5}
                          value={repeatPassword}
                          onChange={(e) =>
                            this.setState({
                              repeatPassword: e.target.value,
                            })
                          }
                          required
                          disabled={listDisabled.isRepeatPasswordDisabled}
                        />
                        <div className="input-group-append">
                          <span
                            className={classnames('input-group-text', styles.editPen, {
                              [`${styles.editPenActive}`]: !listDisabled.isRepeatPasswordDisabled,
                            })}
                            onClick={() => {
                              this.setState({
                                listDisabled: {
                                  ...listDisabled,
                                  isRepeatPasswordDisabled: !listDisabled.isRepeatPasswordDisabled,
                                },
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </span>
                        </div>
                        {listDisabled.isRepeatPasswordDisabled ? (
                          <div className="invalid-feedback">Passwords should match.</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="input-group" />
                    <div className="col text-center mt -0 mb-2 errorMessage">
                      {/* {errorMessage} */}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col text-center">
                      <button
                        className="btn btn-info"
                        type="submit"
                        style={{
                          width: '100%',
                        }}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Row>
          </div>
        </Grid>
      </div>
    );
  }

  private handleEditProfile = (event: React.FormEvent<HTMLFormElement>) => {
    const { editUserProfile } = this.props;
    const { repeatPassword, country, email, fullName, password, username, listDisabled } = this.state;
    const form = this.editProfileRef.current;
    event.preventDefault();

    if (form) {
      if (form.checkValidity()) {
        // editUserProfile({
        //   ...(!listDisabled.isFlagSelectDisabled && { country }),
        //   ...(!listDisabled.isEmailDisabled && { email }),
        //   ...(!listDisabled.isFullNameDisabled && { fullName }),
        //   ...(!listDisabled.isPasswordDisabled && { password }),
        //   ...(!listDisabled.isRepeatPasswordDisabled && { repeatPassword }),
        //   ...(!listDisabled.isUserNameDisabled && { username }),
        // });
        editUserProfile({
          country,
          email,
          ...(!listDisabled.isFullNameDisabled && { fullName }),
          password,
          repeatPassword,
          username,
        });

        this.setState({
          listDisabled: {
            isEmailDisabled: true,
            isFlagSelectDisabled: true,
            isFullNameDisabled: true,
            isPasswordDisabled: true,
            isRepeatPasswordDisabled: true,
            isUserNameDisabled: true,
          },
        });
      }
      form.classList.add('was-validated');
    }
  };

  private onSelectFlag = (countryCode: string) => {
    this.setState({
      country: countryCode,
    });
  };
}
