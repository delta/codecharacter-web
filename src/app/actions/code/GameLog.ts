import { action } from 'typesafe-actions';

export namespace GameLogActions {
  export enum Type {
    FETCH_GAME_LOG = 'FETCH_GAME_LOG',
    UPDATE_GAME_LOG = 'UPDATE_GAME_LOG',
  }

  export const fetchGameLog = (gameLog: string) =>
    action(Type.FETCH_GAME_LOG, {
      gameLog,
    });

  export const updateGameLog = (gameLog: string) =>
    action(Type.UPDATE_GAME_LOG, {
      gameLog,
    });
}
