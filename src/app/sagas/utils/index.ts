import { NotificationActions, UserActions } from 'app/actions';
import { avatarName } from 'app/types/Authentication/Register';
import * as MatchVewInterfaces from 'app/types/MatchView';
import { put } from 'redux-saga/effects';

export interface ResponseStructure {
  type: string | undefined;
  error: string | undefined;
}

export function* checkAuthentication(result: ResponseStructure) {
  if (result && result.error && result.error === 'Unauthorised') {
    yield put(
      UserActions.updateUserDetails({
        country: '',
        email: '',
        isLoggedIn: false,
        username: '',
      }),
    );
    yield put(UserActions.setIsAuthenticationOpen(true));
    return false;
  }
  return true;
}

export function* checkAccountActivated(result: ResponseStructure) {
  if (result && result.error && result.error === 'Email not activated') {
    yield put(
      NotificationActions.info('Your account has not been activated yet. Please check your email.'),
    );
    return false;
  }
  return true;
}

export const mapMatchResponse = (
  res: MatchVewInterfaces.RecievedMatch[],
  username: string,
): MatchVewInterfaces.Match[] => {
  return res.map((match: MatchVewInterfaces.RecievedMatch) => {
    return {
      avatar1: avatarName[match.avatar1],
      avatar2: avatarName[match.avatar2],
      games: match.games.map((game: MatchVewInterfaces.RecievedGame) => {
        return {
          id: game.id,
          mapId: game.mapId,
          verdict: getVerdict(game.verdict, username, match.username1, match.username2),
          winType: 'string',
        };
      }),
      match_mode: match.matchMode,
      playedAt: match.playedAt,
      score1: match.score1,
      score2: match.score2,
      username1: match.username1,
      username2: match.username2,
      verdict: getVerdict(match.verdict, username, match.username1, match.username2),
    };
  });
};

export enum VERDICT {
  TIE = 'TIE',
  PLAYER1 = 'PLAYER1',
  PLAYER2 = 'PLAYER2',
}

export enum MAP_VERDICT_TO_STRING {
  TIE = '0',
  WIN = '1',
  LOSE = '2',
}

const getVerdict = (
  verdict: string,
  loggedInUsername: string,
  player1: string,
  player2: string,
) => {
  switch (verdict) {
    case VERDICT.PLAYER1:
      if (loggedInUsername === player1) {
        return MAP_VERDICT_TO_STRING.WIN;
      }
      return MAP_VERDICT_TO_STRING.LOSE;
    case VERDICT.PLAYER2:
      if (loggedInUsername === player2) {
        return MAP_VERDICT_TO_STRING.WIN;
      }
      return MAP_VERDICT_TO_STRING.LOSE;
    case VERDICT.TIE:
      return MAP_VERDICT_TO_STRING.TIE;
    default:
      return MAP_VERDICT_TO_STRING.TIE;
  }
};
