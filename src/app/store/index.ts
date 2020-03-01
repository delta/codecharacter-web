import { logger } from 'app/middleware';
import { rootReducer } from 'app/reducers';
import { codeSagas } from 'app/sagas/Code';
import { leaderboardSagas } from 'app/sagas/Leaderboard';
import { matchSagas } from 'app/sagas/MatchView';
import { notificationSagas } from 'app/sagas/Notification';
import { submissionSagas } from 'app/sagas/Submission';
import { userSagas } from 'app/sagas/User';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
// tslint:disable-next-line:import-name
import createSagaMiddleware from 'redux-saga';

export function configureStore(initialState?: object) {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(logger, sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const persistConfig = {
    storage,
    blacklist: ['gameLog', 'submission'],
    key: 'root',
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, initialState, middleware);
  sagaMiddleware.run(userSagas);
  sagaMiddleware.run(codeSagas);
  sagaMiddleware.run(leaderboardSagas);
  sagaMiddleware.run(submissionSagas);
  sagaMiddleware.run(matchSagas);
  sagaMiddleware.run(notificationSagas);

  const persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return { store, persistor };
}
