import { logger } from 'app/middleware';
import { rootReducer, RootState } from 'app/reducers';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(logger);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, initialState, middleware) as Store<RootState>;

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
