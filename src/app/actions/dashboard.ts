// import { createAction } from 'redux-actions';

export namespace DashboardActions {
  export enum Type {}
}

export type DashboardActions = Omit<typeof DashboardActions, 'Type'>;
