import { action } from 'typesafe-actions';

export namespace LeaderboardActions {
  export interface Player {
    country: string;
    id: number;
    name: string;
    rating: number;
  }

  export enum Type {
    GET_PLAYERS_DATA = 'GET_PLAYERS_DATA',
    UPDATE_ERROR = 'UPDATE_ERROR',
    UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD',
  }

  export const MAX_RATING = 4000;

  export interface LeaderboardDataType {
    loading: boolean;
    players: Player[];
  }

  export const updateLeaderboard = (leaderboardData: LeaderboardDataType) => {
    return action(Type.UPDATE_LEADERBOARD, leaderboardData);
  };

  export const updateError = (err: string) => {
    return action(Type.UPDATE_ERROR, err);
  };

  export const getPlayersData = () => {
    try {
      /* Implement async action using redux-saga for fetching data */
      /* Sample data */
      const data = {
        loading: false,
        players: [{ id: 1, name: 'Mutko', rating: 1, country: 'ru' }],
      };
      return updateLeaderboard(data);
    } catch (e) {
      return updateError(e);
    }
  };
}
