export interface StateProps {
  enableBasicAutoCompletion: boolean;
  fontSize: number;
  theme: string;
  keyboardHandler: string;
  enableSnippets: boolean;
}

export interface DispatchProps {
  changeFontSize: (fontSize: number) => void;
  changeTheme: (theme: string) => void;
  changeKeyboardHandler: (keyboardHandler: string) => void;
  toggleBasicAutoCompletion: (basicAutoCompletion: boolean) => void;
  toggleSnippets: (snippets: boolean) => void;
}

export type Props = {} & StateProps & DispatchProps;
