import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditPassword } from 'app/components/UserProfileModal/EditPassword';
import { EditProfile } from 'app/components/UserProfileModal/EditProfile';
import * as styles from 'app/styles/UserProfileModal.module.css';
import * as UserProfileInterfaces from 'app/types/UserProfileModal';
import classnames from 'classnames';
import * as React from 'react';
import { Button, Grid, Row } from 'react-bootstrap';
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
      listDisabled: {
        isFlagSelectDisabled: true,
        isFullNameDisabled: true,
        isPasswordDisabled: true,
        isUserNameDisabled: true,
      },
      oldPassword: '',
      password: '',
      repeatPassword: '',
      username: userDetails.username,
    };
    this.props.getUserDetails();
  }

  public componentWillReceiveProps(nextProps: UserProfileInterfaces.Props) {
    const { country, username, fullName, avatar } = this.state;
    const { userDetails } = nextProps;
    this.setState({
      avatar: userDetails.avatar !== avatar ? userDetails.avatar : avatar,
      country: userDetails.country !== country ? userDetails.country : country,
      fullName: userDetails.fullName !== fullName ? userDetails.fullName : fullName,
      username: userDetails.username !== country ? username : userDetails.username,
    });
    if (this.reactFlagRef.current) {
      this.reactFlagRef.current.updateSelected(
        userDetails.country !== country ? userDetails.country : country,
      );
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
      listDisabled,
      avatar,
    } = this.state;
    const { isUserProfileModalOpen, toggleUserProfileModal, userDetails } = this.props;
    return (
      <div
        className={classnames(styles.UserProfileModal, {
          [`${styles.modalOpen}`]: isUserProfileModalOpen,
        })}
      >
        <Grid
          fluid={true}
          className={classnames(styles.modal, {
            [`${styles.slideEnter}`]: isUserProfileModalOpen,
          })}
        >
          <Row>
            <div className="col" style={{ padding: 10 }}>
              <div className="col text-center mb-1">
                <h4 className="text-dark m-2">Edit Profile</h4>
              </div>
            </div>
            <div className="col-sm-auto p-0 m-0">
              <Button
                className={classnames(styles.customBtn)}
                onClick={() => {
                  toggleUserProfileModal(false);
                }}
              >
                <FontAwesomeIcon icon={faTimes} color={'black'} />
              </Button>
            </div>
          </Row>
          {/* <Row>
            <div className="col text-center mb-3">
              <h3 className="text-dark m-0">Edit Profile</h3>
            </div>
          </Row> */}
          <div className="text-center errorMessage">{userDetails.errorMessage}</div>
          <Row>
            <EditProfile
              handleEditProfile={this.handleEditProfile}
              onInputChange={this.onInputChange}
              inputEnabler={this.inputEnabler}
              editProfileRef={this.editProfileRef}
              reactFlagRef={this.reactFlagRef}
              username={username}
              listDisabled={listDisabled}
              fullName={fullName}
              userDetails={userDetails}
              country={country}
              avatar={avatar}
            />
            <EditPassword
              handleEditPassword={this.handleEditPassword}
              onInputChange={this.onInputChange}
              inputEnabler={this.inputEnabler}
              editPasswordRef={this.editPasswordRef}
              listDisabled={listDisabled}
              oldPassword={oldPassword}
              password={password}
              repeatPassword={repeatPassword}
              userDetails={userDetails}
            />
          </Row>
        </Grid>
      </div>
    );
  }

  private handleEditProfile = (event: React.FormEvent<HTMLFormElement>) => {
    const { editUserProfile } = this.props;
    const { country, fullName, username, listDisabled, avatar } = this.state;
    const form = this.editProfileRef.current;
    event.preventDefault();

    if (form) {
      if (form.checkValidity()) {
        editUserProfile({
          ...(!listDisabled.isFlagSelectDisabled && { country }),
          ...(!listDisabled.isFullNameDisabled && { fullName }),
          ...(!listDisabled.isUserNameDisabled && { username }),
          avatar,
        });

        this.setState({
          listDisabled: {
            ...listDisabled,
            isEmailDisabled: true,
            isFlagSelectDisabled: true,
            isFullNameDisabled: true,
            isUserNameDisabled: true,
          },
        });
      }
      form.classList.add('was-validated');
    }
  };

  private handleEditPassword = (event: React.FormEvent<HTMLFormElement>) => {
    const { editUserPassword } = this.props;
    const { oldPassword, repeatPassword, password, listDisabled } = this.state;
    const form = this.editPasswordRef.current;
    event.preventDefault();

    if (form) {
      if (form.checkValidity()) {
        if (!listDisabled.isPasswordDisabled && password === repeatPassword) {
          editUserPassword({
            ...(!listDisabled.isPasswordDisabled && {
              oldPassword,
              password,
            }),
          });
        }
        this.setState({
          listDisabled: {
            ...listDisabled,
            isPasswordDisabled: true,
          },
        });
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

  private inputEnabler = (inputState: UserProfileInterfaces.InputState, value: boolean) => {
    this.setState(this.updateListDisabledState(inputState, value));
  };

  private updateInputState = <T extends string>(
    key: keyof UserProfileInterfaces.State,
    value: T,
  ) => (prevState: UserProfileInterfaces.State): UserProfileInterfaces.State => ({
    ...prevState,
    [key]: value,
  });

  private updateListDisabledState = <T extends boolean>(
    key: keyof UserProfileInterfaces.ListDisabled,
    value: T,
  ) => (prevState: UserProfileInterfaces.State): UserProfileInterfaces.State => ({
    ...prevState,
    listDisabled: {
      ...prevState.listDisabled,
      [key]: value,
    },
  });
}
