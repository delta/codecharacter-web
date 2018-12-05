import { combineReducers } from 'redux';
import { RootState } from './state';
import { DashboardReducer } from './dashboard';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  dashboard: DashboardReducer as any
});
