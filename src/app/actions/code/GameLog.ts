import { action } from 'typesafe-actions';

export namespace GameLogActions {
  export enum Type {
    UPDATE_GAME_LOG = 'UPDATE_GAME_LOG',
  }

  export const updateGameLog = (gameLog: string) =>
    action(Type.UPDATE_GAME_LOG, {
      gameLog,
    });
}
