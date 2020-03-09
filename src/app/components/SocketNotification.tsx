import { useToasts } from 'react-toast-notifications';
import * as SocketNotificationInterfaces from 'app/types/SocketNotification';
import React from 'react';

export class SocketNotification extends React.Component<
  SocketNotificationInterfaces.Props,
  { message: string }
> {
  constructor(props: SocketNotificationInterfaces.Props) {
    super(props);
    const { updateNotification } = this.props;
    updateNotification('Hello Guys');
  }

  public handleOnClick = () => {
    const { updateNotification } = this.props;
    updateNotification('Gello Girls');
  };

  public componentDidMount() {
    this.useHooks();
  }

  public componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.message !== prevState.message) {
      this.useHooks();
    }
    const { notification } = this.props;
    console.log(notification);
  }

  public useHooks = () => {
    const { notification } = this.props;

    const { addToast } = useToasts();

    addToast(notification, {
      appearance: SocketNotificationInterfaces.NotificationType.INFO,
      autoDismiss: true,
    });

    addToast(notification, {
      appearance: SocketNotificationInterfaces.NotificationType.SUCCESS,
      autoDismiss: true,
    });

    addToast(notification, {
      appearance: SocketNotificationInterfaces.NotificationType.ERROR,
      autoDismiss: true,
    });

    addToast('Connected to Server!', {
      appearance: SocketNotificationInterfaces.NotificationType.SUCCESS,
      autoDismiss: true,
    });

    addToast(notification, {
      appearance: SocketNotificationInterfaces.NotificationType.INFO,
      autoDismiss: true,
    });

    addToast('Compiled Successfully!', {
      appearance: SocketNotificationInterfaces.NotificationType.SUCCESS,
      autoDismiss: true,
    });

    addToast(`Compile Error: ${notification}`, {
      appearance: SocketNotificationInterfaces.NotificationType.ERROR,
      autoDismiss: true,
    }),
      addToast(notification, {
        appearance: SocketNotificationInterfaces.NotificationType.INFO,
        autoDismiss: true,
      });

    addToast(notification, {
      appearance: SocketNotificationInterfaces.NotificationType.ERROR,
      autoDismiss: true,
    });

    // addToast(result, { appearance: SocketNotificationInterfaces.NotificationType.SUCCESS, autoDismiss: true });
    // Have no Idea why result is being used
    // addToast(result, { appearance: SocketNotificationInterfaces.NotificationType.ERROR, autoDismiss: true });

    addToast('Match Executed Successfully!', {
      appearance: SocketNotificationInterfaces.NotificationType.SUCCESS,
      autoDismiss: true,
    });

    addToast(notification, {
      appearance: SocketNotificationInterfaces.NotificationType.INFO,
      autoDismiss: true,
    });

    addToast(`Debug Run Error: ${notification}`, {
      appearance: SocketNotificationInterfaces.NotificationType.ERROR,
      autoDismiss: true,
    }),
      addToast('Disconnected', {
        appearance: SocketNotificationInterfaces.NotificationType.ERROR,
        autoDismiss: true,
      });
  };

  public render() {
    return <button onClick={this.handleOnClick}></button>;
  }
}
