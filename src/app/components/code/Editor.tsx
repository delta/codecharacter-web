import * as React from 'react';
// tslint:disable-next-line:import-name
import AceEditor from 'react-ace';

import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import 'brace/mode/c_cpp';
import 'brace/theme/monokai';

export class Editor extends React.Component<Editor.Props, Editor.State> {
  constructor(props: Editor.Props) {
    super(props);
  }

  public render() {
    const { editorWidth, theme, fontSize } = this.props;
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
        theme={theme}
        name="editor_div"
        fontSize={fontSize}
        wrapEnabled={true}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={options}
        editorProps={{ $blockScrolling: true }}
        width={editorWidth.toString()}
        height={'100%'}
        value={this.props.code}
        onChange={this.props.updateCode}
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
