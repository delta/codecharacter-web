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
    const { isLoggedIn } = this.props;
    this.state = {
      authType: AuthenticationInterfaces.AuthType.REGISTER,
      isAuthModalOpen: !isLoggedIn,
    };
  }

  public render() {
    const { isAuthModalOpen, authType } = this.state;
    return (
      <div
        className={classnames(styles.Authentication, {
          [`${styles.modalOpen}`]: isAuthModalOpen,
          [`${styles.modalClose}`]: !isAuthModalOpen,
        })}
      >
        <Grid
          fluid={true}
          className={classnames(styles.modal, {
            [`${styles.slideEnter}`]: isAuthModalOpen,
            [`${styles.slideExit}`]: !isAuthModalOpen,
          })}
        >
          <Row className="justify-content-between">
            <Col className={'ml-auto'}>
              <Button
                className={classnames(styles.customBtn)}
                bsSize="xsmall"
                onClick={() => this.toggleAuthenticationModal(!isAuthModalOpen)}
              >
                <FontAwesomeIcon icon={faTimes} color={'black'} />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <div className={classnames(styles.buttonPanelBackground)}>
                <Button
                  className={classnames(styles.buttonPanel, {
                    [`${styles.buttonPanelActive}`]:
                      authType === AuthenticationInterfaces.AuthType.LOGIN,
                  })}
                  onClick={() => this.handleSelectPanel(AuthenticationInterfaces.AuthType.LOGIN)}
                >
                  <FontAwesomeIcon icon={faUser} /> &nbsp;Login
                </Button>
                <Button
                  className={classnames(styles.buttonPanel, {
                    [`${styles.buttonPanelActive}`]:
                      authType === AuthenticationInterfaces.AuthType.REGISTER,
                  })}
                  onClick={() => this.handleSelectPanel(AuthenticationInterfaces.AuthType.REGISTER)}
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

  private toggleAuthenticationModal = (isAuthModalOpen: boolean) => {
    this.setState({
      isAuthModalOpen,
    });
  };
  private handleSelectPanel = (authType: AuthenticationInterfaces.AuthType) => {
    this.setState({
      authType,
    });
  };
}
