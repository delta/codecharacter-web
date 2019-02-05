import { logger } from 'app/middleware';
import { rootReducer } from 'app/reducers';
import { codeSagas } from 'app/sagas/Code';
import { leaderboardSagas } from 'app/sagas/Leaderboard';
import { userSagas } from 'app/sagas/User';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// tslint:disable-next-line:import-name
import createSagaMiddleware from 'redux-saga';

export function configureStore(initialState?: object) {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(logger, sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, initialState, middleware);
  sagaMiddleware.run(userSagas);
  sagaMiddleware.run(codeSagas);
  sagaMiddleware.run(leaderboardSagas);

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
