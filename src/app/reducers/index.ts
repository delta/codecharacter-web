import { editorReducer } from 'app/reducers/code/Editor';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  editor: editorReducer,
  router: routerReducer,
});
