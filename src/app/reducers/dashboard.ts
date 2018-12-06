import { handleActions } from 'redux-actions';
import { RootState } from './state';
// import { DashboardActions } from 'app/actions/dashboard';

const initialState: RootState = {};

/* tslint:disable-next-line:no-empty-interface */
export interface Action {}

export const dashboardReducer = handleActions<RootState, Action>({}, initialState);
