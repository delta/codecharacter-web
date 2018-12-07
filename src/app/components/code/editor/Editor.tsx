import * as React from 'react';
/* tslint:disable-next-line:import-name */
import MonacoEditor from 'react-monaco-editor';

export class Editor extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      code: '// type your code...',
      width: this.props.editorWidth,
    };
  }
  public render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
    };
    return (
      <MonacoEditor
        height={window.innerHeight}
        width={this.props.editorWidth}
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }

  private onChange(newValue: any, e: any) {
    // console.log('onChange', newValue, e);
  }

  private editorDidMount(editor: any, monaco: any) {
    // console.log('editorDidMount', editor);
    editor.focus();
  }

}

export namespace Editor {
  export interface State {
    code: string;
  }
}
