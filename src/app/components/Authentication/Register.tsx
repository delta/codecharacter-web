// tslint:disable-next-line:max-line-length
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

  constructor(props: RegisterInterfaces.Props) {
    super(props);

    this.state = {
      avatar: 'BABOON',
      collegeName: '',
      country: 'IN',
      currentStep: 0,
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

  public handleNext = () => {
    const { currentStep } = this.state;

    if (currentStep === 0) {
      if (this.register1Ref.current) {
        this.register1Ref.current.classList.add('was-validated');
        if (this.register1Ref.current.checkValidity()) {
          this.setState({
            currentStep: 1,
          });
        }
      }
    } else if (currentStep === 1) {
      if (this.register2Ref.current) {
        this.register2Ref.current.classList.add('was-validated');
        if (this.register2Ref.current.checkValidity()) {
          this.setState({
            currentStep: 2,
          });
        }
      }
    }
  };

  public handlePrevious = () => {
    const { currentStep } = this.state;
    if (currentStep === 1) {
      if (this.register2Ref.current) {
        this.setState({
          currentStep: 0,
        });
      }
    } else if (currentStep === 2) {
      if (this.register3Ref.current) {
        this.setState({
          currentStep: 1,
        });
      }
    }
  };

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
          <h1 style={{ marginTop: '30px' }}> Register to CodeCharacter! </h1>
          <p> Register now and code your way through!! </p>
        </div>
        <div className={classnames('col-sm-12', styles.form)}>
          <form
            className={'registerForm d-flex flex-wrap'}
            noValidate
            ref={this.registerRef}
            onSubmit={this.handleRegister}
          >
            {currentStep === 0 && (
              <div className={classnames(styles['stage-div'])}>
                <form
                  className={classnames(styles['stage-form'])}
                  noValidate
                  ref={this.register1Ref}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      className={classnames('form-control', styles['register-input'])}
                      id="registerValidationFullname"
                      placeholder="Name"
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
                    <div className="invalid-feedback">Name must have minimum 5 characters.</div>
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      className={classnames('form-control', styles['register-input'])}
                      id="registerValidationUsername"
                      placeholder="Username"
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
                    <div className="invalid-feedback">Username must have minimum 5 characters.</div>
                  </div>
                  <div className="input-group">
                    <input
                      type="email"
                      className={classnames('form-control', styles['register-input'])}
                      id="registerValidationEmail"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      value={email}
                      onChange={(e) =>
                        this.setState({
                          email: e.target.value,
                        })
                      }
                      required
                    />
                    <div className="invalid-feedback">Please enter a valid Email ID.</div>
                  </div>
                  <div className={classnames(styles['button-tab'])}>
                    <button
                      className={classnames(styles['button-tab-next'])}
                      onClick={this.handleNext}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            )}
            {currentStep === 1 && (
              <div className={classnames(styles['stage-div'])}>
                <form
                  className={classnames(styles['stage-form'])}
                  noValidate
                  ref={this.register2Ref}
                >
                  <div className="input-group">
                    <input
                      type="password"
                      className={classnames('form-control', styles['register-input'])}
                      id="registerValidationPassword"
                      placeholder="Password"
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
                    <div className="invalid-feedback">
                      Password should have minimum 5 characters.
                    </div>
                  </div>
                  <div className="input-group">
                    <input
                      type="password"
                      className={classnames('form-control', styles['register-input'])}
                      id="registerValidationrepeatPassword"
                      placeholder="Confirm Password"
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
                    <div className="invalid-feedback">Passwords should match.</div>
                  </div>

                  <div className={classnames(styles['button-tab'])}>
                    <button
                      className={classnames(styles['button-tab-previous'])}
                      onClick={this.handlePrevious}
                    >
                      Previous
                    </button>
                    <button
                      className={classnames(styles['button-tab-next'])}
                      onClick={this.handleNext}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            )}
            {currentStep === 2 && (
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
                      <label htmlFor="switch">Toggle</label>
                    </span>
                  </div>
                  {isStudent && (
                    <div className="input-group">
                      <input
                        type="text"
                        className={classnames('form-control', styles['register-input'])}
                        id="collegeNameValidation"
                        placeholder="College Name"
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
                      <div className="invalid-feedback">
                        College Name should have minimum 5 characters.
                      </div>
                    </div>
                  )}
                  <div className="input-group">
                    <ReactFlagsSelect
                      searchable={true}
                      placeholder="Search for a country"
                      className={classnames('customFlag', styles['register-input'])}
                      defaultCountry="IN"
                      onSelect={this.onSelectFlag}
                    />
                    <div className="invalid-feedback">Please Select a country</div>
                  </div>
                  <div className="form-row" style={{ padding: '10px 0px', fontFamily: 'Overpass' }}>
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
                  <div className="form-row">
                    <div className="input-group" />
                    <div className="col text-center mt -0 mb-2 errorMessage">{errorMessage}</div>
                  </div>

                  <div className={classnames(styles['button-tab'])}>
                    <button
                      className={classnames(styles['button-tab-previous'])}
                      onClick={this.handlePrevious}
                    >
                      Previous
                    </button>
                  </div>
                </form>
              </div>
            )}
            {currentStep === 2 && (
              <button type="submit" className={classnames(styles['register-button'])}>
                Register
              </button>
            )}
          </form>
        </div>

        <Row />
        <Row>
          <Col className="ml-auto  my-3 mr-auto">
            <div className="text-dark">
              Already have an account?{' '}
              <a
                href={Routes.LOGIN}
                style={{
                  color: '#4630eb',
                  cursor: 'pointer',
                }}
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

  private onSelectFlag = (countryCode: string) => {
    this.setState({
      country: countryCode,
    });
  };

  private handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
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
    event.preventDefault();

    if (form) {
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
      //  form.classList.add('was-validated');
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
