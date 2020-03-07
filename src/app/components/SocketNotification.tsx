import { useToasts } from 'react-toast-notifications';
import * as SocketNotificationInterfaces from 'app/types/SocketNotification';
import React from 'react';

export class SocketNotification extends React.Component<SocketNotificationInterfaces.Props, {}>{
    constructor(props:SocketNotificationInterfaces.Props){
        super(props);
    }

    public useHooks = () =>{
        const {notification}=this.props;

        const { addToast } = useToasts();

        addToast(notification, { appearance: 'info', autoDismiss: true });

        addToast(notification, { appearance: 'success', autoDismiss: true });

        addToast(notification, { appearance: 'error', autoDismiss: true });

        addToast('Connected to Server!', { appearance: 'success', autoDismiss: true });

        addToast(notification, { appearance: 'info', autoDismiss: true });

        addToast('Compiled Successfully!', { appearance: 'success', autoDismiss: true });

        addToast(`Compile Error: ${notification}`, { appearance: 'error', autoDismiss: true }),

        addToast(notification, { appearance: 'info', autoDismiss: true });

        addToast(notification, { appearance: 'error', autoDismiss: true });

        // addToast(result, { appearance: 'success', autoDismiss: true });
        // Have no Idea why result is being used
        // addToast(result, { appearance: 'error', autoDismiss: true });

        addToast('Match Executed Successfully!', { appearance: 'success', autoDismiss: true })

        addToast(notification, { appearance: 'info', autoDismiss: true });

        addToast(`Debug Run Error: ${notification}`, { appearance: 'error', autoDismiss: true }),

        addToast('Disconnected', { appearance: 'error', autoDismiss: true });
    }
}

