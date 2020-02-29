import { EditPassword } from 'app/components/UserProfileModal/EditPassword';
import { EditProfile } from 'app/components/UserProfileModal/EditProfile';
import * as styles from 'app/styles/UserProfileModal.module.css';
import { AvatarId } from 'app/types/Authentication/Register';
import * as UserProfileInterfaces from 'app/types/UserProfileModal';
import classnames from 'classnames';
import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';
// tslint:disable-next-line
import ReactFlagsSelect from 'react-flags-select';
import { Redirect } from 'react-router-dom';

export class UserProfileModal extends React.Component<
  UserProfileInterfaces.Props,
  UserProfileInterfaces.State
> {
  private editProfileRef = React.createRef<HTMLFormElement>();
  private editPasswordRef = React.createRef<HTMLFormElement>();
  private reactFlagRef = React.createRef<ReactFlagsSelect>();

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
    const { userDetails } = this.props;
    return (
      <Grid fluid={true} className={classnames(styles.UserEdit)}>
        <Row
          className={
            this.state.isPasswordPage
              ? classnames(styles.editProfileElement)
              : classnames(styles.editPasswordElement)
          }
        >
          {this.state.isPasswordPage ? (
            <EditProfile
              handleEditProfile={this.handleEditProfile}
              onInputChange={this.onInputChange}
              editProfileRef={this.editProfileRef}
              reactFlagRef={this.reactFlagRef}
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
        </Row>
        <Row>
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
      </Grid>
    );
  }

  private handleEditProfile = (event: React.FormEvent<HTMLFormElement>) => {
    const { editUserProfile } = this.props;
    const { country, fullName, username, avatar } = this.state;
    const form = this.editProfileRef.current;
    event.preventDefault();

    if (form) {
      if (form.checkValidity()) {
        editUserProfile({
          country,
          fullName,
          username,
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
