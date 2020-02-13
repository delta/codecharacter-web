import { CodeActions } from 'app/actions';
import { EditorSettingsActions } from 'app/actions/code/EditorSettings';
import { ActionType } from 'typesafe-actions';

const actions = {
  changeFontSize: EditorSettingsActions.changeFontSize,
  changeKeyboardHandler: EditorSettingsActions.changeKeyboardHandler,
  changeTheme: EditorSettingsActions.changeTheme,
  resetEditorState: EditorSettingsActions.resetEditorState,
  toggleBasicAutoCompletion: EditorSettingsActions.toggleBasicAutoCompletion,
  toggleSnippets: EditorSettingsActions.toggleSnippets,
  updateCode: CodeActions.updateCode,
};

export const keyboardHandlers = ['emacs', 'vim', 'default'];

export enum KeyboardHandler {
  EMACS,
  VIM,
  DEFAULT,
}

export const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
  'chaos',
  'chrome',
  'eclipse',
  'dracula',
];

export enum EditorThemeTypes {
  MONOKAI,
  GITHUB,
  TOMORROW,
  KUROIR,
  TWILIGHT,
  XCODE,
  TEXTMATE,
  SOLARIZED_DARK,
  SOLARIZED_LIGHT,
  TERMINAL,
  CHAOS,
  CHROME,
  ECLIPSE,
  DRACULA,
}

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
  keyboardHandler: string;
  enableBasicAutoCompletion: boolean;
  enableSnippets: boolean;
  isLoggedIn: boolean;
  viewOnly: boolean;
}

export interface DispatchProps {
  getLatestCode: () => void;
  save: (code: string) => void;
  updateCode: (code: string) => void;
  getUnreadGlobalNotifications: () => void;
}

export type Props = OwnProps & StateProps & DispatchProps;

export interface EditorStoreState {
  editorOptions: {
    enableBasicAutoCompletion: boolean;
    fontSize: number;
    enableSnippets: boolean;
    keyboardHandler: string;
    theme: string;
  };
}

export type EditorStoreAction = ActionType<typeof actions>;
