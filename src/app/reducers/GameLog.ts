import { GameLogActions } from 'app/actions';
import * as GameLogInterfaces from 'app/types/GameLog';

const gameLogStoreIntialState: GameLogInterfaces.GameLogStoreState = {
  value: '/* Game logs */',
};

export const gameLogReducer = (
  state = gameLogStoreIntialState,
  action: GameLogInterfaces.GameLogStoreAction,
) => {
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
