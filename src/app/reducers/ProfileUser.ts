import { ProfileUserActions } from 'app/actions';
import * as ProfileUserInterfaces from 'app/types/ProfileUser';

const profileStoreIntialState: ProfileUserInterfaces.ProfileUserStoreState = {
  avatar: '',
  college: '',
  country: 'IN',
  email: '',
  fullName: '',
  matchStats: {
    auto: { wins: 0, losses: 0, ties: 0 },
    faced: { wins: 0, losses: 0, ties: 0 },
    initiated: { wins: 0, losses: 0, ties: 0 },
    lastMatchAt: '',
    numMatchches: 0,
    userId: 0,
  },
  type: '',
  userType: ProfileUserInterfaces.ProfileUserType.STUDENT,
  username: '',
};

export const profileuserReducer = (
  state = profileStoreIntialState,
  action: ProfileUserInterfaces.ProfileUserStoreAction,
) => {
  switch (action.type) {
    case ProfileUserActions.Type.UPDATE_PROFILE_USER_DETAILS: {
      const {
        avatar,
        college,
        country,
        email,
        fullName,
        userType,
        username,
      } = action.payload.profileuserDetails;

      return {
        ...state,
        avatar: avatar !== undefined ? avatar : state.avatar,
        college: college !== undefined ? college : state.college,
        country: country !== undefined ? country : state.country,
        email: email !== undefined ? email : state.email,
        fullName: fullName !== undefined ? fullName : state.fullName,
        type: userType !== undefined ? userType : state.type,
        username: username !== undefined ? username : state.username,
      };
    }

    case ProfileUserActions.Type.UPDATE_MATCH_STATS: {
      return {
        ...state,
        matchStats: action.payload.matchStats,
      };
    }

    default:
      return state;
  }
};
