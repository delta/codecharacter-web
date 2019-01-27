import { codeReducer } from 'app/reducers/code/Code';
import { editorReducer } from 'app/reducers/code/Editor';
import { dashboardReducer } from 'app/reducers/Dashboard';
import { gameLogReducer } from 'app/reducers/GameLog';
import { leaderboardReducer } from 'app/reducers/Leaderboard';
import { notificationReducer } from 'app/reducers/Notification';
import { userReducer } from 'app/reducers/User';
import * as CodeInterfaces from 'app/types/code/Code';
import * as EditorInterfaces from 'app/types/code/Editor';
import * as DashboardInterfaces from 'app/types/Dashboard';
import * as GameLogInterfaces from 'app/types/GameLog';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import * as UserInterfaces from 'app/types/User';
import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  code: codeReducer,
  dashboard: dashboardReducer,
  editor: editorReducer,
  gameLog: gameLogReducer,
  leaderboard: leaderboardReducer,
  notification: notificationReducer,
  router: routerReducer,
  user: userReducer,
});

export interface RootState {
  code: CodeInterfaces.CodeStoreState;
  dashboard: DashboardInterfaces.DashboardStoreState;
  editor: EditorInterfaces.EditorStoreState;
  leaderboard: LeaderboardInterfaces.LeaderboardStoreState;
  router: RouterState;
  gameLog: GameLogInterfaces.GameLogStoreState;
  user: UserInterfaces.UserStoreState;
}
