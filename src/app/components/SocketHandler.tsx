import * as SocketHandlerInterfaces from 'app/types/SocketHandler';
import * as React from 'react';

// tslint:disable-next-line:import-name
import { Stomp } from '@stomp/stompjs';
import * as SubmissionInterfaces from 'app/types/code/Submission';
import { Buffer } from 'buffer';
// tslint:disable-next-line:import-name
import SockJsClient from 'sockjs-client';
import { SOCKET_BASE_URL } from '../../config/config';

export class SocketHandler extends React.Component<SocketHandlerInterfaces.Props, {}> {
  private readonly socket: WebSocket;
  private stompClient: Stomp;

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
            const { info } = this.props;
            info(message.body);
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
        console.log('Socker connection error', frame);
      },
      // tslint:disable-next-line
      (closeEvent: any) => {
        this.props.resetUserState();
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
    this.props.clearAllLogs();
    this.props.clearDisplayDebugLog();
    this.props.updateDisplayDebugLog('');
    this.props.updateGameLog('', '', '');
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

  public lockCode(): void {
    // @ts-ignore
    this.stompClient.send('/socket/request/code/submit');
    this.props.toggleLockCode();
  }

  public componentDidUpdate() {
    // tslint:disable-next-line: no-console
    const {
      request,
      mapId,
      playerId2,
      commitHash,
      currentAiId,
      updateRequest,
      userId,
      isCodeLocked,
    } = this.props;
    switch (request) {
      case SubmissionInterfaces.Request.PREVIOUS_COMMIT_MATCH: {
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
        this.initiateMatch(
          userId,
          currentAiId,
          SubmissionInterfaces.Request.AI_MATCH,
          mapId,
          commitHash,
        );
        updateRequest(SubmissionInterfaces.Request.NONE);
        break;
      }
      case SubmissionInterfaces.Request.MANUAL: {
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
      case SubmissionInterfaces.Request.SELF_MATCH: {
        this.initiateMatch(
          userId,
          userId,
          SubmissionInterfaces.Request.SELF_MATCH,
          mapId,
          commitHash,
        );
        updateRequest(SubmissionInterfaces.Request.NONE);
        break;
      }
    }

    if (isCodeLocked) {
      this.lockCode();
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
