import * as GameLogInterfaces from 'app/types/GameLog';
import * as React from 'react';
// tslint:disable-next-line:import-name
import AceEditor from 'react-ace';

import 'brace/mode/c_cpp';
import 'brace/theme/terminal';

export class GameLog extends React.Component<GameLogInterfaces.Props, {}> {
  constructor(props: GameLogInterfaces.Props) {
    super(props);
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
        mode="c_cpp"
        theme={'terminal'}
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
        height={'100%'}
        value={this.props.debugLog}
      />
    );
  }
}
