import { GameLogActions } from 'app/actions';
import * as GameLogInterfaces from 'app/types/GameLog';

const gameLogStoreIntialState: GameLogInterfaces.GameLogStoreState = {
  gameLog: '/* Game logs */',
  player1DebugLog: '',
  player2DebugLog: '',
};

export const gameLogReducer = (
  state = gameLogStoreIntialState,
  action: GameLogInterfaces.GameLogStoreAction,
) => {
  switch (action.type) {
    case GameLogActions.Type.UPDATE_GAME_LOGS: {
      return {
        ...state,
        gameLog: action.payload.gameLog,
        player1DebugLog: action.payload.player1DebugLog,
        player2DebugLog: action.payload.player2DebugLog,
      };
    }
    case GameLogActions.Type.RESET_GAME_LOG_STATE: {
      return {
        ...gameLogStoreIntialState,
      };
    }
    default:
      return state;
  }
};
