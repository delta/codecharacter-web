import * as SubmissionInterfaces from 'app/types/code/Submission';

export interface DispatchProps {
  sendExecuteError: (error: string) => void;
  sendExecuteSuccess: (logs: string) => void;
  sendCompileError: (error: string) => void;
  sendCompileSuccess: () => void;
  sendDebugRunError: () => void;
  sendDebugRunSuccess: (stackTrace: string) => void;
  sendError: (message: string) => void;
  sendInfo: (message: string) => void;
  sendSuccess: (message: string) => void;
  updateRequest: (request: SubmissionInterfaces.Request) => void;
  updateGameLog: (player1DebugLog: string, player2DebugLog: string, gameLog: string) => void;
  updateMatchPlayerId: (matchPlayerId: number) => void;
}

export enum MatchMode {
  AUTO = 'AUTO',
  SELF = 'SELF',
  AI = 'AI',
  PREV_COMMIT = 'PREV_COMMIT',
  MANUAL = 'MANUAL',
}

export interface MatchDetails {
  mapId: number;
  matchMode: MatchMode;
  playerId1: number;
  playerId2: number;
}

export interface StateProps {
  commitHash: string;
  mapId: number;
  playerId1: number;
  playerId2: number;
  request: SubmissionInterfaces.Request;
  userId: number;
}

export type Props = DispatchProps & StateProps;
