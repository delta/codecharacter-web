import * as React from 'react';
/* tslint:disable-next-line:import-name */
import MonacoEditor from 'react-monaco-editor';

export class Editor extends React.Component<Editor.Props, Editor.State> {
  constructor(props: Editor.Props) {
    super(props);
    this.state = {
      code: '// type your code...',
    };
  }

  public render() {
    const { editorWidth, theme, fontSize } = this.props;
    const { code } = this.state;
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
          this.setState({
            code: newValue,
          });
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
  export interface Props {
    editorWidth: number;
    theme: string;
    fontSize: number;
  }
}
