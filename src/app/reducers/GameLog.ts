import { GameLogActions } from 'app/actions';
import * as GameLogInterfaces from 'app/types/GameLog';

const gameLogStoreIntialState: GameLogInterfaces.GameLogStoreState = {
  displayDebugLog: '',
  gameLog: '',
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
      }
    }
    case GameLogActions.Type.UPDATE_DISPLAY_DEBUG_LOG: {
      return {
        ...state,
        displayDebugLog: `${state.displayDebugLog}${action.payload.log}`,
      };
    }
    case GameLogActions.Type.CLEAR_DISPLAY_DEBUG_LOG: {
      return {
        ...state,
        displayDebugLog: '',
      };
    }
    default:
      return state;
  }
};
