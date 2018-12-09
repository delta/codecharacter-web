import { combineReducers } from 'redux';
import { dashboardReducer } from './dashboard';
import { RootState } from './state';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  dashboard: dashboardReducer,
});
