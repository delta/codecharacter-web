import * as ProfileInterfaces from 'app/types/ProfileUser';
import * as UserInterfaces from 'app/types/User';
import { action } from 'typesafe-actions';

export namespace ProfileUserActions {
  export enum Type {
    GET_PROFILE_USER_DETAILS = 'GET_USER_DETAILS',
    GET_MATCH_STATS = 'GET_MATCH_STATS',
    UPDATE_PROFILE_USER_DETAILS = 'UPDATE_PROFILE_USER_DETAILS',
    UPDATE_MATCH_STATS = 'UPDATE_MATCH_STATS',
  }

  interface ProfileUserDetails {
    avatar?: string;
    college?: string;
    userType?: UserInterfaces.UserType;
    fullName?: string;
    username?: string;
    email?: string;
    country?: string;
  }

  export const updateProfileUserDetails = (profileuserDetails: ProfileUserDetails) =>
    action(Type.UPDATE_PROFILE_USER_DETAILS, { profileuserDetails });

  export const getUserDetails = (username: string) =>
    action(Type.GET_PROFILE_USER_DETAILS, { username });

  export const updateMatchStats = (matchStats: ProfileInterfaces.ProfileMatchStats) =>
    action(Type.UPDATE_MATCH_STATS, { matchStats });

  export const getMatchStats = (username: string) => action(Type.GET_MATCH_STATS, { username });
}
