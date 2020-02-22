import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import { action } from 'typesafe-actions';
export namespace LeaderboardActions {
  export enum Type {
    UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS',
    GET_LEADERBOARD = 'GET_LEADERBOARD',
    GET_LEADERBOARD_BY_DIV = 'GET_LEADERBOARD_BY_DIV',
    GET_LEADERBOARD_BY_USER_TYPE = 'GET_LEADERBOARD_BY_USER_TYPE',
    GET_LEADERBOARD_BY_DIV_AND_TYPE = 'GET_LEADERBOARD_BY_DIV_AND_TYPE',
    GET_LEADERBOARD_BY_USERNAME = 'GET_LEADERBOARD_BY_USERNAME',
    UPDATE_ERROR = 'UPDATE_ERROR',
    UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD',
    TOGGLE_USER_PROFILE_MODAL = 'TOGGLE_USER_PROFILE_MODAL',
    RESET_LEADERBOARD_STATE = 'RESET_LEADERBOARD_STATE',
    GET_TIMER = 'GET_TIMER',
    SET_TIMER = 'SET_TIMER',
    START_MATCH = 'START_MATCH',
  }

  export enum colors {
    GOLD = '',
    SILVER = '#C0C0C0',
    BRONZE = '#cd7f32',
  }

  export enum updateType {
    APPEND = 'APPEND',
    REPLACE = 'REPLACE',
  }

  export const MAX_RATING = 4000;

  export const FETCH_SIZE = 100;

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

  export const getLeaderboard = (pageNo: number, pageSize: number) => {
    return action(Type.GET_LEADERBOARD, {
      pageNo,
      pageSize,
    });
  };

  export const getLeaderboardByDiv = (
    div: LeaderboardInterfaces.DivisionType,
    pageNo: number,
    pageSize: number,
  ) => {
    return action(Type.GET_LEADERBOARD_BY_DIV, {
      div,
      pageNo,
      pageSize,
    });
  };

  export const getLeaderboardByUserType = (
    userType: LeaderboardInterfaces.UserType,
    pageNo: number,
    pageSize: number,
  ) => {
    return action(Type.GET_LEADERBOARD_BY_USER_TYPE, {
      pageNo,
      pageSize,
      userType,
    });
  };

  export const getLeaderboardByDivAndType = (
    div: LeaderboardInterfaces.DivisionType,
    pageNo: number,
    pageSize: number,
    userType: LeaderboardInterfaces.UserType,
  ) => {
    return action(Type.GET_LEADERBOARD_BY_DIV_AND_TYPE, {
      div,
      pageNo,
      pageSize,
      userType,
    });
  };

  export const getLeaderboardByUserName = (username: string, pageNo: number, pageSize: number) => {
    return action(Type.GET_LEADERBOARD_BY_USERNAME, {
      pageNo,
      pageSize,
      username,
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
