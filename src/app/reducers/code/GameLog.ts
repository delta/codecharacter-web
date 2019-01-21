import { GameLogActions } from 'app/actions';
import { ActionType } from 'typesafe-actions';

const actions = {
  updateGameLog: GameLogActions.updateGameLog,
};

export interface GameLogStoreState {
  value: string;
}

export type GameLogStoreAction = ActionType<typeof actions>;

const gameLogStoreIntialState: GameLogStoreState = {
  value: '/* Game logs */',
};

export const gameLogReducer = (state = gameLogStoreIntialState, action: GameLogStoreAction) => {
  switch (action.type) {
    case GameLogActions.Type.UPDATE_GAME_LOG: {
      return {
        ...state,
        logCode: action.payload.gameLog,
      };
    }
    default:
      return state;
  }
};