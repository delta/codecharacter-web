import { handleActions } from 'redux-actions';
import { RootState } from './state';
// import { DashboardActions } from 'app/actions/dashboard';

const initialState: RootState = {};

export interface Action {}

export const DashboardReducer = handleActions<RootState, Action>({}, initialState);
