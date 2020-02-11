import { SOCKET_BASE_URL } from 'app/../config/config';
import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import * as React from 'react';
import { useToasts } from 'react-toast-notifications';
import * as io from 'socket.io-client';

// tslint:disable-next-line: variable-name
export const SocketHandler = (props: SocketHandlerInterfaces.Props) => {
  const { addToast } = useToasts();
  const socket: SocketIOClient.Socket = io.connect(SOCKET_BASE_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    transports: ['websocket'],
  });

  React.useEffect(() => {
    const {
      sendCompileError,
      sendCompileSuccess,
      sendExecuteError,
      sendExecuteSuccess,
      sendDebugRunSuccess,
      sendDebugRunError,
    } = props;

    socket.on('Info', (message: string) => {
      addToast(message, { appearance: 'info', autoDismiss: true });
    });

    socket.on('Success', (message: string) => {
      addToast(message, { appearance: 'success', autoDismiss: true });
    });

    socket.on('Error', (message: string) => {
      addToast(message, { appearance: 'error', autoDismiss: true });
    });

    socket.on('connect', () => {
      addToast('Connected to Server!', { appearance: 'success', autoDismiss: true });
    });

    socket.on('Compile Info', (message: string) => {
      addToast(message, { appearance: 'info', autoDismiss: true });
    });

    socket.on('Compile Success', () => {
      addToast('Compiled Successfully!', { appearance: 'success', autoDismiss: true });
      sendCompileSuccess();
    });

    socket.on('Compile Error', (message: string) => {
      addToast(`Compile Error: ${message}`, { appearance: 'error', autoDismiss: true }),
        sendCompileError('');
    });

    socket.on('Compile Error Log', (log: string) => {
      addToast('Compile Error', { appearance: 'error', autoDismiss: true }), sendCompileError(log);
    });

    socket.on('Match Info', (message: string) => {
      addToast(message, { appearance: 'info', autoDismiss: true });
    });

    socket.on('Match Error', (message: string) => {
      addToast(message, { appearance: 'error', autoDismiss: true }), sendExecuteError(message);
    });

    socket.on('Match Result Success', (result: string) => {
      addToast(result, { appearance: 'success', autoDismiss: true });
    });

    socket.on('Match Result Error', (result: string) => {
      addToast(result, { appearance: 'error', autoDismiss: true });
    });

    socket.on('Match Success', (matchLogs: string) => {
      addToast('Match Executed Successfully!', { appearance: 'success', autoDismiss: true });
      sendExecuteSuccess(matchLogs);
    });

    socket.on('Debug Run Info', (message: string) => {
      addToast(message, { appearance: 'info', autoDismiss: true });
    });

    socket.on('Debug Run Success', (stackTrace: string) => {
      sendDebugRunSuccess(stackTrace);
    });

    socket.on('Debug Run Error', (message: string) => {
      addToast(`Debug Run Error: ${message}`, { appearance: 'error', autoDismiss: true }),
        sendDebugRunError();
    });

    socket.on('disconnect', () => {
      addToast('Disconnected', { appearance: 'error', autoDismiss: true });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};
