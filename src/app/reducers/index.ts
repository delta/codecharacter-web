import { codeReducer } from 'app/reducers/code/Code';
import { editorReducer } from 'app/reducers/code/Editor';
import { submissionReducer } from 'app/reducers/code/Submission';
import { dashboardReducer } from 'app/reducers/Dashboard';
import { gameLogReducer } from 'app/reducers/GameLog';
import { leaderboardReducer } from 'app/reducers/Leaderboard';
import { matchesReducer } from 'app/reducers/MatchView';
import { notificationReducer } from 'app/reducers/Notification';
import { userReducer } from 'app/reducers/User';
import * as CodeInterfaces from 'app/types/code/Code';
import * as EditorInterfaces from 'app/types/code/Editor';
import * as SubmissionInterfaces from 'app/types/code/Submission';
import * as DashboardInterfaces from 'app/types/Dashboard';
import * as GameLogInterfaces from 'app/types/GameLog';
import * as LeaderboardInterfaces from 'app/types/Leaderboard';
import * as MatchInterfaces from 'app/types/MatchView';
import * as NotificationInterfaces from 'app/types/Notification';
import * as UserInterfaces from 'app/types/User';
import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  code: codeReducer,
  dashboard: dashboardReducer,
  editor: editorReducer,
  gameLog: gameLogReducer,
  leaderboard: leaderboardReducer,
  match: matchesReducer,
  notification: notificationReducer,
  router: routerReducer,
  submission: submissionReducer,
  user: userReducer,
});

export interface RootState {
  code: CodeInterfaces.CodeStoreState;
  dashboard: DashboardInterfaces.DashboardStoreState;
  editor: EditorInterfaces.EditorStoreState;
  leaderboard: LeaderboardInterfaces.LeaderboardStoreState;
  match: MatchInterfaces.MatchStoreState;
  notification: NotificationInterfaces.NotificationStoreState;
  router: RouterState;
  gameLog: GameLogInterfaces.GameLogStoreState;
  user: UserInterfaces.UserStoreState;
  submission: SubmissionInterfaces.SubmissionStoreState;
}
