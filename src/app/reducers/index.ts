import { editorReducer, EditorStoreState } from 'app/reducers/code/Editor';
import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';

// tslint:disable-next-line
export const rootReducer = combineReducers({
  editor: editorReducer,
  router: routerReducer,
});

export interface RootState {
  editor: EditorStoreState;
  router: RouterState;
}
