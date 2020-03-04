import { SOCKET_BASE_URL } from 'app/../config/config';
import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import * as React from 'react';
import * as io from 'socket.io-client';

export class SocketHandler extends React.Component<SocketHandlerInterfaces.Props, {}> {
  private socket: SocketIOClient.Socket;
  constructor(props: SocketHandlerInterfaces.Props) {
    super(props);
    this.socket = io.connect(SOCKET_BASE_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      transports: ['websocket'],
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
    console.log(`MAP ID:${mapId}, MATCH_MODE:${matchMode}`);
    // @ts-ignore
    this.stompClient.send(
      '/request/match',
      {},
      JSON.stringify({
        matchMode,
        playerId1,
        playerId2,
      }),
    );
  }

  public componentDidUpdate() {
    // tslint:disable-next-line: no-console
    const { request, mapId, playerId1, playerId2, commitHash, updateRequest } = this.props;
    switch (request) {
      case SubmissionInterfaces.Request.PREVIOUS_COMMIT_MATCH: {
        // tslint:disable-next-line: no-console
        console.log('INITIATING MATCH:PREVIOUS_COMMIT_MATCH');
        this.initiateMatch(
          playerId1,
          playerId2,
          SubmissionInterfaces.Request.PREVIOUS_COMMIT_MATCH,
          mapId,
          commitHash,
        );
        updateRequest(SubmissionInterfaces.Request.NONE);
        break;
      }
      case SubmissionInterfaces.Request.AI_MATCH: {
        // tslint:disable-next-line: no-console
        console.log('INITIATING MATCH:AI_MATCH');
        this.initiateMatch(
          playerId1,
          playerId2,
          SubmissionInterfaces.Request.AI_MATCH,
          mapId,
          commitHash,
        );
        updateRequest(SubmissionInterfaces.Request.NONE);
        break;
      }
      case SubmissionInterfaces.Request.SELF_MATCH: {
        // tslint:disable-next-line: no-console
        console.log('INITIATING MATCH:SELF_MATCH');
        this.initiateMatch(
          playerId1,
          playerId2,
          SubmissionInterfaces.Request.SELF_MATCH,
          mapId,
          commitHash,
        );
        updateRequest(SubmissionInterfaces.Request.NONE);
        break;
      }
    }
  }

  public componentWillUnmount() {
    this.socket.disconnect();
  }

  public render() {
    return null;
  }
}
