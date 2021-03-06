import PopUpMenu from 'app/components/PopUpMenu';
import { EditPassword } from 'app/components/UserProfileModal/EditPassword';
import { EditProfile } from 'app/components/UserProfileModal/EditProfile';
import { Routes } from 'app/routes';
import * as styles from 'app/styles/UserProfileModal.module.css';
import { AvatarId } from 'app/types/Authentication/Register';
import * as UserProfileInterfaces from 'app/types/UserProfileModal';
import classnames from 'classnames';
import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { NavBar, NavPage } from '../home/Navbar';

export class UserProfileModal extends React.Component<
  UserProfileInterfaces.Props,
  UserProfileInterfaces.State
> {
  private editProfileRef = React.createRef<HTMLFormElement>();
  private editPasswordRef = React.createRef<HTMLFormElement>();

  constructor(props: UserProfileInterfaces.Props) {
    super(props);
    const { userDetails } = this.props;
    this.state = {
      avatar: userDetails.avatar,
      country: userDetails.country,
      fullName: userDetails.fullName,
      isPasswordPage: true,
      oldPassword: '',
      password: '',
      repeatPassword: '',
      username: userDetails.username,
    };
    this.props.getUserDetails();
  }

  public render() {
    const {
      fullName,
      username,
      country,
      oldPassword,
      password,
      repeatPassword,
      avatar,
    } = this.state;
    const { userDetails, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return <Redirect to={Routes.LOGIN} />;
    }

    return (
      <Grid fluid={true} className={classnames(styles.UserEdit)} style={{ padding: '0' }}>
        <NavBar isLoggedIn={true} page={NavPage.PROFILE} />
        {this.state.isPasswordPage ? (
          <EditProfile
            handleEditProfile={this.handleEditProfile}
            onInputChange={this.onInputChange}
            editProfileRef={this.editProfileRef}
            username={username}
            fullName={fullName}
            userDetails={userDetails}
            country={country}
            avatar={avatar}
          />
        ) : (
          <EditPassword
            handleEditPassword={this.handleEditPassword}
            onInputChange={this.onInputChange}
            editPasswordRef={this.editPasswordRef}
            oldPassword={oldPassword}
            password={password}
            repeatPassword={repeatPassword}
            userDetails={userDetails}
          />
        )}
        <Row>
          <div className="col-sm-2 col-md-3 col-lg-4"></div>
          <div className="col-sm-8 col-md-6 col-lg-4 text-center">
            <a
              className={
                this.state.isPasswordPage
                  ? classnames('labeltext', styles.loginPageLink)
                  : classnames('labeltext', styles.passwordPageLink)
              }
              onClick={() => {
                this.setState((prevState) => ({
                  isPasswordPage: !prevState.isPasswordPage,
                }));
              }}
            >
              {this.state.isPasswordPage ? 'Want to change Credentials?' : 'Want to change Info?'}
            </a>
          </div>
          <div className="col-sm-2 col-md-3 col-lg-4"></div>
        </Row>
        {this.state.isPasswordPage ? (
          <Row>
            {this.props.userDetails.errorMessage === 'Unauthorised' ? (
              <Redirect to="login" />
            ) : (
              <p>{''}</p>
            )}
          </Row>
        ) : null}
        <PopUpMenu />
      </Grid>
    );
  }

  private handleEditProfile = (event: React.FormEvent<HTMLFormElement>) => {
    const { editUserProfile, userDetails } = this.props;
    const { country, fullName, username, avatar } = this.state;
    const form = this.editProfileRef.current;
    event.preventDefault();

    if (form) {
      if (form.checkValidity()) {
        editUserProfile({
          country,
          fullName,
          ...(userDetails.username !== username && { username }),
          // @ts-ignore
          avatarId: AvatarId[avatar],
        });
      }
      form.classList.add('was-validated');
    }
  };

  private handleEditPassword = (event: React.FormEvent<HTMLFormElement>) => {
    const { editUserPassword } = this.props;
    const { oldPassword, repeatPassword, password } = this.state;
    const form = this.editPasswordRef.current;
    event.preventDefault();

    if (form) {
      if (form.checkValidity()) {
        if (password === repeatPassword) {
          editUserPassword({
            oldPassword,
            password,
          });
        }
      }
      form.classList.add('was-validated');
    }
  };

  private onInputChange = (inputName: UserProfileInterfaces.InputName, value: string) => {
    if (inputName === UserProfileInterfaces.InputName.username) {
      const { checkUsernameExists } = this.props;
      checkUsernameExists(value);
    }
    this.setState(this.updateInputState(inputName, value));
  };

  private updateInputState = <T extends string>(
    key: keyof UserProfileInterfaces.State,
    value: T,
  ) => (prevState: UserProfileInterfaces.State): UserProfileInterfaces.State => ({
    ...prevState,
    [key]: value,
  });
}
