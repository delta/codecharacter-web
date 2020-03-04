import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RECAPTCHA_SITE_KEY } from 'app/../config/config';
import PopUpMenu from 'app/components/PopUpMenu';
import { Routes } from 'app/routes';
import * as authStyles from 'app/styles/Authentication.module.css';
import * as registerStyles from 'app/styles/Register.module.css';
import * as RegisterInterfaces from 'app/types/Authentication/Register';
import { UserType } from 'app/types/User';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
// tslint:disable-next-line:import-name
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
// tslint:disable-next-line:import-name
import ReCAPTCHA from 'react-google-recaptcha';
import { NavLink, Redirect } from 'react-router-dom';

enum KeyCode {
  ENTER = 'Enter',
}

export class Register extends React.Component<RegisterInterfaces.Props, RegisterInterfaces.State> {
  private registerFormRef = React.createRef<HTMLFormElement>();
  private userDetailsFormRef = React.createRef<HTMLFormElement>();
  private credentialsFormRef = React.createRef<HTMLFormElement>();
  private otherDetailsFormRef = React.createRef<HTMLFormElement>();
  private recaptchaRef = React.createRef<ReCAPTCHA>();
  private passwordErrorDivRef = React.createRef<HTMLDivElement>();

  constructor(props: RegisterInterfaces.Props) {
    super(props);

    this.state = {
      avatar: 'CRUNCH',
      collegeName: '',
      country: 'IN',
      currentStep: RegisterInterfaces.Steps.USER_DETAILS,
      email: '',
      fullName: '',
      isCaptchaValidated: false,
      isFormSubmitted: false,
      isRegistered: false,
      isStudent: false,
      password: '',
      pragyanId: '',
      repeatPassword: '',
      userType: UserType.PROFESSIONAL,
      username: '',
    };
  }

  public handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { currentStep } = this.state;
    const otherDetailsForm = this.otherDetailsFormRef.current;

