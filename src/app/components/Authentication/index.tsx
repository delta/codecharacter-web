import { faTimes, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from 'app/containers/Authentication/Login';
import Register from 'app/containers/Authentication/Register';
import * as styles from 'app/styles/Authentication.module.css';
import * as AuthenticationInterfaces from 'app/types/Authentication';
import classnames from 'classnames';
import * as React from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
export class Authentication extends React.Component<
  AuthenticationInterfaces.Props,
  AuthenticationInterfaces.State
> {
  constructor(props: AuthenticationInterfaces.Props) {
    super(props);
    this.state = {
      authType: AuthenticationInterfaces.AuthType.LOGIN,
    };
  }

  public render() {
    const { authType } = this.state;
    const { isLoggedIn, updateErrorMessage, setIsAuthenticationOpen } = this.props;
    return (
      <div
        className={classnames(styles.Authentication, {
          [`${styles.modalOpen}`]: !isLoggedIn,
        })}
      >
        <Grid
          fluid={true}
          style={{
            width: authType === AuthenticationInterfaces.AuthType.LOGIN ? '500px' : '850px',
          }}
          className={classnames(styles.modal, {
            [`${styles.slideEnter}`]: !isLoggedIn,
          })}
        >
          <Row className="mt-2">
            <Col sm={11} />
            <Col
              className={'text-right'}
              sm={1}
              style={{ color: 'black', cursor: 'pointer' }}
              onClick={() => {
                setIsAuthenticationOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col sm={12}>
              <div className={classnames(styles.buttonPanelBackground)}>
                <Button
                  className={classnames(styles.buttonPanel, {
                    [`${styles.buttonPanelActive}`]:
                      authType === AuthenticationInterfaces.AuthType.LOGIN,
                  })}
                  onClick={() => {
                    updateErrorMessage('');
                    this.handleSelectPanel(AuthenticationInterfaces.AuthType.LOGIN);
                  }}
                >
                  <FontAwesomeIcon icon={faUser} /> &nbsp;Login
                </Button>
                <Button
                  className={classnames(styles.buttonPanel, {
                    [`${styles.buttonPanelActive}`]:
                      authType === AuthenticationInterfaces.AuthType.REGISTER,
                  })}
                  onClick={() => {
                    updateErrorMessage('');
                    this.handleSelectPanel(AuthenticationInterfaces.AuthType.REGISTER);
                  }}
                >
                  <FontAwesomeIcon icon={faUserPlus} /> &nbsp;Register
                </Button>
              </div>
            </Col>
          </Row>
          {authType === AuthenticationInterfaces.AuthType.LOGIN ? (
            <Login handleSelectPanel={this.handleSelectPanel} />
          ) : (
            <Register handleSelectPanel={this.handleSelectPanel} />
          )}
        </Grid>
      </div>
    );
  }

  private handleSelectPanel = (authType: AuthenticationInterfaces.AuthType) => {
    this.setState({
      authType,
    });
  };
}
