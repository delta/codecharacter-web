import { action } from 'typesafe-actions';

export namespace GameLogActions {
  export enum Type {
    UPDATE_GAME_LOGS = 'UPDATE_GAME_LOGS',
    RESET_GAME_LOG_STATE = 'RESET_GAME_LOG_STATE',
    UPDATE_DISPLAY_DEBUG_LOG = 'UPDATE_DISPLAY_DEBUG_LOG',
    CLEAR_DISPLAY_DEBUG_LOG = 'CLEAR_DISPLAY_DEBUG_LOG',
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

  export const resetGameLogState = () => action(Type.RESET_GAME_LOG_STATE);

  export const updateDisplayDebugLog = (log: string) =>
    action(Type.UPDATE_DISPLAY_DEBUG_LOG, { log });

  export const clearDisplayDebugLog = () => action(Type.CLEAR_DISPLAY_DEBUG_LOG);
}
