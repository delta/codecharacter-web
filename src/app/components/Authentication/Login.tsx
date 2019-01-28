import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthType } from 'app/components/Authentication/';
import * as styles from 'app/styles/Authentication.module.css';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

export class Login extends React.Component<Login.Props, Login.State> {
  private loginRef = React.createRef<HTMLFormElement>();

  constructor(props: Login.Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  public render() {
    return (
      <div>
        <Row>
          <div className={classnames('col-sm-10 offset-sm-1', styles.form)}>
            <form
              className={classnames('loginForm')}
              noValidate
              ref={this.loginRef}
              onSubmit={(e) => {
                const form = this.loginRef.current;
                if (form) {
                  if (!form.checkValidity()) {
                    e.preventDefault();
                  }
                  form.classList.add('was-validated');
                }
              }}
            >
              <div className="form-row">
                <div className="col mb-4">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="validationEmail"
                      placeholder="Your email"
                      aria-describedby="inputGroupPrepend"
                      required
                      value={this.state.email}
                      onChange={(e) =>
                        this.setState({
                          email: e.target.value,
                        })
                      }
                    />
                    <div className="invalid-feedback">Please enter a valid Email ID.</div>
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
                      id="validationPassword"
                      placeholder="Your password"
                      aria-describedby="inputGroupPrepend"
                      minLength={5}
                      required
                    />
                    <div className="invalid-feedback">Please enter the correct password.</div>
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
                    Login
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
          <Col className="text-center my-3 ml-auto mr-auto">
            <div className="text-dark">
              Don't have an account?{' '}
              <a
                className="text-primary"
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => this.props.handleSelectPanel(AuthType.REGISTER)}
              >
                Create one
              </a>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export namespace Login {
  export interface OwnProps {
    handleSelectPanel: (authType: AuthType) => void;
  }
  export interface State {
    email: string;
    password: string;
  }
  export type Props = OwnProps;
}
