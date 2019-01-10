import * as React from 'react';
// tslint:disable-next-line:import-name
import AceEditor from 'react-ace';

import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import 'brace/mode/c_cpp';
import 'brace/snippets/c_cpp';

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
];

themes.forEach((theme) => {
  require(`brace/theme/${theme}`);
});

export class Editor extends React.Component<Editor.Props, Editor.State> {
  constructor(props: Editor.Props) {
    super(props);
  }

  public render() {
    const {
      editorWidth,
      theme,
      fontSize,
      basicAutoCompletion,
      snippets,
      code,
      updateCode,
    } = this.props;
    const options = {
      enableBasicAutocompletion: basicAutoCompletion,
      enableLiveAutocompletion: false,
      enableSnippets: snippets,
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
        width={`${editorWidth.toString()}px`}
        height={'100vh'}
        value={code}
        onChange={updateCode}
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
  }

  export interface StateProps {
    code: string;
    theme: string;
    fontSize: number;
    basicAutoCompletion: boolean;
    snippets: boolean;
  }

  export interface DispatchProps {
    updateCode: (code: string) => void;
  }

  export type Props = OwnProps & StateProps & DispatchProps;
}