    if (event.key === KeyCode.ENTER) {
      event.preventDefault();
      if (currentStep === RegisterInterfaces.Steps.OTHERS) {
        if (otherDetailsForm) {
          if (otherDetailsForm.checkValidity()) {
            this.handleRegister();
          }
          otherDetailsForm.classList.add('was-validated');
        }
      }
      this.handleStepChange(currentStep, currentStep + 1);
    }
  };

  public componentDidMount() {
    window.addEventListener('beforeunload', this.resetErrorMessage);
  }
  public componentWillReceiveProps(newProps: RegisterInterfaces.Props) {
    const { errorMessage } = newProps;
    if (errorMessage === 'Username/email already taken') {
      this.setState({
        email: '',
        username: '',
      });
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('beforeunload', this.resetErrorMessage);
  }

  public render() {
    const {
      repeatPassword,
      isRegistered,
      email,
      password,
      username,
      fullName,
      isCaptchaValidated,
      isFormSubmitted,
      isStudent,
      collegeName,
      userType,
      currentStep,
    } = this.state;

    const avatars = Object.keys(RegisterInterfaces.Avatar);

    const {
      checkEmailExists,
      checkUsernameExists,
      errorMessage,
      updateErrorMessage,
      isLoggedIn,
    } = this.props;
    if (isLoggedIn) {
      return <Redirect to={Routes.ROOT} />;
    }
    if (isRegistered) {
      return <Redirect to={Routes.LOGIN} />;
    }

    return (
      <div className={classnames(authStyles.registerRoot)} onKeyDown={this.handleKeyDown}>
        <div className={classnames(authStyles.registerMessage)}>
          <h1 className={classnames(authStyles['register-h1'])}> Register to CodeCharacter! </h1>
          <p> Register now and code your way through!! </p>
        </div>
        <div className={classnames('col-sm-12', authStyles.form)}>
          <form
            className={classnames(
              'registerForm d-flex flex-wrap',
              authStyles['main-register-form'],
            )}
            noValidate
            ref={this.registerFormRef}
          >
            {currentStep === RegisterInterfaces.Steps.USER_DETAILS && (
              <div className={classnames(authStyles['stage-div'])}>
                <form
                  className={classnames(authStyles['stage-form'])}
                  noValidate
                  ref={this.userDetailsFormRef}
                >
                  <div className={classnames(authStyles['login-section1'])}>
                    <div className={classnames(authStyles['login-label'])}> Full Name </div>
                    <div className={classnames(registerStyles['input-group'])}>
                      <input
                        type="text"
                        className={classnames('form-control', authStyles['register-input'])}
                        id="registerValidationFullname"
                        aria-describedby="inputGroupPrepend"
                        pattern=".{5,50}"
                        value={fullName}
                        onChange={(e) =>
                          this.setState({
                            fullName: e.target.value,
                          })
                        }
                        required
                      />
                      <div className={classnames('invalid-feedback', authStyles['register-error'])}>
                        Name must have minimum 5 characters.
                      </div>
                    </div>
                    <div className={classnames(authStyles['login-label'])}> Username </div>
                    <div className={classnames(registerStyles['input-group'])}>
                      <input
                        type="text"
                        className={classnames('form-control', authStyles['register-input'])}
                        id="registerValidationUsername"
                        aria-describedby="inputGroupPrepend"
                        pattern="[a-zA-Z0-9]{5,50}"
                        value={username}
                        onChange={(e) => {
                          checkUsernameExists(e.target.value);
                          this.setState({
                            username: e.target.value,
                          });
                        }}
                        required
                      />
                      <div className={classnames('invalid-feedback', authStyles['register-error'])}>
                        Enter a valid username. It should have a minimum of 5 characters and must be
                        alphanumeric
                      </div>
                    </div>
                    <div className={classnames(authStyles['login-label'])}>Email </div>
                    <div className={classnames(registerStyles['input-group'])}>
                      <input
                        type="email"
                        className={classnames('form-control', authStyles['register-input'])}
                        id="registerValidationEmail"
                        aria-describedby="inputGroupPrepend"
                        value={email}
                        onChange={(e) => {
                          const registerForm = this.registerFormRef.current;
                          if (registerForm && registerForm.checkValidity()) {
                            checkEmailExists(e.target.value);
                          }
                          this.setState({
                            email: e.target.value,
                          });
                        }}
                        required
                      />
                      <div className={classnames('invalid-feedback', authStyles['register-error'])}>
                        Please enter a valid Email ID.
                      </div>
                    </div>

                    <div
                      className={
                        !errorMessage
                          ? classnames(
                              'col text-center mt -0 mb-2 ',
                              authStyles['register-error-inactive'],
                              registerStyles.errorMessage,
                            )
                          : classnames(
                              'col text-center mt -0 mb-2 errorMessage',
                              authStyles['register-error-active'],
                              registerStyles.errorMessage,
                            )
                      }
                    >
                      {errorMessage}
                    </div>
                  </div>
                </form>
              </div>
            )}
            {currentStep === RegisterInterfaces.Steps.CREDENTIALS && (
              <div className={classnames(authStyles['stage-div'])}>
                <form
                  className={classnames(authStyles['stage-form'])}
                  noValidate
                  ref={this.credentialsFormRef}
                >
                  <div className={classnames(authStyles['login-label'])}> Password </div>
                  <div className={classnames(registerStyles['input-group'])}>
                    <input
                      type="password"
                      className={classnames('form-control', authStyles['register-input'])}
                      id="registerValidationPassword"
                      aria-describedby="inputGroupPrepend"
                      pattern=".{5,}"
                      value={password}
                      onChange={(e) =>
                        this.setState({
                          password: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        this.setState({
                          repeatPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div
                    className={classnames('form-row', authStyles['register-error-inactive'])}
                    ref={this.passwordErrorDivRef}
                  >
                    <div
                      className={classnames(
                        'col text-center mt -0 mb-2 errorMessage',
                        registerStyles.errorMessage,
                      )}
                    >
                      Password and confirm passwords have different values
                    </div>
                  </div>
                </form>
              </div>
            )}
            {currentStep === RegisterInterfaces.Steps.OTHERS && (
              <div className={classnames(authStyles['stage-div'])}>
                <form
                  className={classnames(authStyles['stage-form'])}
                  noValidate
                  ref={this.otherDetailsFormRef}
                >
                  <div className="text-center text-dark">
                    Are you a student ?{' '}
                    <span>
                      <input
                        type="checkbox"
                        id="switch"
                        className={classnames(registerStyles['checkbox-input'])}
                        checked={isStudent}
                        onChange={() =>
                          this.setState({
                            isStudent: !isStudent,
                            userType:
                              userType === UserType.STUDENT
                                ? UserType.PROFESSIONAL
                                : UserType.STUDENT,
                          })
                        }
                      />
                      <label
                        htmlFor="switch"
                        className={classnames(registerStyles.flaglabel)}
                        style={{ backgroundColor: '#4630eb' }}
                      >
                        Toggle
                      </label>
                    </span>
                  </div>
                  {isStudent && (
                    <div>
                      <div className={classnames(authStyles['login-label'])}> College Name </div>
                      <div className={classnames(registerStyles['input-group'])}>
                        <input
                          type="text"
                          className={classnames('form-control', authStyles['register-input'])}
                          id="collegeNameValidation"
                          aria-describedby="inputGroupPrepend"
                          pattern=".{5,50}|[a-zA-Z0-9\s]+"
                          value={collegeName}
                          onChange={(e) =>
                            this.setState({
                              collegeName: e.target.value,
                            })
                          }
                          required
                        />
                        <div
                          className={classnames('invalid-feedback', authStyles['register-error'])}
                        >
                          College Name should have minimum 5 characters.
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={classnames(authStyles['login-label'])}> Your country </div>
                  <div className={classnames(registerStyles['input-group'])}>
                    <ReactFlagsSelect
                      searchable={true}
                      placeholder="Search for a country"
                      className={classnames(authStyles.customFlag)}
                      defaultCountry="IN"
                      onSelect={this.onSelectFlag}
                    />

                    <div className={classnames('invalid-feedback', authStyles['register-error'])}>
                      Please Select a country
                    </div>
                  </div>
                  <div
                    className={classnames('form-row', authStyles['avatar-select-form-row'])}
                    style={{ padding: '10px 0px', fontFamily: 'Karla' }}
                  >
                    <div className={classnames(authStyles['login-label'])}>
                      Choose your spirit animal
                    </div>
                    <div className={classnames(authStyles['avatar-select-container'])}>
                      <section className={classnames(authStyles['avatar-section'])}>
                        {avatars.map((avatar: string, index: number) => (
                          <div
                            className={
                              avatar === this.state.avatar
                                ? classnames(authStyles['avatar-img-active'])
                                : classnames(authStyles['avatar-img'])
                            }
                            key={index}
                            onClick={() => {
                              this.setState({
                                avatar,
                              });
                            }}
                            title={avatar}
                          >
                            {
                              <img
                                className={classnames(registerStyles.img)}
                                width={50}
                                height={50}
                                // @ts-ignore
                                src={RegisterInterfaces.Avatar[avatar]}
                              />
                            }
                          </div>
                        ))}
                      </section>
                    </div>
                  </div>
                  <div
                    className={classnames(
                      registerStyles['input-group'],
                      'd-flex justify-content-center',
                    )}
                  >
                    <div className="form-row d-flex justify-content-center my-1">
                      <div className="d-flex justify-content-center input-group">
                        <ReCAPTCHA
                          sitekey={RECAPTCHA_SITE_KEY}
                          data-theme={'dark'}
                          onChange={this.onChange}
                          ref={this.recaptchaRef}
                        />
                      </div>
                    </div>
                    <div
                      className={classnames(
                        authStyles['register-error-active'],
                        'invalid-feedback text-center',
                      )}
                      style={{
                        display: !isCaptchaValidated && isFormSubmitted ? 'block' : 'none',
                      }}
                    >
                      Please fill recaptcha.
                    </div>
                  </div>
                  <div
                    className={
                      errorMessage === ''
                        ? classnames(
                            'col text-center mt -0 mb-2 errorMessage',
                            authStyles['register-error-inactive'],
                            registerStyles.errorMessage,
                          )
                        : classnames(
                            'col text-center mt -0 mb-2 errorMessage',
                            authStyles['register-error-active'],
                            registerStyles.errorMessage,
                          )
                    }
                  >
                    {errorMessage}
                  </div>
                  <div
                    className={classnames(
                      registerStyles['input-group'],
                      'd-flex justify-content-center',
                    )}
                  >
                    <button
                      onClick={this.handleRegister}
                      className={classnames(authStyles['register-button'])}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            )}
          </form>
        </div>
        <Row>
          <div
            className={
              currentStep === RegisterInterfaces.Steps.USER_DETAILS
                ? classnames(authStyles['left-arrow-disable'])
                : classnames(authStyles['left-arrow'])
            }
            onClick={() => {
              if (currentStep !== RegisterInterfaces.Steps.USER_DETAILS) {
                this.handleStepChange(currentStep, currentStep - 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </div>
          <ul className={classnames(authStyles['list-unstyled'], authStyles['multi-steps'])}>
            <li
              className={
                currentStep === RegisterInterfaces.Steps.USER_DETAILS
                  ? classnames(authStyles['is-active'])
                  : undefined
              }
              onClick={() =>
                this.handleStepChange(currentStep, RegisterInterfaces.Steps.USER_DETAILS)
              }
            >
              {' '}
              <p style={{ color: 'black' }}>User Details</p>
            </li>
            <li
              className={
                currentStep === RegisterInterfaces.Steps.CREDENTIALS
                  ? classnames(authStyles['is-active'])
                  : undefined
              }
              onClick={() =>
                this.handleStepChange(currentStep, RegisterInterfaces.Steps.CREDENTIALS)
              }
            >
              <p style={{ color: 'black' }}>Credentials</p>
            </li>
            <li
              className={
                currentStep === RegisterInterfaces.Steps.OTHERS
                  ? classnames(authStyles['is-active'])
                  : undefined
              }
              onClick={() => this.handleStepChange(currentStep, RegisterInterfaces.Steps.OTHERS)}
            >
              <p style={{ color: 'black' }}>Other Details</p>
            </li>
          </ul>
          <div
            className={
              currentStep === RegisterInterfaces.Steps.OTHERS
                ? classnames(authStyles['right-arrow-disable'])
                : classnames(authStyles['right-arrow'])
            }
            onClick={() => {
              if (currentStep !== RegisterInterfaces.Steps.OTHERS) {
                this.handleStepChange(currentStep, currentStep + 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </div>
        </Row>
        <Row>
          <Col className="ml-auto  my-3 mr-auto">
            <div className="text-dark">
              Already have an account?{' '}
              <NavLink to={Routes.LOGIN}>
                <div
                  className={classnames(authStyles['create-one-button'])}
                  onClick={() => {
                    updateErrorMessage('');
                  }}
                >
                  Login now
                </div>
              </NavLink>
            </div>
          </Col>
        </Row>
        <PopUpMenu />
      </div>
    );
  }

  private handleStepChange = (oldStep: number, newStep: number) => {
    const { errorMessage } = this.props;
    switch (oldStep) {
      case RegisterInterfaces.Steps.USER_DETAILS: {
        if (this.userDetailsFormRef.current) {
          this.userDetailsFormRef.current.classList.add('was-validated');
          if (this.userDetailsFormRef.current.checkValidity() && errorMessage === '') {
            this.setState({
              currentStep: RegisterInterfaces.Steps.CREDENTIALS,
            });
          }
        }
        break;
      }
      case RegisterInterfaces.Steps.CREDENTIALS: {
        if (newStep === RegisterInterfaces.Steps.USER_DETAILS) {
          this.setState({
            currentStep: RegisterInterfaces.Steps.USER_DETAILS,
          });
        } else if (newStep === RegisterInterfaces.Steps.OTHERS) {
          if (this.state.password === this.state.repeatPassword) {
            if (this.passwordErrorDivRef.current) {
              this.passwordErrorDivRef.current.classList.remove(
                classnames(authStyles['register-error-active']),
              );
            }

            if (this.credentialsFormRef.current) {
              this.credentialsFormRef.current.classList.add('was-validated');
              if (this.credentialsFormRef.current.checkValidity()) {
                this.setState({
                  currentStep: RegisterInterfaces.Steps.OTHERS,
                });
              }
            }
          } else {
            if (this.passwordErrorDivRef.current) {
              this.passwordErrorDivRef.current.classList.add(
                classnames(authStyles['register-error-active']),
              );
            }
          }
        }
        break;
      }
      case RegisterInterfaces.Steps.OTHERS: {
        if (newStep < RegisterInterfaces.Steps.OTHERS) {
          this.setState({
            currentStep: newStep,
          });
        }
        break;
      }
    }
  };

  private onSelectFlag = (countryCode: string) => {
    this.setState({
      country: countryCode,
    });
  };

  private handleRegister = async () => {
    const { register, errorMessage } = this.props;
    const {
      avatar,
      country,
      email,
      fullName,
      password,
      username,
      isCaptchaValidated,
      collegeName: college,
    } = this.state;
    const registerForm = this.registerFormRef.current;
    const otherDetailsForm = this.otherDetailsFormRef.current;

    if (registerForm && otherDetailsForm) {
      otherDetailsForm.classList.add('was-validated');
      if (registerForm.checkValidity() && isCaptchaValidated && errorMessage === '') {
        await register({
          college,
          country,
          email,
          fullName,
          password,
          username,
          // @ts-ignore
          avatarId: RegisterInterfaces.AvatarId[avatar],
        });
        this.setState({
          isRegistered: true,
        });
      }
      this.setState({
        isFormSubmitted: true,
      });
    }
  };

  private onChange = (value: string | null) => {
    if (value) {
      this.setState({
        isCaptchaValidated: true,
      });
    }
  };

  private resetErrorMessage = () => {
    const { updateErrorMessage } = this.props;
    updateErrorMessage('');
  };
}
