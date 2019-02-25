import * as GameLogInterfaces from 'app/types/GameLog';
import * as React from 'react';
// tslint:disable-next-line:import-name
import AceEditor from 'react-ace';

import 'brace/mode/c_cpp';
import 'brace/theme/chaos';

export class GameLog extends React.Component<GameLogInterfaces.Props, {}> {
  private editorRef = React.createRef<AceEditor>();
  constructor(props: GameLogInterfaces.Props) {
    super(props);
  }

  public componentDidUpdate() {
    if (this.editorRef.current) {
      // @ts-ignore
      if (this.editorRef.current.editor) {
        // @ts-ignore
        const editor = this.editorRef.current.editor;
        const lineNumber =
          editor
            .getSession()
            .getValue()
            .split('\n').length - 1;
        editor.gotoLine(lineNumber);
        editor.resize();
      }
    }
  }

  public render() {
    const options = {
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2,
    };

    return (
      <AceEditor
        ref={this.editorRef}
        cursorStart={20}
        mode="c_cpp"
        theme={'chaos'}
        name="game_log_div"
        fontSize={14}
        wrapEnabled={true}
        readOnly={true}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={false}
        setOptions={options}
        editorProps={{ $blockScrolling: true }}
        width={'100%'}
        height={`${this.props.height}px`}
        value={this.props.debugLog}
      />
    );
  }
}
