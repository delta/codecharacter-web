import * as React from 'react';
// tslint:disable-next-line:import-name
import AceEditor from 'react-ace';

import 'brace/mode/c_cpp';
import 'brace/theme/terminal';

export class GameLog extends React.Component<GameLog.Props, {}> {
  constructor(props: GameLog.Props) {
    super(props);
  }

  public render() {
    const { gameLog } = this.props;
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
        value={gameLog}
      />
    );
  }
}

export namespace GameLog {
  export interface StateProps {
    gameLog: string;
  }

  export interface DispatchProps {
    updateGameLog: (gameLog: string) => void;
  }

  export type Props = StateProps & DispatchProps;
}
