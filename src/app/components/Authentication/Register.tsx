import { faEnvelope, faFlag, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from 'app/styles/Authentication.module.css';
import 'app/styles/Register.css';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
// tslint:disable-next-line:import-name
import ReactFlagsSelect from 'react-flags-select';
// tslint:disable-next-line:no-var-requires
require('react-flags-select/css/react-flags-select.css');
import { AuthType } from '.';

export class Register extends React.Component<Register.Props, Register.State> {
  private registerRef = React.createRef<HTMLFormElement>();
  constructor(props: Register.Props) {
    super(props);

    this.state = {
      confirmPassword: '',
      country: 'IN',
      email: '',
      password: '',
      username: '',
    };
  }

  public render() {
    const { confirmPassword, email, password, username } = this.state;
    const { handleSelectPanel } = this.props;
    return (
      <div>
        <Row>
          <div className={classnames('col-sm-10 offset-sm-1', styles.form)}>
            <form
              className={'registerForm'}
              noValidate
              ref={this.registerRef}
              onSubmit={(e) => {
                const form = this.registerRef.current;
                if (form) {
                  if (!form.checkValidity()) {
                    e.preventDefault();
                  }
                  form.classList.add('was-validated');
                }
              }}
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
                      placeholder="Your username"
                      aria-describedby="inputGroupPrepend"
                      maxLength={50}
                      minLength={5}
                      value={username}
                      onChange={(e) =>
                        this.setState({
                          username: e.target.value,
                        })
                      }
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
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="registerValidationEmail"
                      placeholder="Your email"
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
                      placeholder="Your password"
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
                      id="registerValidationPasswordConfirm"
                      placeholder="Confirm password"
                      aria-describedby="inputGroupPrepend"
                      minLength={5}
                      value={confirmPassword}
                      onChange={(e) =>
                        this.setState({
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                    <div className="invalid-feedback">Passwords should match.</div>
                  </div>
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
                onClick={() => handleSelectPanel(AuthType.LOGIN)}
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
}

export namespace Register {
  export interface OwnProps {
    handleSelectPanel: (authType: AuthType) => void;
  }
  export interface State {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    country: string;
  }
  export type Props = OwnProps;
}
