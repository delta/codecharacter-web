import { action } from 'typesafe-actions';

export namespace GameLogActions {
  export enum Type {
    UPDATE_GAME_LOGS = 'UPDATE_GAME_LOGS',
  }

  export const updateGameLog = (
    player1DebugLog: string,
    player2DebugLog: string,
    gameLog: string,
  ) =>
    action(Type.UPDATE_GAME_LOGS, {
      gameLog,
      player1DebugLog,
      player2DebugLog,
    });
}
