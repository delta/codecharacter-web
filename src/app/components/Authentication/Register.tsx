import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RECAPTCHA_SITE_KEY } from 'app/../config/config';
import { Routes } from 'app/routes';
import * as styles from 'app/styles/Authentication.module.css';
import 'app/styles/Register.css';
import * as RegisterInterfaces from 'app/types/Authentication/Register';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
// tslint:disable-next-line:import-name
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
// tslint:disable-next-line:import-name
import ReCAPTCHA from 'react-google-recaptcha';
import { Redirect } from 'react-router-dom';

export class Register extends React.Component<RegisterInterfaces.Props, RegisterInterfaces.State> {
  private registerRef = React.createRef<HTMLFormElement>();
  private register1Ref = React.createRef<HTMLFormElement>();
  private register2Ref = React.createRef<HTMLFormElement>();
  private register3Ref = React.createRef<HTMLFormElement>();
  private recaptchaRef = React.createRef<ReCAPTCHA>();
  private passwordErrorRef = React.createRef<HTMLDivElement>();

  constructor(props: RegisterInterfaces.Props) {
    super(props);

    this.state = {
      avatar: 'BABOON',
      collegeName: '',
      country: 'IN',
      currentStep: RegisterInterfaces.Steps.USER_DETAILS,
      email: '',
      fullName: '',
      isCaptchaValidated: false,
      isFormSubmitted: false,
      isStudent: false,
      password: '',
      pragyanId: '',
      repeatPassword: '',
      type: RegisterInterfaces.RegisterType.Professional,
      username: '',
    };
  }

  public componentCleanup = () => {
    const { updateErrorMessage } = this.props;
    updateErrorMessage('');
  };

