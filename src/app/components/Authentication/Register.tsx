import { faEnvelope, faFlag, faLock, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RECAPTCHA_SITE_KEY } from 'app/../config/config';
import * as styles from 'app/styles/Authentication.module.css';
import 'app/styles/Register.css';
import { AuthType } from 'app/types/Authentication';
import * as RegisterInterfaces from 'app/types/Authentication/Register';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
// tslint:disable-next-line:import-name
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
// tslint:disable-next-line:import-name
import ReCAPTCHA from 'react-google-recaptcha';

export class Register extends React.Component<RegisterInterfaces.Props, RegisterInterfaces.State> {
  private registerRef = React.createRef<HTMLFormElement>();
  private recaptchaRef = React.createRef<ReCAPTCHA>();

  constructor(props: RegisterInterfaces.Props) {
    super(props);

    this.state = {
      country: 'IN',
      email: '',
      fullName: '',
      isCaptchaValidated: false,
      password: '',
      pragyanId: '',
      repeatPassword: '',
      username: '',
    };
  }

  public render() {
    const { repeatPassword, email, password, username, fullName } = this.state;
    const { handleSelectPanel, checkUsernameExists, errorMessage, updateErrorMessage } = this.props;
    return (
      <div>
        <Row>
          <div className={classnames('col-sm-10 offset-sm-1', styles.form)}>
            <form
              className={'registerForm'}
              noValidate
              ref={this.registerRef}
              onSubmit={this.handleRegister}
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
                      id="registerValidationUsername"
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
                    />
                    <div className="invalid-feedback">Username must have minimum 5 characters.</div>
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
                      id="registerValidationFullname"
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
                    />
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
                </div>
              </div>
              <div className="form-row">
                <div className="col sm={12} mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <FontAwesomeIcon icon={faFlag} />
                      </span>
                    </div>
                    <ReactFlagsSelect
                      searchable={true}
                      placeholder="Search for a country"
                      className="customFlag"
                      defaultCountry="IN"
                      onSelect={this.onSelectFlag}
                    />
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
                      id="registerValidationPassword"
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
                    />
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
                      id="registerValidationrepeatPassword"
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
                    />
                    <div className="invalid-feedback">Passwords should match.</div>
                  </div>
                </div>
              </div>
              <div className="form-row d-flex justify-content-center my-1">
                <div className="d-flex justify-content-center input-group">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    data-theme={'dark'}
                    onChange={this.onChange}
                    ref={this.recaptchaRef}
                  />
                  <div className="invalid-feedback">Please fill recaptcha.</div>
                </div>
              </div>
              <div className="form-row">
                <div className="input-group" />
                <div className="col text-center mt -0 mb-2 errorMessage">{errorMessage}</div>
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
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Row>
        <Row
          style={{
            borderTop: '2px solid #999',
          }}
        >
          <Col className="ml-auto  my-3 mr-auto">
            <div className="text-dark">
              Already have an account?{' '}
              <a
                className="text-primary"
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  updateErrorMessage('');
                  handleSelectPanel(AuthType.LOGIN);
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

  private handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    const { register, handleSelectPanel } = this.props;
    const {
      repeatPassword,
      country,
      email,
      fullName,
      password,
      username,
      pragyanId,
      isCaptchaValidated,
    } = this.state;
    const form = this.registerRef.current;
    event.preventDefault();

    if (form) {
      if (form.checkValidity() && isCaptchaValidated) {
        register({
          country,
          email,
          fullName,
          password,
          pragyanId,
          repeatPassword,
          username,
        });
        handleSelectPanel(AuthType.LOGIN);
      }
      form.classList.add('was-validated');
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
