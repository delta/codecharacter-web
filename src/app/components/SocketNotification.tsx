import 'app/styles/ReactToastNotifications.css';
import { useToasts } from 'react-toast-notifications';

let message=''
let result=''
const { addToast } = useToasts();

addToast(message, { appearance: 'info', autoDismiss: true });

addToast(message, { appearance: 'success', autoDismiss: true });

addToast(message, { appearance: 'error', autoDismiss: true });

addToast('Connected to Server!', { appearance: 'success', autoDismiss: true });

addToast(message, { appearance: 'info', autoDismiss: true });

addToast('Compiled Successfully!', { appearance: 'success', autoDismiss: true });

addToast(`Compile Error: ${message}`, { appearance: 'error', autoDismiss: true }),

addToast(message, { appearance: 'info', autoDismiss: true });

addToast(message, { appearance: 'error', autoDismiss: true });

addToast(result, { appearance: 'success', autoDismiss: true });

addToast(result, { appearance: 'error', autoDismiss: true });

addToast('Match Executed Successfully!', { appearance: 'success', autoDismiss: true })

addToast(message, { appearance: 'info', autoDismiss: true });

addToast(`Debug Run Error: ${message}`, { appearance: 'error', autoDismiss: true }),

addToast('Disconnected', { appearance: 'error', autoDismiss: true });

