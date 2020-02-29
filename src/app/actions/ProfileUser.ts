import * as ProfileUserInterfaces from 'app/types/User';
import { action } from 'typesafe-actions';

export namespace ProfileUserActions {
  export enum Type {
    GET_PROFILE_USER_DETAILS = 'GET_USER_DETAILS',
    GET_MATCH_STATS = 'GET_MATCH_STATS',
    UPDATE_PROFILE_USER_DETAILS = 'UPDATE_PROFILE_USER_DETAILS',
  }

  interface ProfileUserDetails {
    avatar?: string;
    college?: string;
    userType?: ProfileUserInterfaces.UserType;
    fullName?: string;
    username?: string;
    email?: string;
    country?: string;
  }

  export const updateProfileUserDetails = (profileuserDetails: ProfileUserDetails) =>
    action(Type.UPDATE_PROFILE_USER_DETAILS, { profileuserDetails });

  export const getUserDetails = () => action(Type.GET_PROFILE_USER_DETAILS);

  export const getMatchStats = (username: string) => action(Type.GET_MATCH_STATS, { username });
}
