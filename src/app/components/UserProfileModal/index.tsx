<<<<<<< HEAD
import PopUpMenu from 'app/components/PopUpMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
=======
import { faChartLine, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
>>>>>>> Add State,Type,actions,reducers,apifetch,sagas for ProfileUser
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
      currentPage: UserProfileInterfaces.SelectedPage.EDITPROFILE,
      fullName: userDetails.fullName,
      isPasswordPage: true,
      oldPassword: '',
      password: '',
      repeatPassword: '',
      username: userDetails.username,
    };
  }

  public renderSwitch(
    param: UserProfileInterfaces.SelectedPage,
    username: string,
    fullName: string,
    // tslint:disable-next-line
    userDetails: any,
    country: string,
    avatar: string,
    oldPassword: string,
    password: string,
    repeatPassword: string,
  ) {
    switch (param) {
      case UserProfileInterfaces.SelectedPage.EDITPROFILE:
        return (
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
        );
        break;

      case UserProfileInterfaces.SelectedPage.EDITPASSWORD:
        return (
          <EditPassword
            handleEditPassword={this.handleEditPassword}
            onInputChange={this.onInputChange}
            editPasswordRef={this.editPasswordRef}
            oldPassword={oldPassword}
            password={password}
            repeatPassword={repeatPassword}
            userDetails={userDetails}
          />
        );
        break;

      default:
        return <p>Hello World</p>;
    }
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
        <div
          style={{
<<<<<<< HEAD
            display: 'flex',
            flexDirection: 'column',
            justifyContent: '',
            position: 'absolute',
            marginLeft: '10%',
            marginTop: '10%',
            borderRight: '2px solid #D3D3D3',
=======
            borderRight: '2px solid #D3D3D3',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: '',
            marginLeft: '10%',
            marginTop: '10%',
            position: 'absolute',
>>>>>>> Add State,Type,actions,reducers,apifetch,sagas for ProfileUser
          }}
        >
          <div
            style={{ paddingBottom: '10px', paddingRight: '10px', cursor: 'pointer' }}
            onClick={() => {
              this.setState({
                currentPage: UserProfileInterfaces.SelectedPage.EDITPROFILE,
              });
            }}
          >
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '30' }} />
            <label style={{ paddingLeft: '10px', cursor: 'pointer' }}>User Details</label>
          </div>

          <div
            style={{ paddingBottom: '10px', paddingRight: '10px', cursor: 'pointer' }}
            onClick={() => {
              this.setState({
                currentPage: UserProfileInterfaces.SelectedPage.EDITPASSWORD,
              });
            }}
          >
            <FontAwesomeIcon icon={faLock} style={{ fontSize: '30' }} />
            <label style={{ paddingLeft: '10px', cursor: 'pointer' }}>User Credentials</label>
          </div>

          <div
            style={{ paddingBottom: '10px', paddingRight: '10px', cursor: 'pointer' }}
            onClick={() => {
              this.setState({
                currentPage: UserProfileInterfaces.SelectedPage.USERSTATS,
              });
            }}
          >
            <FontAwesomeIcon icon={faChartLine} style={{ fontSize: '30' }} />
            <label style={{ paddingLeft: '10px', paddingRight: '10px', cursor: 'pointer' }}>
              User Stats
            </label>
          </div>
        </div>
        <Row
          className={
            this.state.isPasswordPage
              ? classnames(styles.editProfileElement)
              : classnames(styles.editPasswordElement)
          }
        >
          {this.renderSwitch(
            this.state.currentPage,
            username,
            fullName,
            userDetails,
            country,
            avatar,
            oldPassword,
            password,
            repeatPassword,
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
<<<<<<< HEAD
              let newState =
=======
              const newState =
>>>>>>> Add State,Type,actions,reducers,apifetch,sagas for ProfileUser
                this.state.currentPage === UserProfileInterfaces.SelectedPage.EDITPROFILE
                  ? UserProfileInterfaces.SelectedPage.EDITPASSWORD
                  : UserProfileInterfaces.SelectedPage.EDITPROFILE;
              this.setState({
                currentPage: newState,
              });
            }}
          >
            {this.state.currentPage === UserProfileInterfaces.SelectedPage.EDITPROFILE
              ? 'Want to change Credentials?'
              : this.state.currentPage === UserProfileInterfaces.SelectedPage.EDITPASSWORD
              ? 'Want to change Info?'
              : null}
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
