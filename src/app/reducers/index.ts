import { editorReducer, EditorStoreState } from 'app/reducers/code/Editor';
import { gameLogReducer, GameLogStoreState } from 'app/reducers/code/GameLog';
import { dashboardReducer, DashboardStoreState } from 'app/reducers/Dashboard';
import { leaderboardReducer, LeaderboardStoreState } from 'app/reducers/Leaderboard';
import { userReducer, UserStoreState } from 'app/reducers/User';
import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  editor: editorReducer,
  gameLog: gameLogReducer,
  leaderboard: leaderboardReducer,
  router: routerReducer,
  user: userReducer,
});

export interface RootState {
  dashboard: DashboardStoreState;
  editor: EditorStoreState;
  leaderboard: LeaderboardStoreState;
  router: RouterState;
  gameLog: GameLogStoreState;
  user: UserStoreState;
}
