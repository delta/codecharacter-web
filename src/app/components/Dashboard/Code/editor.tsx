import * as React from 'react';
import AceEditor from 'react-ace';

import 'brace/theme/monokai';

export class Editor extends React.Component<Editor.Props, Editor.State> {
  render() {
    return (
      <AceEditor
        mode="c_cpp"
        theme="monokai"
        name="editor"
        style={{
          height: window.innerHeight,
          width: '100%'
        }}
        editorProps={{ $blockScrolling: true }}
      />
    );
  }
}

export namespace Editor {
  export interface Props {}
  export interface State {}
}
