import { SOCKET_BASE_URL } from 'app/../config/config';
import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import * as React from 'react';
import * as io from 'socket.io-client';

export class SocketHandler extends React.Component<SocketHandlerInterfaces.Props, {}> {
  private socket: SocketIOClient.Socket;
  constructor(props: SocketHandlerInterfaces.Props) {
    super(props);
    this.socket = new SockJsClient(`${SOCKET_BASE_URL}connect`);
    this.stompClient = Stomp.over(this.socket);
    // @ts-ignore
    this.stompClient.connect(
      {},
      // @ts-ignore
      (frame) => {
        const { userId } = this.props;
        // @ts-ignore
        this.stompClient.subscribe(
          `/socket/response/alert/${userId}`,
          (message: { body: string }) => {
            // tslint:disable-next-line:no-console
            console.log(`Received message: ${message.body}`);
          },
        );
        // @ts-ignore
        this.stompClient.subscribe(
          `/socket/response/match/${userId}`,
          (message: { body: string }) => {
            if (message.body[0] === 'E') {
              this.props.error('Match not executed successfully');
              // @ts-ignore
              this.props.clearAllLogs();
              this.props.clearDisplayDebugLog();
              this.props.updateDisplayDebugLog(message.body);
              return;
            }

            this.props.success('Match executed successfully');

            const matchDetails = {
              matchPlayerId: '',
              // tslint:disable-next-line: object-literal-sort-keys
              gameLog: '',
              debugLog1: '',
              debugLog2: '',
            };
            Object.keys(matchDetails).forEach((key, index) => {
              // @ts-ignore
              matchDetails[key] = message.body.slice(10, message.body.length - 1).split(', ')[
                index
              ];
              if (index !== 0) {
                // @ts-ignore
                matchDetails[key] = Buffer.from(matchDetails[key], 'base64');
              }
            });

            const {
              updateGameLog,
              updateMatchPlayerId,
              // tslint:disable-next-line: no-shadowed-variable
              userId,
              clearDisplayDebugLog,
              clearAllLogs,
            } = this.props;
            const matchPlayerId = parseInt(matchDetails.matchPlayerId, 10);
            // tslint:disable-next-line: no-console
            console.log(matchDetails, matchPlayerId, userId);

            clearDisplayDebugLog();
            clearAllLogs();
            updateGameLog('', '', '');
            updateGameLog(matchDetails.debugLog1, matchDetails.debugLog2, matchDetails.gameLog);
            updateMatchPlayerId(matchPlayerId === userId ? 1 : 2);
          },
        );
      },
      // @ts-ignore
      (frame) => {
        // tslint:disable-next-line: no-console
        console.log('Error Callback console log', frame);
      },
    );
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
      '/socket/request/match',
      {},
      JSON.stringify({
        commitHash,
        mapId,
        matchMode,
        playerId1,
        playerId2,
      }),
    );
  }

  public componentDidUpdate() {
    const {
      request,
      mapId,
      playerId2,
      commitHash,
      currentAiId,
      updateRequest,
      userId,
    } = this.props;
    switch (request) {
      case SubmissionInterfaces.Request.PREVIOUS_COMMIT_MATCH: {
        // tslint:disable-next-line: no-console
        console.log('INITIATING MATCH:PREVIOUS_COMMIT_MATCH');
        this.initiateMatch(
          userId,
          userId,
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
          userId,
          playerId2,
          SubmissionInterfaces.Request.MANUAL,
          mapId,
          commitHash,
        );
        updateRequest(SubmissionInterfaces.Request.NONE);
        break;
      }
      case SubmissionInterfaces.Request.MANUAL: {
        this.initiateMatch(
          playerId1,
          playerId2,
          SubmissionInterfaces.Request.MANUAL,
          mapId,
          commitHash,
        );
        updateRequest(SubmissionInterfaces.Request.NONE);
      }
    }
  }

  public componentWillUnmount(): void {
    // @ts-ignore
    // this.stompClient.disconnect();
  }

  public render() {
    return null;
  }
}
