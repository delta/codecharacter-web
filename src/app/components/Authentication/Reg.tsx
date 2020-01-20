import * as styles from 'app/styles/Registration.module.css';
import * as RegisterInterfaces from 'app/types/Authentication/Register';
import classnames from 'classnames';
import * as React from 'react';

export default class Reg extends React.Component<{}, RegisterInterfaces.State> {
  // private registerRef = React.createRef<HTMLFormElement>();

  /* tslint:disable-next-line */
  public constructor(props: any) {
    super(props);
    this.state = {
      avatar: 'BABOON',
      collegeName: '',
      country: 'IN',
      email: '',
      fullName: '',
      isCaptchaValidated: false,
      isFormSubmitted: false,
      isStudent: false,
      password: '',
      pragyanId: '',
      repeatPassword: '',
      type: RegisterInterfaces.RegisterType.Professional,
      username: '',
    };
  }

  public render() {
    return (
      <div>
        <div className={classnames(styles['bg-image'])}>
          <div className={classnames(styles['login-form'])}>
            <h1> REGISTRATION </h1>
            <input type="text" placeholder="Name" className={classnames(styles['login-input'])} />
            <input
              type="text"
              placeholder="Username"
              className={classnames(styles['login-input'])}
            />
            <input type="email" placeholder="Email" className={classnames(styles['login-input'])} />
            <input
              type="password"
              placeholder="Password"
              className={classnames(styles['login-input'])}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className={classnames(styles['login-input'])}
            />

            <button className={classnames(styles['login-button'])}> Register </button>
          </div>
        </div>
      </div>
    );
  }
}
