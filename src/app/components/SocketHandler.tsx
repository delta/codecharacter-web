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
        // tslint:disable-next-line:no-console
        console.log('Success call back console log', frame);
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
            // @ts-ignore
            // tslint:disable-next-line: no-console
            console.log('Received match object', message.body);

            const matchDetails = {
              matchPlayerId: '',
              // tslint:disable-next-line: object-literal-sort-keys
              gameLog: '',
              debugLog1: '',
              debugLog2: '',
            }
            Object.keys(matchDetails).forEach((key, index) => {
              // @ts-ignore
              matchDetails[key] = message.body.slice(10, (message.body.length - 1)).split(', ')[index];
              if (index !== 0) {
                // @ts-ignore
                matchDetails[key] = Buffer.from(matchDetails[key], 'base64');
              }
            })
            console.log(matchDetails);

            const { updateGameLog, updateMatchPlayerId } = this.props;

            // /**
            //  Received match object [GameLogs(isPlayer1=true, gameLog=H4sIAAAAAAAAA+zdd7CdV3pfabXVJA9BEpFA9w3I8YIEkUgAzPcw55xzzjlntkiCEcwRzDnnnDNIgO6Ry5aV7LFsyXLLmvHIlmXJnmBpCOwb3nN677VdrQ4Ma+aPuVXL81W5xj77/T1EjRvLfzD8Bz/+JxP+6IczVp/zkxf+7IeLfvLpH87uHbfTf2oM6Wj89sTfWvV//bste/r/mPNPdlj+g6/TD8tptXJavZzWKKdGOa1ZTkPKaa1yWruc1imnoeU0rJyGl9OIchpZTqPKad1yGl1OY0qpq/Gj4T9I8Seb9/b0/9Eff0yxg2InxS6K3RT 
            //  str.slice(1, (str.length -1)).split(', ')[1].split('=')[1]str.slice(1, (str.length -1)).split(', ')[1].split('=')[1]
            //  */
            // (new Buffer(data, 'base64')).toString('binary')

            // const { debugLog1, debugLog2, gameLog, matchPlayerId } = JSON.parse(message.body);
            

            updateGameLog('', '', '');
            updateGameLog(matchDetails.debugLog1, matchDetails.debugLog2, matchDetails.gameLog);
            updateMatchPlayerId(parseInt(matchDetails.matchPlayerId, 10));
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
    // @ts-ignore
    this.stompClient.send(
      '/request/match',
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
    // tslint:disable-next-line: no-console
    const { request, mapId, playerId1, playerId2, commitHash, updateRequest, userId } = this.props;
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

  public componentWillUnmount(): void {
    // @ts-ignore
    this.stompClient.disconnect();
  }

  public render() {
    return null;
  }
}