  public componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
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
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  public render() {
    const {
      repeatPassword,
      email,
      password,
      username,
      fullName,
      isCaptchaValidated,
      isFormSubmitted,
      isStudent,
      collegeName,
      type,
      currentStep,
    } = this.state;

    const avatars = Object.keys(RegisterInterfaces.Avatar);

    const { checkUsernameExists, errorMessage, updateErrorMessage, isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to={Routes.ROOT} />;
    }

    return (
      <div className={classnames(styles.root)}>
        <div className={classnames(styles.registerMessage)}>
          <h1 className={classnames(styles['register-h1'])}> Register to CodeCharacter! </h1>
          <p> Register now and code your way through!! </p>
        </div>
        <div className={classnames('col-sm-12', styles.form)}>
          <form
            className={classnames('registerForm d-flex flex-wrap', styles['main-register-form'])}
            noValidate
            ref={this.registerRef}
          >
            {currentStep === RegisterInterfaces.Steps.USER_DETAILS && (
              <div className={classnames(styles['stage-div'])}>
                <form
                  className={classnames(styles['stage-form'])}
                  noValidate
                  ref={this.register1Ref}
                >
                  <div className={classnames(styles['login-section1'])}>
                    <div className={classnames(styles['login-label'])}> Full Name </div>
                    <div className="input-group">
                      <input
                        type="text"
                        className={classnames('form-control', styles['register-input'])}
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
                      <div className={classnames('invalid-feedback', styles['register-error'])}>
                        Name must have minimum 5 characters.
                      </div>
                    </div>
                    <div className={classnames(styles['login-label'])}> Username </div>
                    <div className="input-group">
                      <input
                        type="text"
                        className={classnames('form-control', styles['register-input'])}
                        id="registerValidationUsername"
                        aria-describedby="inputGroupPrepend"
                        pattern=".{5,50}"
                        value={username}
                        onChange={(e) => {
                          checkUsernameExists(e.target.value);
                          this.setState({
                            username: e.target.value,
                          });
                        }}
                        required
                      />
                      <div className={classnames('invalid-feedback', styles['register-error'])}>
                        Username must have minimum 5 characters.
                      </div>
                    </div>
                    <div className={classnames(styles['login-label'])}>Email </div>
                    <div className="input-group">
                      <input
                        type="email"
                        className={classnames('form-control', styles['register-input'])}
                        id="registerValidationEmail"
                        aria-describedby="inputGroupPrepend"
                        value={email}
                        onChange={(e) =>
                          this.setState({
                            email: e.target.value,
                          })
                        }
                        required
                      />
                      <div className={classnames('invalid-feedback', styles['register-error'])}>
                        Please enter a valid Email ID.
                      </div>
                    </div>

                    <div
                      className={
                        !errorMessage
                          ? classnames(
                              'col text-center mt -0 mb-2 errorMessage',
                              styles['register-error-inactive'],
                            )
                          : classnames(
                              'col text-center mt -0 mb-2 errorMessage',
                              styles['register-error-active'],
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
              <div className={classnames(styles['stage-div'])}>
                <form
                  className={classnames(styles['stage-form'])}
                  noValidate
                  ref={this.register2Ref}
                >
                  <div className={classnames(styles['login-label'])}> Password </div>
                  <div className="input-group">
                    <input
                      type="password"
                      className={classnames('form-control', styles['register-input'])}
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
                    <div className={classnames('invalid-feedback', styles['register-error'])}>
                      Password should have minimum 5 characters.
                    </div>
                  </div>
                  <div className={classnames(styles['login-label'])}> Confirm Password </div>
                  <div className="input-group">
                    <input
                      type="password"
                      className={classnames('form-control', styles['register-input'])}
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
                    className={classnames('form-row', styles['register-error-inactive'])}
                    ref={this.passwordErrorRef}
                  >
                    <div className="col text-center mt -0 mb-2 errorMessage">
                      Password and confirm passwords have different values
                    </div>
                  </div>
                </form>
              </div>
            )}
            {currentStep === RegisterInterfaces.Steps.OTHERS && (
              <div className={classnames(styles['stage-div'])}>
                <form
                  className={classnames(styles['stage-form'])}
                  noValidate
                  ref={this.register3Ref}
                >
                  <div className="text-center text-dark">
                    Are you a student ?{' '}
                    <span>
                      <input
                        type="checkbox"
                        id="switch"
                        checked={isStudent}
                        onChange={() =>
                          this.setState({
                            isStudent: !isStudent,
                            type:
                              type === RegisterInterfaces.RegisterType.Student
                                ? RegisterInterfaces.RegisterType.Professional
                                : RegisterInterfaces.RegisterType.Student,
                          })
                        }
                      />
                      <label htmlFor="switch" style={{ backgroundColor: '#4630eb' }}>
                        Toggle
                      </label>
                    </span>
                  </div>
                  {isStudent && (
                    <div>
                      <div className={classnames(styles['login-label'])}> College Name </div>
                      <div className="input-group">
                        <input
                          type="text"
                          className={classnames('form-control', styles['register-input'])}
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
                        <div className={classnames('invalid-feedback', styles['register-error'])}>
                          College Name should have minimum 5 characters.
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="input-group">
                    <div className={classnames(styles['register-input'])}>
                      <ReactFlagsSelect
                        searchable={true}
                        placeholder="Search for a country"
                        className="customFlag"
                        defaultCountry="IN"
                        onSelect={this.onSelectFlag}
                      />
                    </div>
                    <div className={classnames('invalid-feedback', styles['register-error'])}>
                      Please Select a country
                    </div>
                  </div>
                  <div className="form-row" style={{ padding: '10px 0px', fontFamily: 'Poppins' }}>
                    <div className="text-center text-dark">Choose your spirit animal</div>
                    <div className={classnames(styles['avatar-select-container'])}>
                      <section className={classnames(styles['avatar-section'])}>
                        {avatars.map((avatar: string, index: number) => (
                          <div
                            className={
                              avatar === this.state.avatar
                                ? classnames(styles['avatar-img-active'])
                                : classnames(styles['avatar-img'])
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
                              // @ts-ignore
                              <img width={50} height={50} src={RegisterInterfaces.Avatar[avatar]} />
                            }
                          </div>
                        ))}
                      </section>
                    </div>
                  </div>
                  <div className="input-group d-flex justify-content-center input-group">
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_SITE_KEY}
                      data-theme={'dark'}
                      onChange={this.onChange}
                      ref={this.recaptchaRef}
                    />
                    <div
                      className="invalid-feedback text-center"
                      style={{
                        display: !isCaptchaValidated && isFormSubmitted ? 'block' : 'none',
                      }}
                    >
                      Please fill recaptcha.
                    </div>
                  </div>
                  <div
                    className={
                      !errorMessage
                        ? classnames(
                            'col text-center mt -0 mb-2 errorMessage',
                            styles['register-error-inactive'],
                          )
                        : classnames(
                            'col text-center mt -0 mb-2 errorMessage',
                            styles['register-error-active'],
                          )
                    }
                  >
                    {errorMessage}
                  </div>
                  <div className="input-group d-flex justify-content-center input-group">
                    <button
                      onClick={this.handleRegister}
                      className={classnames(styles['register-button'])}
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
            className={classnames(styles['left-arrow'])}
            onClick={() => this.handleStepChange(currentStep, currentStep - 1)}
          >
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </div>
          <ul className={classnames(styles['list-unstyled'], styles['multi-steps'])}>
            <li
              className={
                currentStep === RegisterInterfaces.Steps.USER_DETAILS
                  ? classnames(styles['is-active'])
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
                  ? classnames(styles['is-active'])
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
                  ? classnames(styles['is-active'])
                  : undefined
              }
              onClick={() => this.handleStepChange(currentStep, RegisterInterfaces.Steps.OTHERS)}
            >
              <p style={{ color: 'black' }}>Other Details</p>
            </li>
          </ul>
          <div
            className={classnames(styles['right-arrow'])}
            onClick={() => this.handleStepChange(currentStep, currentStep + 1)}
          >
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </div>
        </Row>
        <Row>
          <Col className="ml-auto  my-3 mr-auto">
            <div className="text-dark">
              Already have an account?{' '}
              <a
                href={Routes.LOGIN}
                className={classnames(styles['create-one-button'])}
                onClick={() => {
                  updateErrorMessage('');
                }}
              >
                Login now
              </a>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  private handleStepChange = (oldStep: number, newStep: number) => {
    switch (oldStep) {
      case RegisterInterfaces.Steps.USER_DETAILS: {
        if (this.register1Ref.current) {
          this.register1Ref.current.classList.add('was-validated');
          if (this.register1Ref.current.checkValidity()) {
            this.setState({
              currentStep: 1,
            });
          }
        }
        break;
      }
      case RegisterInterfaces.Steps.CREDENTIALS: {
        if (newStep === 0) {
          this.setState({
            currentStep: 0,
          });
        } else if (newStep === 2) {
          if (this.state.password === this.state.repeatPassword) {
            if (this.passwordErrorRef.current) {
              this.passwordErrorRef.current.classList.remove(
                classnames(styles['register-error-active']),
              );
            }

            if (this.register2Ref.current) {
              this.register2Ref.current.classList.add('was-validated');
              if (this.register2Ref.current.checkValidity()) {
                this.setState({
                  currentStep: 2,
                });
              }
            }
          } else {
            if (this.passwordErrorRef.current) {
              this.passwordErrorRef.current.classList.add(
                classnames(styles['register-error-active']),
              );
            }
          }
        }
        break;
      }
      case RegisterInterfaces.Steps.OTHERS: {
        this.setState({
          currentStep: newStep,
        });
        break;
      }

    }
  };

  private onSelectFlag = (countryCode: string) => {
    this.setState({
      country: countryCode,
    });
  };

  private handleRegister = async (event: React.MouseEvent) => {
    const { register } = this.props;
    const {
      avatar,
      repeatPassword,
      country,
      email,
      fullName,
      password,
      username,
      pragyanId,
      isCaptchaValidated,
      type,
      collegeName: college,
    } = this.state;
    const form = this.registerRef.current;
    const form3 = this.register3Ref.current;
    event.preventDefault();

    if (form && form3) {
      form3.classList.add('was-validated');
      if (form.checkValidity() && isCaptchaValidated) {
        await register({
          avatar,
          college,
          country,
          email,
          fullName,
          password,
          pragyanId,
          repeatPassword,
          type,
          username,
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
}
