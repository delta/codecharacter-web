import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import * as React from 'react';

// tslint:disable-next-line:import-name
import { Stomp } from '@stomp/stompjs';
import * as SubmissionInterfaces from 'app/types/code/Submission';
// tslint:disable-next-line:import-name
import SockJsClient from 'sockjs-client';
import { SOCKET_BASE_URL } from '../../config/config';

export class SocketHandler extends React.Component<SocketHandlerInterfaces.Props, {}> {
  private readonly socket: WebSocket;
  private stompClient: Stomp;

  constructor(props: SocketHandlerInterfaces.Props) {
    super(props);
    this.socket = new SockJsClient(`${SOCKET_BASE_URL}socket`);
    this.stompClient = Stomp.over(this.socket);
    // @ts-ignore
    this.stompClient.connect({}, (frame) => {
      // TODO: Change to user's actual id
      const userId = 13;
      // @ts-ignore
      this.stompClient.subscribe(`/response/alert/${userId}`, (message: { body: string }) => {
        // tslint:disable-next-line:no-console
        console.log(`Received message: ${message.body}`);
      });
      // @ts-ignore
      this.stompClient.subscribe(`/response/match/${userId}`, (message: { body: string }) => {
        // @ts-ignore
        // tslint:disable-next-line: no-console
        console.log('Received match object', message.body);
        const { updateGameLog, updateMatchPlayerId } = this.props;
        const { debugLog1, debugLog2, gameLog, matchPlayerId } = JSON.parse(message.body);

        updateGameLog('', '', '');
        updateGameLog(debugLog1, debugLog2, gameLog);
        updateMatchPlayerId(matchPlayerId);
      });
    });
  }

  public initiateMatch(
    playerId1: number,
    playerId2: number,
    matchMode: string,
    mapId: number,
    commitHash: string,
  ): void {
    // tslint:disable-next-line: no-console
    console.log({
      mapId,
      matchMode,
      playerId1,
      playerId2,
    });
    // @ts-ignore
    this.stompClient.send(
      '/request/match',
      {},
      JSON.stringify({
        mapId: 1,
        matchMode : 'SELF',
        playerId1: 13,
        playerId2: 13,
      }),
    );
  }

  public componentWillUpdate() {
    // tslint:disable-next-line: no-console
    const { request, mapId, playerId1, playerId2, commitHash } = this.props;
    switch (request) {
      case SubmissionInterfaces.Request.PREVIOUS_COMMIT_MATCH: {
        // tslint:disable-next-line: no-console
        console.log('HELLO');
        this.initiateMatch(
          playerId1,
          playerId2,
          SubmissionInterfaces.Request.PREVIOUS_COMMIT_MATCH,
          mapId,
          commitHash,
        );
        break;
      }
    }
  }

  public componentWillUnmount(): void {
    // @ts-ignore
    this.stompClient.disconnect();
  }

  public render() {
    return null;
  }
}
