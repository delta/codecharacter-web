import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import { action } from 'typesafe-actions';
export namespace LeaderboardActions {
  export enum Type {
    UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS',
    GET_LEADERBOARD = 'GET_LEADERBOARD',
    UPDATE_ERROR = 'UPDATE_ERROR',
    UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD',
    TOGGLE_USER_PROFILE_MODAL = 'TOGGLE_USER_PROFILE_MODAL',
    RESET_LEADERBOARD_STATE = 'RESET_LEADERBOARD_STATE',
    GET_TIMER = 'GET_TIMER',
    SET_TIMER = 'SET_TIMER',
    START_MATCH = 'START_MATCH',
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

  export const toggleUserProfileModal = (isUserProfileModalOpen: boolean) => {
    return action(Type.TOGGLE_USER_PROFILE_MODAL, {
      isUserProfileModalOpen,
    });
  };

  export const resetLeaderboardState = () => action(Type.RESET_LEADERBOARD_STATE);
  export const getTimer = () => {
    return action(Type.GET_TIMER);
  };

  export const setTimer = (timerData: number) => {
    return action(Type.SET_TIMER, {
      timerData,
    });
  };

  export const runMatch = (opponentId: number) => {
    return action(Type.START_MATCH, {
      opponentId,
    });
  };
}
