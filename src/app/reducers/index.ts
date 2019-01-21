import { editorReducer, EditorStoreState } from 'app/reducers/code/Editor';
import { gameLogReducer, GameLogStoreState } from 'app/reducers/code/GameLog';
import { dashboardReducer, DashboardStoreState } from 'app/reducers/Dashboard';
import { userReducer, UserStoreState } from 'app/reducers/User';
import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  editor: editorReducer,
  gameLog: gameLogReducer,
  router: routerReducer,
  user: userReducer,
});

export interface RootState {
  dashboard: DashboardStoreState;
  editor: EditorStoreState;
  router: RouterState;
  gameLog: GameLogStoreState;
  user: UserStoreState;
}
