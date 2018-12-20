import * as React from 'react';
/* tslint:disable-next-line:import-name */
import MonacoEditor from 'react-monaco-editor';

export class Editor extends React.Component<Editor.Props, Editor.State> {
  constructor(props: Editor.Props) {
    super(props);
  }

  public render() {
    const { editorWidth, theme, fontSize, code, updateCode } = this.props;
    const options = {
      fontSize,
      selectOnLineNumbers: true,
      // Type of wordWrap is not string. (Temp Fix)
      wordWrap: 'on' as 'on',
    };
    return (
      <MonacoEditor
        height={window.innerHeight}
        width={editorWidth}
        language="cpp"
        theme={theme}
        value={code}
        options={options}
        onChange={(newValue) => {
          updateCode(newValue);
        }}
        editorDidMount={(editor) => {
          editor.focus();
        }}
      />
    );
  }
}

export namespace Editor {
  export interface State {
    code: string;
  }

  export interface OwnProps {
    editorWidth: number;
    theme: string;
    fontSize: number;
  }

  export interface StateProps {
    code: string;
  }

  export interface DispatchProps {
    updateCode: (code: string) => void;
  }

  export type Props = OwnProps & StateProps & DispatchProps;
}
