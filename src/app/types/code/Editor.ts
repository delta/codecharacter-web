import { EditorActions } from 'app/actions/code/Editor';
import { EditorSettingsActions } from 'app/actions/code/EditorSettings';
import { ActionType } from 'typesafe-actions';

const actions = {
  changeFontSize: EditorSettingsActions.changeFontSize,
  changeTheme: EditorSettingsActions.changeTheme,
  toggleBasicAutoCompletion: EditorSettingsActions.toggleBasicAutoCompletion,
  toggleSnippets: EditorSettingsActions.toggleSnippets,
  updateCode: EditorActions.updateCode,
};

export interface State {
  code: string;
}

export interface OwnProps {
  editorWidth: number;
}

export interface StateProps {
  code: string;
  theme: string;
  fontSize: number;
  enableBasicAutoCompletion: boolean;
  enableSnippets: boolean;
}

export interface DispatchProps {
  updateCode: (code: string) => void;
}

export type Props = OwnProps & StateProps & DispatchProps;

export interface EditorStoreState {
  code: string;
  editorOptions: {
    enableBasicAutoCompletion: boolean;
    fontSize: number;
    enableSnippets: boolean;
    theme: string;
  };
}

export type EditorStoreAction = ActionType<typeof actions>;
