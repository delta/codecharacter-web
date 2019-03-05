import { SOCKET_BASE_URL } from 'app/../config/config';
import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import * as React from 'react';
import * as io from 'socket.io-client';

export class SocketHandler extends React.Component<SocketHandlerInterfaces.Props, {}> {
  private socket: SocketIOClient.Socket;
  constructor(props: SocketHandlerInterfaces.Props) {
    super(props);
    this.socket = io.connect(
      SOCKET_BASE_URL,
      {
        reconnection: true,
        reconnectionDelay: 1000,
        transports: ['websocket'],
      },
    );
  }

  public componentDidMount() {
    const {
      sendCompileError,
      sendCompileSuccess,
      sendExecuteError,
      sendExecuteSuccess,
      sendInfo,
      sendSuccess,
      sendError,
      sendDebugRunSuccess,
      sendDebugRunError,
    } = this.props;

    this.socket.on('Info', (message: string) => {
      sendInfo(message);
    });

    this.socket.on('Success', (message: string) => {
      sendSuccess(message);
    });

    this.socket.on('Error', (message: string) => {
      sendError(message);
    });

    this.socket.on('connect', () => {
      sendSuccess('Connected to Server!');
    });

    this.socket.on('Compile Info', (message: string) => {
      sendInfo(message);
    });

    this.socket.on('Compile Success', () => {
      sendSuccess('Compiled Successfully!');
      sendCompileSuccess();
    });

    this.socket.on('Compile Error', (message: string) => {
      sendError(`Compile Error: ${message}`);
      sendCompileError('');
    });

    this.socket.on('Compile Error Log', (log: string) => {
      sendError('Compile Error');
      sendCompileError(log);
    });

    this.socket.on('Match Info', (message: string) => {
      sendInfo(message);
    });

    this.socket.on('Match Error', (message: string) => {
      sendError(message);
      sendExecuteError(message);
    });

    this.socket.on('Match Result Success', (result: string) => {
      sendSuccess(result);
    });

    this.socket.on('Match Result Error', (result: string) => {
      sendError(result);
    });

    this.socket.on('Match Success', (matchLogs: string) => {
      sendSuccess('Match Executed Successfully!');
      sendExecuteSuccess(matchLogs);
    });

    this.socket.on('Debug Run Info', (message: string) => {
      sendInfo(message);
    });

    this.socket.on('Debug Run Success', (stackTrace: string) => {
      sendDebugRunSuccess(stackTrace);
    });

    this.socket.on('Debug Run Error', (message: string) => {
      sendError(`Debug Run Error: ${message}`);
      sendDebugRunError();
    });

    this.socket.on('disconnect', () => {
      sendError('Disconnected');
    });
  }

  public componentWillUnmount() {
    this.socket.disconnect();
  }

  public render() {
    return null;
  }
}
