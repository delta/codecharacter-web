import { API_BASE_URL } from 'app/../config/config';
import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import * as React from 'react';
import { connect } from 'socket.io-client';

export class SocketHandler extends React.Component<SocketHandlerInterfaces.Props, {}> {
  // tslint:disable-next-line
  public socket: any;

  public componentDidMount() {
    this.socket = connect(
      API_BASE_URL,
      {
        reconnection: true,
        reconnectionDelay: 1000,
      },
    );

    this.socket.on('Info', (message: string) => {
      this.props.sendInfo(message);
    });

    this.socket.on('Success', (message: string) => {
      this.props.sendSuccess(message);
    });

    this.socket.on('Error', (message: string) => {
      this.props.sendError(message);
    });

    this.socket.on('connect', () => {
      this.props.sendSuccess('Connected to Server!');
    });

    this.socket.on('disconnect', () => {
      this.props.sendError('Disconnected');
    });
  }

  public componentWillUnmount() {
    this.socket.disconnect();
  }

  public render() {
    return null;
  }
}
