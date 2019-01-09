import { editorReducer, EditorStoreState } from 'app/reducers/code/Editor';
import { gameLogReducer, GameLogStoreState } from 'app/reducers/code/GameLog';
import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

// tslint:disable-next-line
export const rootReducer = combineReducers({
  editor: editorReducer,
  log: gameLogReducer,
  router: routerReducer,
});

export interface RootState {
  editor: EditorStoreState;
  router: RouterState;
  log: GameLogStoreState;
}
