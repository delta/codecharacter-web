import * as EditorInterfaces from 'app/types/code/Editor';
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

export class Editor extends React.Component<EditorInterfaces.Props, EditorInterfaces.State> {
  constructor(props: EditorInterfaces.Props) {
    super(props);
  }

  public componentWillReceiveProps(nextProps: EditorInterfaces.Props) {
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this.props.getLatestCode();
    }
  }

  public render() {
    const {
      editorWidth,
      theme,
      fontSize,
      enableBasicAutoCompletion: enableBasicAutocompletion,
      enableSnippets,
      code,
      updateCode,
      viewOnly,
      save,
    } = this.props;
    const options = {
      enableBasicAutocompletion,
      enableSnippets,
      enableLiveAutocompletion: enableBasicAutocompletion,
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
        readOnly={viewOnly}
        editorProps={{ $blockScrolling: true }}
        width={`${editorWidth.toString()}px`}
        height={'96.5vh'}
        value={code}
        onChange={updateCode}
        commands={[
          {
            bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
            exec: () => {
              save(code);
            },
            name: 'Save',
          },
        ]}
      />
    );
  }
}
