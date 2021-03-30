import SocketHandler from 'app/containers/SocketHandler';
import * as React from 'react';

export class SocketHandlerWrapper extends React.Component<{ isLoggedIn: boolean }> {
  public render() {
    return this.props.isLoggedIn ? <SocketHandler /> : null;
  }
}
