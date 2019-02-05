import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import { action } from 'typesafe-actions';
export namespace LeaderboardActions {
  export enum Type {
    UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS',
    GET_LEADERBOARD = 'GET_LEADERBOARD',
    UPDATE_ERROR = 'UPDATE_ERROR',
    UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD',
  }

  export enum updateType {
    APPEND = 'APPEND',
    REPLACE = 'REPLACE',
  }

  export const MAX_RATING = 4000;

  export const FETCH_SIZE = 10;

  export const updateLoadingStatus = (loadingStatus: boolean) => {
    return action(Type.UPDATE_LOADING_STATUS, { loadingStatus });
  };

  export const updateLeaderboard = (
    leaderboardData: LeaderboardInterfaces.Player[],
    type: updateType,
  ) => {
    return action(Type.UPDATE_LEADERBOARD, { leaderboardData, type });
  };

  export const updateError = (err: string) => {
    return action(Type.UPDATE_ERROR, err);
  };

  export const getLeaderboard = (pattern: string, start: number) => {
    return action(Type.GET_LEADERBOARD, {
      pattern,
      start,
      end: start + FETCH_SIZE - 1,
    });
  };
}
