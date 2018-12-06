import { Middleware } from 'redux';

/* tslint:disable-next-line:all */
export const logger: Middleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    /* tslint:disable-next-line:no-console */
    console.log(action);
  }
  return next(action);
};
