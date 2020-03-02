import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import * as React from 'react';

// tslint:disable-next-line:import-name
import { Stomp } from '@stomp/stompjs';
// tslint:disable-next-line:import-name
import SockJsClient from 'sockjs-client';
import { SOCKET_BASE_URL } from '../../config/config';

export class SocketHandler extends React.Component<SocketHandlerInterfaces.Props, {}> {
  private readonly socket: WebSocket;
  private stompClient : Stomp;

  constructor(props: SocketHandlerInterfaces.Props) {
    super(props);
    this.socket = new SockJsClient(`${SOCKET_BASE_URL}`);
    this.stompClient = Stomp.over(this.socket);
    // @ts-ignore
    this.stompClient.connect({}, (frame) => {
      // TODO: Change to user's actual id
      const userId = 4;
      // @ts-ignore
      this.stompClient.subscribe(`/response/${userId}`, (message: { body: string; }) => {
        // tslint:disable-next-line:no-console
        console.log(`Received message: ${message.body}`);
      });
    });
  }

  public initiateMatch(playerId1: number, playerId2: number, matchMode: string, mapId: number): void {
    // @ts-ignore
    this.stompClient.send('/request/match', {}, JSON.stringify({
      'matchMode': matchMode,
      'playerId1': playerId1,
      'playerId2': playerId2
    }));
  }

  public componentWillUnmount(): void {
    // @ts-ignore
    this.stompClient.disconnect();
  }

  public render() {
    return null;
  }
}
