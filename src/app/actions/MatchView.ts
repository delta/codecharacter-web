import { Match } from 'app/types/MatchView';
import { action } from 'typesafe-actions';

export namespace MatchActions {
  export enum Type {
    GET_MATCHES = 'GET_MATCHES',
    GET_TOP_MATCHES = 'GET_TOP_MATCHES',
    VIEW_MATCH = 'VIEW_MATCH',
    UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS',
    UPDATE_ERROR = 'UPDATE_ERROR',
    UPDATE_MATCHES = 'UPDATE_MATCHES',
    UPDATE_TOP_MATCHES = 'UPDATE_TOP_MATCHES',
  }

  export const getMatches = () => action(Type.GET_MATCHES);

  export const getTopMatches = () => action(Type.GET_TOP_MATCHES);

  export const updateLoadingStatus = (loadingStatus: boolean) => {
    return action(Type.UPDATE_LOADING_STATUS, { loadingStatus });
  };

  export const updateMatches = (matchesData: Match[]) => {
    return action(Type.UPDATE_MATCHES, { matchesData });
  };

  export const updateTopMatches = (topMatchesData: Match[]) => {
    return action(Type.UPDATE_TOP_MATCHES, { topMatchesData });
  };

  export const updateError = (err: string) => {
    return action(Type.UPDATE_ERROR, err);
  };
}
