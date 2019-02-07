import { API_BASE_URL } from 'app/../config/config';
import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import * as React from 'react';
import { connect } from 'socket.io-client';

export class SocketHandler extends React.Component<SocketHandlerInterfaces.Props, {}> {
  public componentDidMount() {
    const socket = connect(API_BASE_URL);

    socket.on('Info', (message: string) => {
      this.props.sendInfo(message);
    });

    socket.on('Success', (message: string) => {
      this.props.sendSuccess(message);
    });

    socket.on('Error', (message: string) => {
      this.props.sendError(message);
    });
  }

  public render() {
    return null;
  }
}
