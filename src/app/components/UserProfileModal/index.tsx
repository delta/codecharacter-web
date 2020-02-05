import { EditPassword } from 'app/components/UserProfileModal/EditPassword';
import { EditProfile } from 'app/components/UserProfileModal/EditProfile';
import * as styles from 'app/styles/UserProfileModal.module.css';
import * as UserProfileInterfaces from 'app/types/UserProfileModal';
import classnames from 'classnames';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
// tslint:disable-next-line:import-name
import ReactFlagsSelect from 'react-flags-select'; 

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
      avatar: userDetails.country,
      country: userDetails.country,
      fullName: userDetails.fullName,
      oldPassword: '',
      password: '',
      repeatPassword: '',
      username: userDetails.username,
      isPasswordPage:false
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
        <Row style={{ "boxShadow" : "0 2px 4px rgba(0,0,0,0.05)" }} className="justify-content-between py-2 pl-3">
          <Col className="text-dark font-weight-bold my-auto">USER DETAILS</Col>
        </Row>

          <Row
            className={this.state.isPasswordPage ? classnames(styles.editProfileElement) : classnames(styles.editPasswordElement)}
          >
              {this.state.isPasswordPage?(
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
              ):
              (
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
            {this.props.userDetails.errorMessage}
          </Row>
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
          avatar,
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
