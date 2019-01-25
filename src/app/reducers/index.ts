import { editorReducer } from 'app/reducers/code/Editor';
import { gameLogReducer } from 'app/reducers/code/GameLog';
import { dashboardReducer } from 'app/reducers/Dashboard';
import { leaderboardReducer } from 'app/reducers/Leaderboard';
import { userReducer } from 'app/reducers/User';
import * as EditorInterfaces from 'app/types/code/Editor';
import * as DashboardInterfaces from 'app/types/Dashboard';
import * as GameLogInterfaces from 'app/types/GameLog';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import * as UserInterfaces from 'app/types/User';
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
  dashboard: DashboardInterfaces.DashboardStoreState;
  editor: EditorInterfaces.EditorStoreState;
  leaderboard: LeaderboardInterfaces.LeaderboardStoreState;
  router: RouterState;
  gameLog: GameLogInterfaces.GameLogStoreState;
  user: UserInterfaces.UserStoreState;
}
